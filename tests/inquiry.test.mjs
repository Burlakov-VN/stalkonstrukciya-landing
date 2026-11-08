import test from 'node:test';
import assert from 'node:assert/strict';
import { createHandler } from '../netlify/functions/inquiry.mjs';

const env = { RESEND_API_KEY: 'test-key', INQUIRY_EMAIL_TO: 'receiver@example.com', INQUIRY_EMAIL_FROM: 'site@example.com', TELEGRAM_BOT_TOKEN: 'test-token', TELEGRAM_CHAT_ID: '-12345' };
const id = '12345678-1234-4123-8123-123456789abc';
function request({ fields = {}, files = [], origin = 'https://site.example', method = 'POST' } = {}) {
  const body = new FormData();
  for (const [key, value] of Object.entries({ name: 'Тестовый заказчик', contact: 'client@example.com', consent: 'yes', page: '/proektirovanie/', direction: 'Проектирование', requestId: id, ...fields })) body.set(key, value);
  files.forEach(file => body.append('files', file));
  return new Request('https://site.example/api/inquiry', { method, headers: { Origin: origin }, ...(method === 'POST' ? { body } : {}) });
}
const file = new File(['%PDF-1.4 test drawing'], 'чертёж.pdf', { type: 'application/pdf' });

test('unconfigured form reports unavailable and never sends data', async () => {
  const handler = createHandler({ env: {}, fetcher: () => assert.fail('network call') });
  assert.deepEqual(await (await handler(request({ method: 'GET' }))).json(), { ready: false });
  assert.equal((await handler(request())).status, 503);
});
test('both providers receive context and the actual attachment', async () => {
  const calls = [];
  const handler = createHandler({ env, fetcher: async (url, options) => {
    calls.push({ url, options });
    return Response.json(url.includes('resend') ? { id: 'email-id' } : { ok: true });
  } });
  assert.deepEqual(await (await handler(request({ files: [file] }))).json(), { ok: true, id });
  const email = calls.find(call => call.url.includes('resend'));
  const payload = JSON.parse(email.options.body);
  assert.match(payload.text, /Страница: \/proektirovanie\//);
  assert.equal(payload.attachments[0].filename, file.name);
  assert.equal(Buffer.from(payload.attachments[0].content, 'base64').toString(), await file.text());
  assert.equal(email.options.headers['Idempotency-Key'], `inquiry/${id}`);
  assert.equal(await calls.find(call => call.url.endsWith('/sendDocument')).options.body.get('document').text(), await file.text());
});
test('multiple files are sent as a Telegram document group', async () => {
  const handler = createHandler({ env, fetcher: async (url, options) => {
    if (url.endsWith('/sendMediaGroup')) {
      assert.equal(JSON.parse(options.body.get('media')).length, 2);
      assert.equal(await options.body.get('file1').text(), 'second drawing');
    }
    return Response.json(url.includes('resend') ? { id: 'id' } : { ok: true });
  } });
  assert.equal((await handler(request({ files: [file, new File(['second drawing'], 'detail.dwg')] }))).status, 200);
});
test('one complete delivery is accepted; failed channel is reported without personal data', async () => {
  const reports = [];
  const handler = createHandler({ env, report: (...args) => reports.push(args), fetcher: async url => url.includes('resend') ? Response.json({ id: 'ok' }) : Response.json({ ok: false }, { status: 500 }) });
  assert.equal((await handler(request({ files: [file] }))).status, 200);
  assert.equal(reports.length, 1);
  assert.doesNotMatch(JSON.stringify(reports), /client@example.com|Тестовый заказчик/);
});
test('failed attachments do not count as complete delivery', async () => {
  const handler = createHandler({ env, report: () => {}, fetcher: async url => url.endsWith('/sendMessage') ? Response.json({ ok: true }) : Response.json({ ok: false }, { status: 500 }) });
  assert.equal((await handler(request({ files: [file] }))).status, 502);
});
test('missing consent, invalid contact, foreign origin and honeypot never reach providers', async () => {
  const handler = createHandler({ env, fetcher: () => assert.fail('network call') });
  for (const options of [{ fields: { consent: '' } }, { fields: { contact: 'bad' } }, { fields: { name: ' ' } }, { fields: { requestId: 'bad' } }, { fields: { page: '//evil.example/' } }, { fields: { website: 'spam' } }, { origin: 'https://evil.example' }]) assert.ok((await handler(request(options))).status >= 400);
});
test('unsupported, oversized and excess files are rejected before providers', async () => {
  const handler = createHandler({ env, fetcher: () => assert.fail('network call') });
  for (const files of [[new File(['script'], 'script.html')], [new File([], 'empty.pdf')], [new File([new Uint8Array(3 * 1024 * 1024 + 1)], 'big.pdf')], Array.from({ length: 6 }, () => file)]) assert.ok((await handler(request({ files }))).status >= 400);
});
test('body size cap works without content-length', async () => {
  const handler = createHandler({ env, fetcher: () => assert.fail('network call') });
  const oversized = new Request('https://site.example/api/inquiry', { method: 'POST', headers: { Origin: 'https://site.example', 'Content-Type': 'multipart/form-data; boundary=testing' }, body: new Uint8Array(4 * 1024 * 1024) });
  assert.equal((await handler(oversized)).status, 413);
});
