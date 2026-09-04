import { IconSprite } from "./IconSprite";

// icons-process.png bottom row (row 1): compass-blueprint · gear · crane ·
// clipboard-handshake — сгенерировано в этом порядке.
const STEPS = [
  { n: "01", title: "Проектирование", text: "Расчёт конструкций, КМ и КМД.", col: 0 as const },
  { n: "02", title: "Производство", text: "Изготовление на собственном цехе.", col: 1 as const },
  { n: "03", title: "Монтаж", text: "Аттестованные монтажные бригады.", col: 2 as const },
  { n: "04", title: "Сдача", text: "Приёмка объекта, полный пакет документов.", col: 3 as const },
];

export function Cikl() {
  return (
    <section id="cikl" className="sk-blueprint-grid border-t border-sk-border bg-sk-bg">
      <div className="mx-auto max-w-[1180px] px-4 py-16 md:px-6 md:py-20">
        <div className="max-w-[560px]">
          <span className="font-sk-mono text-[12px] uppercase tracking-wide text-sk-text-3">
            // полный цикл
          </span>
          <h2 className="mt-3 font-sk-display text-[28px] font-bold leading-tight text-sk-ink md:text-[34px]">
            Один контракт, одна ответственность
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-4 md:gap-6">
          {STEPS.map((step) => (
            <div key={step.n}>
              <div className="flex items-end justify-between">
                <span className="font-sk-display text-[40px] font-extrabold leading-none text-sk-border">
                  {step.n}
                </span>
                <IconSprite src="/assets/icons-process.png" col={step.col} row={1} size={28} />
              </div>
              <div className="sk-dim-line mt-4" />
              <h3 className="mt-4 font-sk-display text-[17px] font-bold text-sk-ink">
                {step.title}
              </h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-sk-text-2">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
