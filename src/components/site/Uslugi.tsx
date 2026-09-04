export function Uslugi() {
  return (
    <section id="uslugi" className="border-t border-sk-border bg-sk-bg-alt">
      <div className="mx-auto max-w-[1180px] px-4 py-16 md:px-6 md:py-20">
        <h2 className="max-w-[560px] font-sk-display text-[28px] font-bold leading-tight text-sk-ink md:text-[34px]">
          Три способа начать работу
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <a
            href="/proektirovanie/"
            className="group flex flex-col justify-between border border-sk-border bg-sk-surface p-7 transition-colors hover:border-sk-steel md:row-span-2 md:p-9"
          >
            <div>
              <span className="font-sk-mono text-[11px] uppercase tracking-wide text-sk-text-3">
                // 01
              </span>
              <h3 className="mt-3 font-sk-display text-[22px] font-bold text-sk-ink">
                Проектирование
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-sk-text-2">
                КМ, КМД, независимая проверка расчёта. Малый чек, короткий
                срок — не обязывает на полный цикл строительства.
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-sk-steel">
              Подробнее
              <span className="font-sk-mono transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </a>

          <a
            href="/postavka/"
            className="group flex flex-col justify-between border border-sk-border bg-sk-surface p-7 transition-colors hover:border-sk-steel"
          >
            <div>
              <span className="font-sk-mono text-[11px] uppercase tracking-wide text-sk-text-3">
                // 02
              </span>
              <h3 className="mt-3 font-sk-display text-[19px] font-bold text-sk-ink">
                Комплексная поставка
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-sk-text-2">
                Металлоконструкции и сэндвич-панели под вашу спецификацию,
                без монтажа.
              </p>
            </div>
            <span className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-sk-steel">
              Подробнее
              <span className="font-sk-mono transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </a>

          <a
            href="/montazh/"
            className="group flex flex-col justify-between border border-sk-border bg-sk-surface p-7 transition-colors hover:border-sk-steel"
          >
            <div>
              <span className="font-sk-mono text-[11px] uppercase tracking-wide text-sk-text-3">
                // 03
              </span>
              <h3 className="mt-3 font-sk-display text-[19px] font-bold text-sk-ink">
                Монтаж
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-sk-text-2">
                Монтаж и шеф-монтаж силами аттестованных бригад по всей
                России.
              </p>
            </div>
            <span className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-sk-steel">
              Подробнее
              <span className="font-sk-mono transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
