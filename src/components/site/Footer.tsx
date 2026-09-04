const INDUSTRIES = [
  { label: "Нефтегазовая отрасль", href: "/otrasli/neftegaz/" },
  { label: "Нефтепереработка и нефтехимия", href: "/otrasli/neftepererabotka-neftehimiya/" },
  { label: "Химическая промышленность", href: "/otrasli/himicheskaya-promyshlennost/" },
  { label: "Энергетика", href: "/otrasli/energetika/" },
  { label: "Металлургическая и горнодобывающая", href: "/otrasli/metallurgiya-gornodobycha/" },
  { label: "Коммерческие и промышленные объекты", href: "/otrasli/kommercheskie-promyshlennye-obekty/" },
  { label: "Сельское хозяйство", href: "/otrasli/selskoe-hozyaystvo/" },
];

const PAGES = [
  { label: "Главная", href: "/" },
  { label: "О компании", href: "/o-kompanii/" },
  { label: "Продукция", href: "/produkciya/" },
  { label: "Проектирование", href: "/proektirovanie/" },
  { label: "Комплексная поставка", href: "/postavka/" },
  { label: "Монтаж", href: "/montazh/" },
  { label: "Производство", href: "/proizvodstvo/" },
  { label: "Отрасли", href: "/otrasli/" },
  { label: "Проекты", href: "/proekty/" },
  { label: "Блог", href: "/blog/" },
  { label: "Контакты", href: "/kontakty/" },
];

export function Footer() {
  return (
    <footer className="bg-sk-ink text-white/80">
      <div className="mx-auto max-w-[1180px] px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <img
                src="/brand/mark-square.png"
                alt="Стальконструкция"
                className="h-8 w-8 brightness-0 invert"
              />
              <span className="font-sk-display text-[15px] font-bold text-white">
                Стальконструкция
              </span>
            </div>
            <p className="mt-3 max-w-[220px] text-[13px] leading-relaxed text-white/60">
              Промышленные здания под ключ. Проектирование, производство,
              монтаж в одном контракте.
            </p>
          </div>

          <nav className="flex flex-col gap-2 text-[13px]">
            <span className="mb-1 font-sk-mono text-[11px] uppercase tracking-wide text-white/40">
              Навигация
            </span>
            {PAGES.map((p) => (
              <a key={p.href} href={p.href} className="hover:text-white">
                {p.label}
              </a>
            ))}
          </nav>

          <nav className="flex flex-col gap-2 text-[13px]">
            <span className="mb-1 font-sk-mono text-[11px] uppercase tracking-wide text-white/40">
              Отрасли
            </span>
            {INDUSTRIES.map((i) => (
              <a key={i.href} href={i.href} className="hover:text-white">
                {i.label}
              </a>
            ))}
            <a href="/otrasli/drugoe/" className="hover:text-white">
              Другое — по запросу
            </a>
          </nav>

          <div className="flex flex-col gap-2 text-[13px]">
            <span className="mb-1 font-sk-mono text-[11px] uppercase tracking-wide text-white/40">
              Контакты
            </span>
            <span className="text-white/60">Телефон: [ТЕЛЕФОН]</span>
            <span className="text-white/60">Telegram: [TELEGRAM]</span>
            <span className="text-white/60">Email: [EMAIL]</span>
            <span className="mt-2 text-white/60">Работаем по всей России</span>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 font-sk-mono text-[11px] text-white/40 md:flex-row md:items-center md:justify-between">
          <span>
            ООО «Корпорация Стальконструкция» · ИНН 7453273591 · ОГРН
            1147453010231
          </span>
          <span>454080, Челябинск, ул. Тернопольская, д. 6, пом. 124</span>
        </div>
      </div>
    </footer>
  );
}
