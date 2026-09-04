// Демо-изображения (без текста) для визуализации макета — НЕ реальные
// объекты компании. Реальное портфолио появится по мере поступления
// материалов от собственников (см. Бизнес-разрывы/01-voprosy-sobstvennikam.md).
const PLACEHOLDER_PHOTOS = ["/assets/proekt-grain.jpg", "/assets/proekt-warehouse.jpg"];

export function Proekty() {
  return (
    <section id="proekty" className="border-t border-sk-border bg-sk-bg">
      <div className="mx-auto max-w-[1180px] px-4 py-16 md:px-6 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-sk-display text-[28px] font-bold leading-tight text-sk-ink md:text-[34px]">
            Проекты
          </h2>
          <a
            href="/proekty/"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-sk-steel hover:text-sk-ink"
          >
            Все проекты
            <span className="font-sk-mono">→</span>
          </a>
        </div>

        <div className="relative mt-10 grid gap-4 sm:grid-cols-2">
          {PLACEHOLDER_PHOTOS.map((src) => (
            <div key={src} className="aspect-[4/3] overflow-hidden border border-sk-border grayscale">
              <img src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-sk-bg/80 text-center">
            <span className="font-sk-display text-[20px] font-bold text-sk-ink">
              Кейсы скоро
            </span>
            <p className="max-w-[320px] text-[14px] text-sk-text-2">
              Готовим примеры реализованных объектов — ангары и здания из
              сэндвич-панелей.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
