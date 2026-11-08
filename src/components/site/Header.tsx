import { useEffect, useState } from "react";
import { companyNavigation } from "../../data/navigation";
import { ContactDetails, MessengerButtons } from "./ContactButtons";
import { imageVariants } from "../../data/images";

const navigation = [
  { title: "Продукция", href: "/produkciya/" },
  { title: "Отрасли", href: "/otrasli/" },
  { title: "Контакты", href: "/kontakty/" },
];
const services = [{ title: "Проектирование", href: "/proektirovanie/" }, { title: "Комплексная поставка", href: "/postavka/" }, { title: "Монтажные работы", href: "/montazh/" }];

export function Header({ path = "/" }: { path?: string }) {
  const logo = imageVariants["/brand/mark-square.png"]!;
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      document.querySelectorAll<HTMLDetailsElement>(".desktop-nav details[open]").forEach(menu => { if (!menu.contains(event.target as Node)) menu.open = false; });
    };
    const closeEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      document.querySelectorAll<HTMLDetailsElement>(".desktop-nav details[open]").forEach(menu => { menu.open = false; if (menu.contains(document.activeElement)) menu.querySelector("summary")?.focus(); });
    };
    const resize = () => { if (window.innerWidth >= 1280) setOpen(false); };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeEscape);
    window.addEventListener("resize", resize);
    return () => { document.removeEventListener("pointerdown", closeOutside); document.removeEventListener("keydown", closeEscape); window.removeEventListener("resize", resize); };
  }, []);
  useEffect(() => {
    if (!open) return;
    const listener = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); document.getElementById("menu-toggle")?.focus(); } };
    const previous = document.body.style.overflow; document.body.style.overflow = "hidden";
    document.addEventListener("keydown", listener);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", listener); };
  }, [open]);
  const active = (href: string) => path === href ? "page" as const : undefined;
  return <header className="site-header"><div className="header-container">
    <a href="/" className="brand-link" aria-label="Стальконструкция — главная"><img src={logo.src} srcSet={logo.srcSet} sizes="36px" alt="" width="36" height="36" /><span>Корпорация<br /><strong>Стальконструкция</strong></span></a>
    <nav className="desktop-nav" aria-label="Основная навигация">
      <details className="services-menu company-menu"><summary className={companyNavigation.some(item => item.href === path) ? "is-active" : undefined}>О компании <span aria-hidden="true">⌄</span></summary><div>{companyNavigation.map(item => <a key={item.href} href={item.href} aria-current={active(item.href)}>{item.title}</a>)}</div></details>
      {navigation.slice(0, 1).map(item => <a key={item.href} href={item.href} aria-current={active(item.href)}>{item.title}</a>)}
      <details className="services-menu"><summary className={services.some(item => item.href === path) ? "is-active" : undefined}>Услуги <span aria-hidden="true">⌄</span></summary><div>{services.map(item => <a key={item.href} href={item.href} aria-current={active(item.href)}>{item.title}</a>)}</div></details>
      {navigation.slice(1).map(item => <a key={item.href} href={item.href} aria-current={active(item.href)}>{item.title}</a>)}
    </nav>
    <div className="header-contact-actions"><ContactDetails /><MessengerButtons /><a className="button-primary header-cta" href="#raschet">Получить расчёт <span aria-hidden="true">↗</span></a></div>
    <button id="menu-toggle" className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Закрыть меню" : "Открыть меню"} onClick={() => setOpen(value => !value)}><span>{open ? "×" : "☰"}</span></button>
  </div>
    <nav id="mobile-navigation" aria-label="Мобильная навигация" className="mobile-navigation" hidden={!open} onClick={event => { if ((event.target as HTMLElement).closest("a")) setOpen(false); }}>
      <a href="/" aria-current={active("/")}>Главная<span aria-hidden="true">↗</span></a>
      <details className="mobile-company-menu" open={companyNavigation.some(item => item.href === path) || undefined}><summary>О компании <span aria-hidden="true">⌄</span></summary><div>{companyNavigation.map(item => <a key={item.href} href={item.href} aria-current={active(item.href)}>{item.title}<span aria-hidden="true">↗</span></a>)}</div></details>
      {[...navigation.slice(0, 1), ...services, ...navigation.slice(1)].map(item => <a key={item.href} href={item.href} aria-current={active(item.href)}>{item.title}<span aria-hidden="true">↗</span></a>)}
      <div className="mobile-contact-panel"><ContactDetails /><MessengerButtons labels /><p>Контакты мессенджеров будут добавлены перед запуском.</p></div>
      <a className="button-primary" href="#raschet">Получить расчёт</a>
    </nav>
  </header>;
}
