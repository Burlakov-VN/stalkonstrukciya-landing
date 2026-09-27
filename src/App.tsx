import { Header } from "./components/site/Header";
import { Hero } from "./components/site/Hero";
import { OKompanii } from "./components/site/OKompanii";
import { Cikl } from "./components/site/Cikl";
import { Uslugi } from "./components/site/Uslugi";
import { Garantii } from "./components/site/Garantii";
import { Proizvodstvo } from "./components/site/Proizvodstvo";
import { Otrasli } from "./components/site/Otrasli";
import { PochemuVybirayutNas } from "./components/site/PochemuVybirayutNas";
import { Proekty } from "./components/site/Proekty";
import { Blog } from "./components/site/Blog";
import { Prozrachnost } from "./components/site/Prozrachnost";
import { Faq } from "./components/site/Faq";
import { CtaForma } from "./components/site/CtaForma";
import { Footer } from "./components/site/Footer";

export function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <OKompanii />
        <Otrasli />
        <PochemuVybirayutNas />
        <Cikl />
        <Uslugi />
        <Garantii />
        <Proizvodstvo />
        <Proekty />
        <Blog />
        <Prozrachnost />
        <Faq />
        <CtaForma />
      </main>
      <Footer />
    </>
  );
}
