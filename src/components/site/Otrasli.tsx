// icons-industries.png is a 4×2 sprite sheet generated in this exact order:
// нефтегаз · нефтепереработка/нефтехимия · химия · энергетика
// металлургия/горнодобыча · коммерческие/промышленные · сельское хозяйство · другое
const INDUSTRIES = [
  { label: "Нефтегазовая отрасль", href: "/otrasli/neftegaz/", col: 0, row: 0 },
  { label: "Нефтепереработка и нефтехимия", href: "/otrasli/neftepererabotka-neftehimiya/", col: 1, row: 0 },
  { label: "Химическая промышленность", href: "/otrasli/himicheskaya-promyshlennost/", col: 2, row: 0 },
  { label: "Энергетика", href: "/otrasli/energetika/", col: 3, row: 0 },
  { label: "Металлургическая и горнодобывающая промышленность", href: "/otrasli/metallurgiya-gornodobycha/", col: 0, row: 1 },
  { label: "Коммерческие и промышленные объекты", href: "/otrasli/kommercheskie-promyshlennye-obekty/", col: 1, row: 1 },
  { label: "Сельское хозяйство", href: "/otrasli/selskoe-hozyaystvo/", col: 2, row: 1 },
  { label: "Другое — по запросу", href: "/otrasli/drugoe/", col: 3, row: 1 },
];

function IndustryIcon({ col, row }: { col: number; row: number }) {
  return (
    <span
      aria-hidden
      className="block h-8 w-8"
      style={{
        backgroundImage: "url(/assets/icons-industries.png)",
        backgroundSize: "400% 200%",
        backgroundPosition: `${(col / 3) * 100}% ${row * 100}%`,
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}

export function Otrasli() {
  return (
    <section id="otrasli" className="border-t border-sk-border bg-sk-bg-alt">
      <div className="mx-auto max-w-[1180px] px-4 py-16 md:px-6 md:py-20">
        <h2 className="max-w-[560px] font-sk-display text-[28px] font-bold leading-tight text-sk-ink md:text-[34px]">
          Отрасли
        </h2>
        <p className="mt-4 max-w-[760px] text-[16px] leading-relaxed text-sk-ink">
          Мы поставляем металлоконструкции для промышленных объектов любого уровня
          сложности. Среди наших ключевых заказчиков — предприятия следующих
          отраслей:
        </p>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {INDUSTRIES.map((ind) => (
            <a
              key={ind.href}
              href={ind.href}
              className="group flex flex-col items-start gap-3 border border-sk-steel bg-sk-bg p-5 transition-colors hover:bg-sk-surface"
            >
              <IndustryIcon col={ind.col} row={ind.row} />
              <span className="font-sk-mono text-[11px] uppercase leading-snug tracking-wide text-sk-ink">
                {ind.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
