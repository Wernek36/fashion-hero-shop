"use client";

interface BenchmarkBarProps {
  visible: boolean;
  medianPrice: number;
  offerCount: number;
}

export function BenchmarkBar({ visible, medianPrice, offerCount }: BenchmarkBarProps) {
  return (
    <div
      aria-hidden={!visible}
      className={`transition-opacity duration-200 ease-out ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none h-0 overflow-hidden"
      }`}
    >
      <div className="rounded-md border border-cream-dark bg-cream-light px-4 py-3.5">
        <p className="text-base font-semibold text-charcoal sm:text-lg">
          Mediana kategorii: {medianPrice} zł
        </p>
        <p className="mt-1 text-[11px] leading-relaxed text-warm-gray">
          na podstawie {offerCount.toLocaleString("pl-PL")} aktywnych ofert w FashionHero,
          aktualizacja dzienna
        </p>
      </div>
    </div>
  );
}
