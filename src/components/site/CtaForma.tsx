import { useState, type FormEvent } from "react";

const TYPES = [
  { value: "sklad", label: "Склад" },
  { value: "cekh", label: "Цех" },
  { value: "angar", label: "Ангар" },
  { value: "proektirovanie", label: "Проектирование" },
  { value: "postavka", label: "Поставка" },
  { value: "montazh", label: "Монтаж" },
  { value: "drugoe", label: "Другое" },
];

type Status = "idle" | "submitting" | "success" | "error";

export function CtaForma() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    // TODO: канал приёма заявок не выбран (email / Telegram-бот / CRM —
    // см. NEXTJS-BRIEF.md §7). Пока — заглушка без реального бэкенда.
    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section id="raschet" className="sk-blueprint-grid border-t border-sk-border bg-sk-bg-alt">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center px-4 py-24 text-center md:px-6">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-sk-steel text-[22px] text-sk-steel">
            ✓
          </span>
          <h2 className="mt-5 font-sk-display text-[24px] font-bold text-sk-ink">
            Заявка отправлена
          </h2>
          <p className="mt-2 max-w-[380px] text-[14px] text-sk-text-2">
            Ответим с предварительным расчётом за 2–3 рабочих дня.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="raschet" className="sk-blueprint-grid border-t border-sk-border bg-sk-bg-alt">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-20">
        <div>
          <h2 className="font-sk-display text-[30px] font-extrabold leading-tight text-sk-ink md:text-[38px]">
            Нужен расчёт под ваш объект?
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-sk-text-2">
            Ответим с предварительным расчётом за 2–3 рабочих дня.
          </p>
          <div className="mt-6 font-sk-mono text-[12px] uppercase tracking-wide text-sk-steel">
            С 1995 года · Собственное производство · Оплата поэтапно
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border border-sk-border bg-sk-surface p-6 md:p-8"
        >
          <div className="grid gap-4">
            <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-sk-ink">
              Имя
              <input
                required
                name="name"
                type="text"
                className="border border-sk-border bg-sk-bg px-3.5 py-2.5 text-[14px] font-normal text-sk-ink outline-none focus:border-sk-steel"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-sk-ink">
              Телефон или Telegram
              <input
                required
                name="contact"
                type="text"
                placeholder="+7 или @username"
                className="border border-sk-border bg-sk-bg px-3.5 py-2.5 text-[14px] font-normal text-sk-ink outline-none placeholder:text-sk-text-3 focus:border-sk-steel"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-sk-ink">
              Город объекта
              <input
                name="city"
                type="text"
                className="border border-sk-border bg-sk-bg px-3.5 py-2.5 text-[14px] font-normal text-sk-ink outline-none focus:border-sk-steel"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-sk-ink">
              Тип объекта
              <select
                name="type"
                defaultValue=""
                className="border border-sk-border bg-sk-bg px-3.5 py-2.5 text-[14px] font-normal text-sk-ink outline-none focus:border-sk-steel"
              >
                <option value="" disabled>
                  Выберите тип
                </option>
                {TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-2 bg-sk-accent px-6 py-3.5 text-[15px] font-semibold text-white transition-[filter] hover:brightness-95 disabled:opacity-60"
            >
              {status === "submitting" ? "Отправляем…" : "Отправить заявку"}
            </button>

            {status === "error" && (
              <p className="text-[13px] text-red-600">
                Не удалось отправить. Попробуйте ещё раз или позвоните нам.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
