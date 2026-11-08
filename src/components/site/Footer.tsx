import { industries, industryPath } from "../../data/industries";
import { companyNavigation } from "../../data/navigation";

const links = [{ title: "Главная", href: "/" }, { title: "О компании", href: "/o-kompanii/" }, { title: "Продукция", href: "/produkciya/" }, { title: "Проектирование", href: "/proektirovanie/" }, { title: "Комплексная поставка", href: "/postavka/" }, { title: "Монтажные работы", href: "/montazh/" }, { title: "Производство", href: "/proizvodstvo/" }, { title: "Отрасли", href: "/otrasli/" }, { title: "Проекты", href: "/proekty/" }, { title: "Блог", href: "/blog/" }, { title: "Контакты", href: "/kontakty/" }];
export function Footer() {
  return <footer className="site-footer"><div className="page-container"><div className="footer-grid">
    <div><a className="footer-brand" href="/">Корпорация<br />Стальконструкция</a><p>Здания и сооружения из металлоконструкций. Проектирование, производство и монтаж.</p><span className="kicker">С 1995 года · Вся Россия</span></div>
    <nav aria-label="Разделы сайта"><h2>Навигация</h2>{links.filter(link => !companyNavigation.some(item => item.href === link.href)).map(link => <a key={link.href} href={link.href}>{link.title}</a>)}<div className="footer-company-group"><a href="/o-kompanii/" className="footer-group-title">О компании</a>{companyNavigation.slice(1).map(link => <a key={link.href} href={link.href}>{link.title}</a>)}</div></nav>
    <nav aria-label="Отрасли"><h2>Продукция по отраслям</h2>{industries.map(industry => <a key={industry.slug} href={industryPath(industry)}>{industry.title}</a>)}<a href="/produkciya/#po-chertezham">По чертежам заказчика</a></nav>
    <div><h2>Контакты</h2><span className="test-label">Тестовые данные</span><p>+7 (000) 000-00-00<br />info@example.com<br />Telegram: не указан</p><p>Контакты для связи и адрес посещения будут уточнены перед запуском.</p><a href="/kontakty/">Реквизиты и форма заявки ↗</a></div>
  </div><div className="footer-legal"><p>ООО «Корпорация Стальконструкция»<br />ИНН 7453273591 · ОГРН 1147453010231</p><p>Юридический адрес:<br />454080, Челябинск, ул. Тернопольская, д. 6, пом. 124</p><div><a href="/politika/">Политика конфиденциальности</a><a href="/soglasie/">Согласие на обработку данных</a></div></div></div></footer>;
}
