export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-sk-ink">
      <img
        src="/assets/hero.jpg"
        alt="Промышленное здание под ключ — монтаж металлоконструкций"
        className="absolute inset-0 h-full w-full object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-sk-ink/85 via-sk-ink/55 to-sk-ink/10" />
      <div className="sk-blueprint-grid absolute inset-0 opacity-[0.15] mix-blend-overlay" />

      <div className="relative mx-auto flex min-h-[560px] max-w-[1180px] flex-col justify-center px-4 py-20 md:px-6 md:py-28">
        <span className="font-sk-mono text-[13px] tracking-wide text-white/70">
          // с 1995 года
        </span>

        <h1 className="mt-4 max-w-[620px] font-sk-display text-[34px] font-extrabold leading-[1.1] tracking-tight text-white md:text-[52px]">
          Работаем там, где надёжность критична: нефтегаз, химия, энергетика
        </h1>

        <p className="mt-5 max-w-[480px] text-[16px] leading-relaxed text-white/80">
          Проектирование, собственное производство и монтаж в одном контракте.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#raschet"
            className="group inline-flex items-center gap-2 bg-sk-accent px-6 py-3.5 text-[15px] font-semibold text-white transition-[filter] hover:brightness-95"
          >
            Получить расчёт
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="tel:+70000000000"
            className="border border-white/30 px-6 py-3.5 text-[15px] font-semibold text-white hover:border-white/60"
          >
            [ТЕЛЕФОН]
          </a>
        </div>
      </div>
    </section>
  );
}
