export function Blog() {
  return (
    <section id="blog" className="border-t border-sk-border bg-sk-bg-alt">
      <div className="mx-auto max-w-[1180px] px-4 py-16 md:px-6 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-sk-display text-[28px] font-bold leading-tight text-sk-ink md:text-[34px]">
            Блог
          </h2>
          <a
            href="/blog/"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-sk-steel hover:text-sk-ink"
          >
            Все статьи
            <span className="font-sk-mono">→</span>
          </a>
        </div>

        <div className="mt-10 border border-dashed border-sk-border bg-sk-bg px-6 py-14 text-center">
          <p className="font-sk-display text-[18px] font-bold text-sk-ink">
            Первые статьи готовятся
          </p>
          <p className="mx-auto mt-2 max-w-[420px] text-[14px] text-sk-text-2">
            Разберём нормативы, расчёт пролётов и частые вопросы заказчиков.
          </p>
        </div>
      </div>
    </section>
  );
}
