"use client";

export type GapSignal = "hot" | "oversupplied";

export interface DemandGap {
  attribute: string;
  searches: number;
  activeOffers: number;
  demandSupplyRatio: number;
  avgSoldPrice: number;
  returnRate: number;
  signal: GapSignal;
  note: string;
}

interface GapCardProps {
  gap: DemandGap;
  onListClick: (gap: DemandGap) => void;
}

function formatNumber(n: number): string {
  return n.toLocaleString("pl-PL");
}

function WarningIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 flex-shrink-0"
      aria-hidden="true"
    >
      <path d="M10 7v4" />
      <path d="M10 14.5h.01" />
      <path d="M8.6 2.9 1.7 15a1.6 1.6 0 0 0 1.4 2.4h13.8a1.6 1.6 0 0 0 1.4-2.4L11.4 2.9a1.6 1.6 0 0 0-2.8 0Z" />
    </svg>
  );
}

export function GapCard({ gap, onListClick }: GapCardProps) {
  const isHot = gap.signal === "hot";

  return (
    <div
      className={`rounded-lg border p-5 transition-colors ${
        isHot
          ? "border-black/10 bg-white"
          : "border-black/5 bg-cream-light opacity-70"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3
            className={`text-base font-semibold sm:text-lg ${
              isHot ? "text-charcoal" : "text-warm-gray"
            }`}
          >
            {gap.attribute}
          </h3>

          {gap.signal === "oversupplied" && (
            <p className="mt-1 flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.5px] text-warm-gray">
              <WarningIcon />
              Przesycone: nie wchodź tu
            </p>
          )}
        </div>

        {/* Main metric: demand/supply ratio */}
        <div className="flex-shrink-0 text-right">
          <div
            className={`text-2xl font-bold leading-none sm:text-3xl ${
              isHot ? "text-amber-600" : "text-warm-gray"
            }`}
          >
            {gap.demandSupplyRatio.toLocaleString("pl-PL", {
              minimumFractionDigits: gap.demandSupplyRatio < 1 ? 2 : 1,
              maximumFractionDigits: gap.demandSupplyRatio < 1 ? 2 : 1,
            })}
            ×
          </div>
          <div className="mt-0.5 text-[10px] uppercase tracking-[0.5px] text-warm-gray">
            popyt vs podaż
          </div>
        </div>
      </div>

      {/* Searches vs offers */}
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[13px]">
        <div>
          <span className="font-medium text-charcoal">
            {formatNumber(gap.searches)}
          </span>{" "}
          <span className="text-warm-gray">wyszukiwań</span>
        </div>
        <div>
          <span className="font-medium text-charcoal">
            {formatNumber(gap.activeOffers)}
          </span>{" "}
          <span className="text-warm-gray">aktywnych ofert</span>
        </div>
      </div>

      {/* Context: avg price + return rate */}
      <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-[12px] text-warm-gray">
        <span>
          śr. cena sprzedaży:{" "}
          <span className="text-charcoal">{gap.avgSoldPrice} zł</span>
        </span>
        <span>
          zwroty kategorii:{" "}
          <span className="text-charcoal">
            {Math.round(gap.returnRate * 100)}%
          </span>
        </span>
      </div>

      {/* One-line insight */}
      <p className="mt-3 border-t border-black/5 pt-3 text-[13px] leading-relaxed text-charcoal-light">
        {gap.note}
      </p>

      {/* CTA only for hot gaps */}
      {isHot && (
        <button
          type="button"
          onClick={() => onListClick(gap)}
          className="mt-4 w-full rounded-md bg-charcoal px-4 py-2.5 text-[12px] font-medium uppercase tracking-[0.5px] text-white transition-colors hover:bg-charcoal-light focus:outline-none focus:ring-2 focus:ring-charcoal focus:ring-offset-2"
        >
          Wystaw w tej luce →
        </button>
      )}
    </div>
  );
}
