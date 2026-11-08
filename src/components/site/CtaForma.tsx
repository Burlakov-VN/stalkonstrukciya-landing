import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";

const MAX_BYTES = 3 * 1024 * 1024;
const EXTENSIONS = /\.(pdf|dwg|dxf|docx?|xlsx?|zip|jpe?g|png)$/i;
const TYPES = ["Металлоконструкции", "Проектирование", "Комплексная поставка", "Монтаж", "Шеф-монтаж", "Посещение производства", "Другое"];

export function CtaForma({ title = "Нужен расчёт под ваш объект?", intro = "Ответим с предварительным расчётом за 2–3 рабочих дня.", direction = "Металлоконструкции", page = "/" }: { title?: string; intro?: string; direction?: string; page?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [ready, setReady] = useState<boolean | null>(null);
  const [availabilityError, setAvailabilityError] = useState(false);
  const [availabilityCheck, setAvailabilityCheck] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const requestId = useRef("");

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const timeout = window.setTimeout(() => controller.abort(), 8_000);
    setReady(null); setAvailabilityError(false);
    fetch("/api/inquiry", { signal: controller.signal, cache: "no-store" }).then(async response => {
      if (!response.ok || !(response.headers.get("content-type") ?? "").includes("application/json")) throw new Error("unavailable");
      const data = await response.json();
      if (typeof data?.ready !== "boolean") throw new Error("unavailable");
      if (active) setReady(data.ready);
    }).catch(() => {
      if (active) { setReady(false); setAvailabilityError(true); }
    }).finally(() => window.clearTimeout(timeout));
    return () => { active = false; controller.abort(); window.clearTimeout(timeout); };
  }, [availabilityCheck]);

  function selectFiles(event: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files ?? []);
    if (selected.length > 5) { setFileError("Можно прикрепить не больше 5 файлов."); return; }
    if (selected.some(file => !EXTENSIONS.test(file.name) || file.size === 0)) { setFileError("Выберите непустые PDF, DWG, DXF, DOC, DOCX, XLS, XLSX, ZIP, JPG или PNG."); return; }
    if (selected.reduce((size, file) => size + file.size, 0) > MAX_BYTES) { setFileError("Общий размер файлов превышает 3 МБ. Для большого комплекта укажите ссылку в комментарии."); return; }
    setFiles(selected); setFileError(""); requestId.current = "";
  }
  function removeFile(index: number) {
    setFiles(current => current.filter((_, i) => i !== index));
    setFileError(""); requestId.current = "";
    if (fileInput.current) fileInput.current.value = "";
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (fileError || status === "submitting") return;
    const data = new FormData(event.currentTarget);
    const contact = String(data.get("contact") ?? "").trim();
    const validContact = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) || /^@[a-zA-Z][a-zA-Z0-9_]{4,31}$/.test(contact) || /^\+?[\d\s()\-]{10,24}$/.test(contact) && contact.replace(/\D/g, "").length >= 10;
    if (!validContact) { setError("Укажите телефон с кодом города, email или Telegram в формате @username."); setStatus("error"); return; }
    requestId.current ||= crypto.randomUUID();
    data.set("requestId", requestId.current); data.set("page", page); data.set("direction", direction);
    data.delete("files"); files.forEach(file => data.append("files", file));
    setStatus("submitting"); setError("");
    try {
      const response = await fetch("/api/inquiry", { method: "POST", body: data, signal: AbortSignal.timeout(90_000) });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.ok) throw new Error(result?.message || (response.status === 429 ? "Слишком много запросов. Подождите минуту и повторите отправку." : "Не удалось отправить заявку. Данные сохранены в форме, попробуйте позже."));
      setReceipt(result.id); setStatus("success");
    } catch (cause) { setError(cause instanceof Error && cause.name !== "TimeoutError" ? cause.message : "Сервер не ответил вовремя. Повторите отправку позже с тем же номером заявки."); setStatus("error"); }
  }
  return <section id="raschet" className="inquiry-section sk-blueprint-grid"><div className="page-container inquiry-grid"><div><span className="kicker">Начнём с вашей задачи</span><h2>{title}</h2><p>{intro}</p><p className="inquiry-hint">Приложите чертежи или техническое задание. Если проекта пока нет, опишите объект — обсудим исходные данные.</p><div className="inquiry-proof"><span>С 1995 года</span><span>Собственное производство</span><span>Вся Россия</span></div></div>
    {status === "success" ? <div className="inquiry-success" role="status"><span className="success-mark" aria-hidden="true">✓</span><h3>Заявка принята</h3><p>Данные{files.length ? " и файлы" : ""} переданы менеджеру. Ответим за 2–3 рабочих дня.</p><p className="receipt">Номер: {receipt}</p><button className="button-secondary" onClick={() => { setStatus("idle"); setFiles([]); requestId.current = ""; }}>Новая заявка</button></div> : <form className="inquiry-form" onSubmit={submit} onChange={() => { if (status !== "submitting") { requestId.current = ""; if (status === "error") { setStatus("idle"); setError(""); } } }} aria-busy={status === "submitting"}>
      {ready === null && <p className="form-notice" role="status">Проверяем доступность формы…</p>}
      {ready === false && <div className="form-notice"><p role="status">{availabilityError ? "Не удалось проверить доступность формы. Проверьте соединение и попробуйте ещё раз. Заполненные данные сохранятся." : "Приём заявок пока не подключён. Вы можете ознакомиться с формой; отправка станет доступна после настройки контактов."}</p><button className="button-secondary availability-retry" type="button" onClick={() => setAvailabilityCheck(value => value + 1)}>Проверить ещё раз</button></div>}
      <fieldset disabled={status === "submitting"}><legend className="sr-only">Данные для расчёта</legend><div className="form-grid">
        <label>Ваше имя<input required name="name" autoComplete="name" minLength={2} maxLength={100} placeholder="Как к вам обращаться" /></label>
        <label>Телефон, email или Telegram<input required name="contact" autoComplete="email" maxLength={150} placeholder="+7, email или @username" /></label>
        <label>Город объекта<input name="city" autoComplete="address-level2" maxLength={120} placeholder="Где планируются работы" /></label>
        <label>Что требуется<select name="type" defaultValue={TYPES.includes(direction) ? direction : "Металлоконструкции"}>{TYPES.map(type => <option key={type}>{type}</option>)}</select></label>
        <label className="form-full">Расскажите об объекте<textarea name="message" rows={3} maxLength={2000} placeholder="Назначение, размеры, сроки. Ссылку на большой комплект чертежей можно указать здесь." /></label>
        <div className="file-field form-full"><label htmlFor="drawings">Чертежи и техническое задание</label><input ref={fileInput} id="drawings" name="files" type="file" multiple accept=".pdf,.dwg,.dxf,.doc,.docx,.xls,.xlsx,.zip,.jpg,.jpeg,.png" onChange={selectFiles} aria-describedby="file-help file-error" aria-invalid={!!fileError} /><p id="file-help">До 5 файлов, суммарно до 3 МБ. PDF, DWG, DXF, документы, ZIP или изображения.</p><ul className="selected-files">{files.map((file, i) => <li key={file.name + i}><span>{file.name} <small>({Math.max(1, Math.round(file.size / 1024))} КБ)</small></span><button type="button" onClick={() => removeFile(i)} aria-label={"Убрать " + file.name}>×</button></li>)}</ul><p id="file-error" className="field-error" role={fileError ? "alert" : undefined}>{fileError}</p></div>
        <label className="form-consent form-full"><input type="checkbox" name="consent" value="yes" required /><span>Даю <a href="/soglasie/" target="_blank" rel="noreferrer">согласие на обработку персональных данных</a> и ознакомлен с <a href="/politika/" target="_blank" rel="noreferrer">политикой конфиденциальности</a>.</span></label>
        <div className="form-trap" aria-hidden="true"><label>Не заполняйте это поле<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <button className="button-primary form-full" type="submit" disabled={!!fileError || ready !== true}>{status === "submitting" ? "Передаём заявку…" : "Получить расчёт"}<span aria-hidden="true">↗</span></button>
        {error && <p className="field-error form-full" role="alert">{error}{requestId.current && <small className="block">Номер заявки: {requestId.current}</small>}</p>}
      </div></fieldset>
    </form>}
  </div></section>;
}
