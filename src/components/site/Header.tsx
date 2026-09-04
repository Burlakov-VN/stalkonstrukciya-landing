import { useState } from "react";

const NAV = [
  { label: "О компании", href: "/o-kompanii/" },
  { label: "Продукция", href: "/produkciya/" },
  {
    label: "Услуги",
    href: "/proektirovanie/",
    children: [
      { label: "Проектирование", href: "/proektirovanie/" },
      { label: "Комплексная поставка", href: "/postavka/" },
      { label: "Монтаж", href: "/montazh/" },
    ],
  },
  { label: "Производство", href: "/proizvodstvo/" },
  { label: "Проекты", href: "/proekty/" },
  { label: "Блог", href: "/blog/" },
  { label: "Контакты", href: "/kontakty/" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-sk-border bg-sk-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-4 py-3 md:px-6">
        <a href="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/brand/mark-square.png"
            alt="Стальконструкция"
            className="h-9 w-9"
          />
          <span className="font-sk-display text-[15px] font-bold leading-tight text-sk-ink">
            Стальконструкция
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-6 font-sk-body text-[14px] text-sk-ink">
          {NAV.map((item) => (
            <div key={item.label} className="relative group">
              <a
                href={item.href}
                className="py-2 hover:text-sk-steel transition-colors"
              >
                {item.label}
                {item.children && <span className="ml-1 text-sk-text-3">▾</span>}
              </a>
              {item.children && (
                <div className="absolute left-0 top-full hidden min-w-[220px] flex-col border border-sk-border bg-sk-surface py-2 shadow-[0_8px_24px_rgba(22,35,46,0.08)] group-hover:flex">
                  {item.children.map((c) => (
                    <a
                      key={c.href}
                      href={c.href}
                      className="px-4 py-2 hover:bg-sk-bg-alt hover:text-sk-steel"
                    >
                      {c.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+70000000000"
            className="font-sk-mono text-[13px] text-sk-text-2"
          >
            [ТЕЛЕФОН]
          </a>
          <a
            href="#raschet"
            className="bg-sk-accent px-4 py-2.5 text-[14px] font-semibold text-white transition-[filter] hover:brightness-95"
          >
            Получить расчёт →
          </a>
        </div>

        <button
          type="button"
          aria-label="Открыть меню"
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-[1.5px] w-6 bg-sk-ink" />
          <span className="block h-[1.5px] w-6 bg-sk-ink" />
          <span className="block h-[1.5px] w-6 bg-sk-ink" />
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-sk-border bg-sk-surface px-4 py-4">
          <nav className="flex flex-col gap-1 font-sk-body text-[15px] text-sk-ink">
            {NAV.flatMap((item) =>
              item.children
                ? [item, ...item.children]
                : [item],
            ).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="py-2.5 border-b border-sk-border last:border-0"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#raschet"
            className="mt-4 block bg-sk-accent px-4 py-3 text-center text-[14px] font-semibold text-white"
          >
            Получить расчёт →
          </a>
        </div>
      )}
    </header>
  );
}
