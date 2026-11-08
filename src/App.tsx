import { Header } from "./components/site/Header";
import { Hero } from "./components/site/Hero";
import { OKompanii } from "./components/site/OKompanii";
import { Cikl } from "./components/site/Cikl";
import { Uslugi } from "./components/site/Uslugi";
import { Garantii } from "./components/site/Garantii";
import { Proizvodstvo } from "./components/site/Proizvodstvo";
import { Prozrachnost } from "./components/site/Prozrachnost";
import { Faq } from "./components/site/Faq";
import { CtaForma } from "./components/site/CtaForma";
import { PochemuVybirayutNas } from "./components/site/PochemuVybirayutNas";
import { Footer } from "./components/site/Footer";
import { IndustryGrid, Section } from "./components/PageParts";
import { industries, industryPath } from "./data/industries";
import { services } from "./data/services";
import { normalizePath } from "./data/site";
import { AboutPage, BlogPage, ContactsPage, IndustriesPage, IndustryPage, LegalPage, NotFoundPage, ProductionPage, ProductPage, ProjectsPage, ServicePage } from "./pages/Pages";

function HomePage() {
  return <><Hero /><OKompanii /><Section title="Отрасли применения" label="Где работают наши конструкции" intro="Поставляем металлоконструкции для промышленных объектов любого уровня сложности. Среди наших ключевых заказчиков — предприятия следующих отраслей." alternate><IndustryGrid showProductLink={false} /></Section><PochemuVybirayutNas /><Cikl /><Uslugi /><Garantii /><Proizvodstvo /><Prozrachnost /><Faq /><CtaForma /></>;
}

function Content({ path }: { path: string }) {
  const service = services.find(item => item.path === path);
  if (service) return <ServicePage service={service} />;
  const industry = industries.find(item => industryPath(item) === path);
  if (industry) return <IndustryPage industry={industry} />;
  switch (path) {
    case "/": return <HomePage />;
    case "/o-kompanii/": return <AboutPage />;
    case "/produkciya/": return <ProductPage />;
    case "/proizvodstvo/": return <ProductionPage />;
    case "/proekty/": return <ProjectsPage />;
    case "/blog/": return <BlogPage />;
    case "/kontakty/": return <ContactsPage />;
    case "/otrasli/": return <IndustriesPage />;
    case "/politika/": return <LegalPage />;
    case "/soglasie/": return <LegalPage consent />;
    default: return <NotFoundPage />;
  }
}
export function App({ path = "/" }: { path?: string }) {
  const normalized = normalizePath(path);
  return <><a href="#main-content" className="skip-link">К содержимому</a><Header path={normalized} /><main id="main-content" tabIndex={-1}><Content path={normalized} /></main><Footer /></>;
}
