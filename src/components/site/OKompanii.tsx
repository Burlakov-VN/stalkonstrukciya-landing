export function OKompanii() {
  return (
    <section id="o-kompanii" className="border-t border-sk-border bg-sk-bg">
      <div className="mx-auto max-w-[1180px] px-4 py-16 md:px-6 md:py-20">
        <div className="grid gap-8 md:grid-cols-[200px_1fr] md:gap-12">
          <div aria-hidden className="hidden md:block" />

          <div className="max-w-[620px]">
            <h2 className="font-sk-display text-[26px] font-bold leading-tight text-sk-ink md:text-[32px]">
              На рынке металлоконструкций — с 1995 года
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-sk-ink">
              Нашим основным направлением является изготовление и поставка
              строительных металлоконструкций для нефтехимической отрасли и предприятий
              топливно-энергетического комплекса, в которых используются
              металлоконструкции с повышенными требованиями к качеству, надежности
              и долговечности, а также сжатые сроки поставки.
            </p>
            <a
              href="/o-kompanii/"
              className="mt-5 inline-flex items-center gap-2 border-b border-sk-steel pb-0.5 text-[15px] font-semibold text-sk-steel hover:border-sk-ink hover:text-sk-ink"
            >
              Подробнее о компании
              <span className="font-sk-mono">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
