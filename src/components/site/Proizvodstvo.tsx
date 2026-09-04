const QUALITY = ["ОТК на каждом этапе", "НК сварных швов", "Аттестация НАКС", "Сертификаты на металл по партиям"];

export function Proizvodstvo() {
  return (
    <section id="proizvodstvo" className="border-t border-sk-border bg-sk-bg">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:px-6 md:py-20">
        <div>
          <h2 className="font-sk-display text-[28px] font-bold leading-tight text-sk-ink md:text-[34px]">
            Собственный цех — приезжайте до подписания договора
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-sk-text-2">
            Изготавливаем на своих мощностях: от заготовки до сварки и
            покраски.
          </p>

          <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {QUALITY.map((q) => (
              <li key={q} className="flex items-start gap-2 text-[14px] text-sk-ink">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-sk-steel" />
                {q}
              </li>
            ))}
          </ul>

          <a
            href="/proizvodstvo/"
            className="mt-7 inline-flex items-center gap-2 border-b border-sk-steel pb-0.5 text-[15px] font-semibold text-sk-steel hover:border-sk-ink hover:text-sk-ink"
          >
            Пакет документов качества
            <span className="font-sk-mono">→</span>
          </a>
        </div>

        <div className="relative border border-sk-border">
          <img
            src="/assets/proizvodstvo-photo.jpg"
            alt="Собственное производство металлоконструкций"
            className="aspect-[4/3] w-full object-cover"
          />
          <span className="absolute bottom-0 left-0 bg-sk-ink/85 px-3 py-1.5 font-sk-mono text-[11px] text-white">
            // цех металлоконструкций
          </span>
        </div>
      </div>
    </section>
  );
}
