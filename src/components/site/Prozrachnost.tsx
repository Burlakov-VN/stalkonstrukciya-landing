export function Prozrachnost() {
  return (
    <section id="process" className="border-t border-sk-border">
      <div className="border-b border-sk-border bg-sk-bg px-4 py-14 text-center md:px-6">
        <span className="font-sk-mono text-[12px] uppercase tracking-wide text-sk-text-3">
          // прозрачность
        </span>
        <h2 className="mx-auto mt-3 max-w-[560px] font-sk-display text-[26px] font-bold leading-tight text-sk-ink md:text-[32px]">
          Еженедельный отчёт без запроса
        </h2>
        <p className="mx-auto mt-3 max-w-[480px] text-[15px] leading-relaxed text-sk-text-2">
          Фото- и видеоотчёт по этапам — в Telegram, по умолчанию, без
          отдельного запроса с вашей стороны.
        </p>
      </div>

      <div className="bg-sk-ink px-4 py-14 md:px-6">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-8 md:flex-row md:items-stretch">
          <div className="flex items-center gap-4">
            <span className="font-sk-display text-[110px] font-extrabold leading-none text-white md:text-[140px]">
              7
            </span>
            <span className="font-sk-mono text-[11px] uppercase tracking-wide text-white/50 [writing-mode:vertical-rl]">
              дней между отчётами
            </span>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-4 border-t border-white/15 pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-0">
            <h3 className="font-sk-display text-[20px] font-bold text-white">
              Фото- и видеоотчёт в Telegram
            </h3>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-[14px] text-white/70">
              <span>Видно прогресс на площадке</span>
              <span>Папка проекта с документами</span>
              <span>Без запроса, по умолчанию</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
