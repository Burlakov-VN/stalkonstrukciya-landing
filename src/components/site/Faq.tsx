import { useState } from "react";

const QA = [
  {
    q: "Сколько времени занимает расчёт?",
    a: "Предварительный расчёт готовим за 2–3 рабочих дня. Точный срок зависит от сложности объекта.",
  },
  {
    q: "Что если исполнитель обанкротится на середине проекта?",
    a: "Оплата идёт по факту подписанных этапов (КС-2, КС-3) — вы не переводите деньги вперёд за ещё не выполненную работу.",
  },
  {
    q: "Участвуете в закупках по 44-ФЗ и 223-ФЗ?",
    a: "Участвуем в закупках, требования проверяем до подготовки заявки. Если ваш регламент требует опыт юрлица от определённого срока — скажем это сразу, не тратя ваше время.",
  },
  {
    q: "Можно приехать на производство до подписания договора?",
    a: "Да, это часть процесса — приезжайте посмотреть цех.",
  },
  {
    q: "Работаете по всей России?",
    a: "Да, работаем по всей России.",
  },
  {
    q: "Можно заказать только проектирование, без строительства?",
    a: "Да, проектирование — отдельная услуга с меньшим чеком и более коротким сроком.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-sk-border bg-sk-bg">
      <div className="mx-auto max-w-[760px] px-4 py-16 md:px-6 md:py-20">
        <h2 className="text-center font-sk-display text-[28px] font-bold leading-tight text-sk-ink md:text-[34px]">
          Частые вопросы
        </h2>

        <div className="mt-10 divide-y divide-sk-border border-y border-sk-border">
          {QA.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span
                    className={`font-sk-display text-[16px] font-bold text-sk-ink ${isOpen ? "border-l-2 border-sk-accent pl-3" : "pl-[14px]"}`}
                  >
                    {item.q}
                  </span>
                  <span className="shrink-0 font-sk-mono text-[18px] text-sk-steel">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <p className="pb-5 pl-[14px] pr-8 text-[14px] leading-relaxed text-sk-text-2">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
