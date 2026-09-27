const REASONS = [
  {
    title: "Отраслевой опыт",
    description:
      "десятки реализованных проектов для нефтепереработки, химии, агропрома и торговой инфраструктуры.",
  },
  {
    title: "Полный цикл",
    description:
      "разработка проектной документации, изготовление, антикоррозионная обработка, огнезащита, логистика, монтаж и шеф-монтаж, комплектация объектов строительными материалами.",
  },
  {
    title: "Собственное производство",
    description:
      "контроль качества на всех этапах: от заготовки до сварки и покраски.",
  },
  {
    title: "Соблюдение стандартов",
    description:
      "работаем по ГОСТ 23118-2019, СП 53-101-98, СП 16.13330.2017, СП 28.13330.2017, СП 470.1325800.2019, требованиям заказчика и проектным решениям.",
  },
  {
    title: "Гибкость",
    description:
      "изготавливаем как типовые фермы и колонны, так и нестандартные конструкции по чертежам Заказчика.",
  },
  {
    title: "Сроки",
    description:
      "чёткое планирование, поэтапная сдача, минимизация простоев на стройплощадке.",
  },
  {
    title: "Сервис",
    description:
      "помогаем с оптимизацией металлоёмкости, подбором марок стали, защитой от коррозии в агрессивных средах.",
  },
];

export function PochemuVybirayutNas() {
  return (
    <section className="border-t border-sk-border bg-sk-bg">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-4 py-16 md:grid-cols-[240px_1fr] md:gap-12 md:px-6 md:py-20">
        <div>
          <span className="font-sk-mono text-[11px] uppercase tracking-wide text-sk-steel">
            // преимущества
          </span>
          <h2 className="mt-3 font-sk-display text-[28px] font-bold leading-tight text-sk-ink md:text-[34px]">
            Почему выбирают нас
          </h2>
        </div>

        <ol aria-label="Преимущества компании" className="border-t border-sk-border">
          {REASONS.map((reason, index) => (
            <li
              key={reason.title}
              className="grid gap-3 border-b border-sk-border py-5 sm:grid-cols-[48px_170px_1fr] sm:gap-5 sm:py-6"
            >
              <span className="font-sk-mono text-[11px] text-sk-steel">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-sk-display text-[18px] font-bold leading-snug text-sk-ink">
                {reason.title}
              </h3>
              <p className="max-w-[680px] text-[15px] leading-relaxed text-sk-ink">
                {reason.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
