import { industries, industryPath } from "./industries";
import { services } from "./services";

export const siteName = "Корпорация Стальконструкция";
export const pages = [
  { path: "/", title: "Здания и сооружения из металлоконструкций", description: "Проектирование, изготовление, комплексная поставка и монтаж металлоконструкций. Собственное производство, работа по всей России с 1995 года." },
  { path: "/o-kompanii/", title: "О компании", description: "ООО «Корпорация Стальконструкция»: собственное производство, проектирование и монтаж металлоконструкций с 1995 года." },
  { path: "/produkciya/", title: "Выпускаемая продукция", description: "Металлоконструкции для нефтегаза, нефтехимии, энергетики, промышленности, сельского хозяйства и общественных зданий. Изготовление по чертежам заказчика." },
  ...services.map(service => ({ path: service.path, title: service.title, description: service.intro })),
  { path: "/proizvodstvo/", title: "Производство", description: "Собственный цех металлоконструкций. ОТК, контроль сварных швов, НАКС и документы качества. Посещение производства по согласованию." },
  { path: "/proekty/", title: "Проекты", description: "Обсудите задачу вашего объекта и релевантный опыт изготовления, поставки и монтажа металлоконструкций." },
  { path: "/blog/", title: "Блог", description: "Материалы о проектировании, комплектации и монтаже металлоконструкций. Полезные разделы для подготовки вашего проекта." },
  { path: "/kontakty/", title: "Контакты", description: "Контактная информация и реквизиты ООО «Корпорация Стальконструкция». Запрос расчёта и обсуждение проекта." },
  { path: "/otrasli/", title: "Отрасли применения", description: "Металлоконструкции для девяти отраслевых направлений. Выберите отрасль и изучите состав выпускаемой продукции." },
  ...industries.map(industry => ({ path: industryPath(industry), title: industry.title, description: industry.intro })),
  { path: "/politika/", title: "Политика конфиденциальности", description: "Информация об обработке данных, передаваемых через форму заявки на сайте." },
  { path: "/soglasie/", title: "Согласие на обработку персональных данных", description: "Условия обработки данных и документов при обращении через форму заявки." },
];

export function normalizePath(path: string) {
  return path === "/" ? "/" : `/${path.split("/").filter(Boolean).join("/")}/`;
}
export function pageFor(path: string) {
  return pages.find(page => page.path === normalizePath(path));
}
