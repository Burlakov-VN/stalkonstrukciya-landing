import type { ReactNode } from "react";
import type { Item } from "../data/services";
import { industries, industryPath, standards } from "../data/industries";
import { imageVariants } from "../data/images";

export function Section({ title, label, intro, children, alternate = false, id, heading = "h2" }: { title: string; label?: string; intro?: string; children: ReactNode; alternate?: boolean; id?: string; heading?: "h1" | "h2" }) {
  const Heading = heading;
  return <section id={id} className={`page-section${alternate ? " page-section-alt" : ""}`}><div className="page-container">
    <div className="section-heading">{label && <span className="kicker">{label}</span>}<Heading>{title}</Heading>{intro && <p>{intro}</p>}</div>{children}
  </div></section>;
}
export function PageHero({ title, intro, label, image, imageAlt = "Иллюстрация металлоконструкций и производственных работ", imageCaption = "Проектирование · Производство · Монтаж", parent, cta = "Получить расчёт" }: { title: string; intro: string; label?: string; image?: string; imageAlt?: string; imageCaption?: string; parent?: { title: string; href: string }; cta?: string }) {
  const variant = image ? imageVariants[image] : undefined;
  return <section className="page-hero sk-blueprint-grid"><div className="page-container">
    <nav aria-label="Хлебные крошки" className="breadcrumbs"><a href="/">Главная</a><span aria-hidden="true">/</span>{parent && <><a href={parent.href}>{parent.title}</a><span aria-hidden="true">/</span></>}<span aria-current="page">{title}</span></nav>
    <div className={`page-hero-grid${image ? " has-image" : ""}`}><div>{label && <span className="kicker">{label}</span>}<h1>{title}</h1><p className="hero-description">{intro}</p><div className="hero-actions"><a className="button-primary" href="#raschet">{cta}<span aria-hidden="true">↗</span></a><span className="response-note">Предварительный расчёт<br />за 2–3 рабочих дня</span></div></div>
      {image && <figure className="hero-figure"><img src={variant?.src ?? image} srcSet={variant?.srcSet} sizes="(min-width: 1180px) 430px, (min-width: 900px) 38vw, (min-width: 640px) 640px, 100vw" width={variant?.width} height={variant?.height} alt={imageAlt} fetchPriority="high" /><figcaption>{imageCaption}</figcaption></figure>}
    </div>
  </div></section>;
}
export function ItemList({ items }: { items: Item[] }) {
  return <div className="item-list">{items.map((item, i) => <article className="item-row" key={item.title}><span className="item-number">{String(i + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>;
}
export function Benefits({ title, items, layout = "grid" }: { title: string; items: Item[]; layout?: "grid" | "flow" }) {
  if (layout === "flow") {
    const icons = ["user-circle-gear", "shield-check", "timer", "currency-circle-dollar"];
    return <Section title={title} label="Комплексная поставка"><ol className="supply-benefits">{items.map((item, i) => <li key={item.title}><div className="supply-benefit-icon"><img src={`/icons/supply/${icons[i]}.svg`} alt="" width="96" height="96" decoding="async" /></div><h3>{item.title}</h3><p>{item.text}</p>{i < items.length - 1 && <span className="supply-benefit-arrow" aria-hidden="true">→</span>}</li>)}</ol><a href="#raschet" className="text-link">Обсудить вашу задачу <span aria-hidden="true">↗</span></a></Section>;
  }
  return <section className="benefit-section"><div className="page-container"><span className="kicker">Результат для заказчика</span><h2>{title}</h2><div className="benefit-grid">{items.map((item, i) => <article key={item.title}><span className="item-number">/{String(i + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div><a href="#raschet" className="text-link">Обсудить вашу задачу <span aria-hidden="true">↗</span></a></div></section>;
}
export function Process({ items }: { items: Item[] }) {
  return <Section label="Порядок работы" title="Понятный следующий шаг"><ol className="process-grid">{items.map((item, i) => <li key={item.title}><span className="process-number">{String(i + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.text}</p></li>)}</ol></Section>;
}
export function Questions({ items }: { items: Item[] }) {
  return <Section title="Ответы на вопросы" label="До начала работ" alternate><div className="question-list">{items.map(item => <details key={item.title}><summary>{item.title}<span aria-hidden="true">+</span></summary><p>{item.text}</p></details>)}</div></Section>;
}
export function IndustryGrid({ detailed = false, showProductLink = true }: { detailed?: boolean; showProductLink?: boolean }) {
  return <div className="industry-grid">{industries.map((industry, i) => <a key={industry.slug} href={industryPath(industry)} className="industry-card"><span className="industry-card-top"><span className="item-number">{String(i + 1).padStart(2, "0")}</span><span aria-hidden="true">↗</span></span><h3>{industry.title}</h3>{detailed && <p>{industry.intro}</p>}{showProductLink && <span className="industry-card-link">Состав продукции</span>}</a>)}</div>;
}
export function Quality() {
  return <Section title="Качество, которое сопровождается документами" label="Контроль производства" intro="ОТК на каждом этапе, неразрушающий контроль сварных швов, аттестация НАКС и сертификаты на металлопрокат по партиям." alternate><div className="standard-list">{standards.map(standard => <span key={standard}>{standard}</span>)}</div><p className="section-note">Работаем по требованиям заказчика и проектным решениям. Состав документов на конкретный заказ согласуем до начала изготовления.</p><a className="text-link" href="/proizvodstvo/">Подробнее о производстве <span aria-hidden="true">↗</span></a></Section>;
}
export function RelatedServices({ exclude }: { exclude?: string }) {
  const links = [{ href: "/proektirovanie/", title: "Проектирование", text: "Проектная и рабочая документация, КМ и КМД." }, { href: "/postavka/", title: "Комплексная поставка", text: "Металлоконструкции и материалы в едином графике." }, { href: "/montazh/", title: "Монтажные работы", text: "Сборка на площадке и инженерное сопровождение." }].filter(item => item.href !== exclude);
  return <Section title="Подключите следующий этап" label="Полный цикл"><div className="related-grid">{links.map(link => <a className="related-link" href={link.href} key={link.href}><h3>{link.title}<span aria-hidden="true">↗</span></h3><p>{link.text}</p></a>)}</div></Section>;
}
