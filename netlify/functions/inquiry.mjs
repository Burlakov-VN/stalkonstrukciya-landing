import { Buffer } from 'node:buffer';

const MAX_FILES = 5;
const MAX_FILE_BYTES = 3 * 1024 * 1024;
const MAX_BODY_BYTES = MAX_FILE_BYTES + 64 * 1024;
const extensions = /\.(pdf|dwg|dxf|docx?|xlsx?|zip|jpe?g|png)$/i;
const json = (data, status = 200) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
const unavailable = () => json({ ok: false, message: 'Приём заявок ещё не подключён. Попробуйте после настройки контактов.' }, 503);

async function boundedBody(request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error('empty');
  const chunks = []; let bytes = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > MAX_BODY_BYTES) { await reader.cancel(); throw new RangeError('body'); }
    chunks.push(value);
  }
  return new Response(Buffer.concat(chunks), { headers: { 'Content-Type': request.headers.get('content-type') } }).formData();
}

export function createHandler({ env = process.env, fetcher = fetch, report = console.error } = {}) {
  return async function handler(request) {
    const emailReady = !!(env.RESEND_API_KEY && env.INQUIRY_EMAIL_TO && env.INQUIRY_EMAIL_FROM);
    const telegramReady = !!(env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID);
    const ready = emailReady && telegramReady;
    if (request.method === 'GET') return json({ ready });
    if (request.method !== 'POST') return json({ ok: false, message: 'Метод не поддерживается.' }, 405);
    const origin = request.headers.get('origin');
    const allowed = [new URL(request.url).origin, env.URL, env.DEPLOY_PRIME_URL].filter(Boolean).map(value => new URL(value).origin);
    if (!origin || !allowed.includes(origin)) return json({ ok: false, message: 'Отправьте заявку через форму на сайте.' }, 403);
    if (!(request.headers.get('content-type') ?? '').startsWith('multipart/form-data')) return json({ ok: false, message: 'Некорректный формат заявки.' }, 415);
    if (Number(request.headers.get('content-length')) > MAX_BODY_BYTES) return json({ ok: false, message: 'Общий размер файлов должен быть не больше 3 МБ.' }, 413);
    let form;
    try { form = await boundedBody(request); } catch (error) { return json({ ok: false, message: error instanceof RangeError ? 'Общий размер файлов должен быть не больше 3 МБ.' : 'Не удалось прочитать заявку.' }, error instanceof RangeError ? 413 : 400); }
    // Honeypot submissions are rejected without contacting either provider.
    if (form.get('website')) return json({ ok: false, message: 'Не удалось отправить заявку.' }, 400);
    const limits = { name: 100, contact: 150, city: 120, type: 100, message: 2000, direction: 120, page: 200, requestId: 36 };
    const values = {};
    for (const [key, max] of Object.entries(limits)) {
      const value = form.get(key);
      if (value !== null && typeof value !== 'string' || typeof value === 'string' && value.length > max) return json({ ok: false, message: 'Проверьте длину и формат полей заявки.' }, 400);
      values[key] = typeof value === 'string' ? value.trim() : '';
    }
    const validContact = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.contact) || /^@[a-zA-Z][a-zA-Z0-9_]{4,31}$/.test(values.contact) || /^\+?[\d\s()\-]{10,24}$/.test(values.contact) && values.contact.replace(/\D/g, '').length >= 10;
    if (values.name.length < 2 || !validContact || form.get('consent') !== 'yes' || !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(values.requestId) || !/^\/(?:[a-z0-9-]+\/)*$/.test(values.page)) return json({ ok: false, message: 'Укажите имя, корректный контакт и согласие на обработку данных.' }, 400);
    const files = form.getAll('files');
    if (files.length > MAX_FILES || files.some(file => typeof file === 'string' || !extensions.test(file.name) || !file.size || file.name.length > 180) || files.reduce((sum, file) => sum + (file.size ?? 0), 0) > MAX_FILE_BYTES) return json({ ok: false, message: 'Прикрепите до 5 непустых файлов разрешённых форматов, суммарно не больше 3 МБ.' }, 400);
    if (!ready) return unavailable();

    const id = values.requestId;
    const text = [
      'Заявка «Стальконструкция»', `Номер: ${id}`, `Имя: ${values.name}`, `Контакт: ${values.contact}`,
      `Город: ${values.city || 'не указан'}`, `Запрос: ${values.type || 'Металлоконструкции'}`, `Направление: ${values.direction}`,
      `Страница: ${values.page}`, `Комментарий: ${values.message || 'не указан'}`, `Вложений: ${files.length}`, 'Согласие на обработку данных: получено',
    ].join('\n');
    const filenames = files.map(file => file.name.replace(/[\x00-\x1f/\\]/g, '_'));

    async function sendEmail() {
      const attachments = await Promise.all(files.map(async (file, index) => ({ filename: filenames[index], content: Buffer.from(await file.arrayBuffer()).toString('base64') })));
      const response = await fetcher('https://api.resend.com/emails', {
        method: 'POST', headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `inquiry/${id}` },
        body: JSON.stringify({ from: env.INQUIRY_EMAIL_FROM, to: env.INQUIRY_EMAIL_TO.split(',').map(value => value.trim()), subject: `Заявка с сайта · ${id}`, text, attachments }), signal: AbortSignal.timeout(15_000),
      });
      const data = await response.json();
      if (!response.ok || !data.id) throw new Error('email_failed');
    }
    async function telegramCall(method, body) {
      const response = await fetcher(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/${method}`, { method: 'POST', body, signal: AbortSignal.timeout(15_000) });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error('telegram_failed');
    }
    async function sendTelegram() {
      const message = new FormData(); message.set('chat_id', env.TELEGRAM_CHAT_ID); message.set('text', text); message.set('link_preview_options', JSON.stringify({ is_disabled: true }));
      await telegramCall('sendMessage', message);
      if (!files.length) return;
      const body = new FormData(); body.set('chat_id', env.TELEGRAM_CHAT_ID);
      if (files.length === 1) {
        body.set('document', files[0], filenames[0]); body.set('caption', `Чертежи по заявке ${id}`);
        await telegramCall('sendDocument', body);
      } else {
        const media = files.map((file, index) => {
          body.append(`file${index}`, file, filenames[index]);
          return { type: 'document', media: `attach://file${index}`, ...(index === 0 ? { caption: `Чертежи по заявке ${id}` } : {}) };
        });
        body.set('media', JSON.stringify(media)); await telegramCall('sendMediaGroup', body);
      }
    }
    const result = await Promise.allSettled([sendEmail(), sendTelegram()]);
    result.forEach((entry, index) => { if (entry.status === 'rejected') report('Inquiry delivery failed', { id, channel: index === 0 ? 'email' : 'telegram' }); });
    // Confirm only when at least one channel received the complete submission,
    // including every attachment. Log partial failures without exposing personal data.
    if (result.every(entry => entry.status === 'rejected')) return json({ ok: false, message: 'Не удалось передать заявку. Повторите позже; данные остались в форме.' }, 502);
    return json({ ok: true, id });
  };
}

export default createHandler();
export const config = { path: '/api/inquiry', rateLimit: { action: 'rate_limit', aggregateBy: ['ip', 'domain'], windowSize: 60, windowLimit: 30 } };
