import { IconSprite } from "./IconSprite";

// icons-process.png top row (row 0): document-check · shield-lock ·
// calculator-magnifier · contract-clock — сгенерировано в этом порядке.
const ITEMS = [
  {
    title: "Оплата по факту этапов",
    text: "Расчёт по подписанным КС-2 и КС-3.",
    col: 0 as const,
  },
  {
    title: "Финансовое обеспечение под проект",
    text: "Согласуем индивидуально под объект.",
    col: 1 as const,
  },
  {
    title: "Независимая проверка расчёта",
    text: "Заказываете вы, у своего специалиста — компенсируем мы.",
    col: 2 as const,
  },
  {
    title: "Предельные санкции за срыв сроков",
    text: "Фиксируются в договоре до подписания.",
    col: 3 as const,
  },
];

export function Garantii() {
  return (
    <section id="garantii" className="border-t border-sk-border bg-sk-bg">
      <div className="mx-auto max-w-[1180px] px-4 py-16 md:px-6 md:py-20">
        <div className="max-w-[560px]">
          <span className="font-sk-mono text-[12px] uppercase tracking-wide text-sk-text-3">
            // гарантии
          </span>
          <h2 className="mt-3 font-sk-display text-[28px] font-bold leading-tight text-sk-ink md:text-[34px]">
            Механизмы вместо обещаний
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {ITEMS.map((item) => (
            <div
              key={item.title}
              className="relative border border-sk-steel/60 bg-sk-surface py-6 pl-7 pr-6"
            >
              <span className="absolute inset-y-0 left-0 w-[3px] bg-sk-accent" />
              <IconSprite src="/assets/icons-process.png" col={item.col} row={0} size={36} />
              <h3 className="mt-4 font-sk-display text-[17px] font-bold text-sk-ink">
                {item.title}
              </h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-sk-text-2">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
