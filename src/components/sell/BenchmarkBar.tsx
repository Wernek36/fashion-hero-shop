"use client";

export type TierScope = "wariant" | "model" | "kategoria";

export interface BenchmarkTier {
  scope: TierScope;
  description: string;
  medianPrice: number;
  offerCount: number;
}

interface BenchmarkBarProps {
  tiers: BenchmarkTier[];
}

const scopeLabel: Record<TierScope, string> = {
  wariant: "Mediana wariantu",
  model: "Mediana modelu",
  kategoria: "Mediana kategorii",
};

const scopeNoun: Record<TierScope, string> = {
  wariant: "Wariant",
  model: "Model",
  kategoria: "Kategoria",
};

function formatCount(n: number): string {
  return n.toLocaleString("pl-PL");
}

export function BenchmarkBar({ tiers }: BenchmarkBarProps) {
  const visible = tiers.length > 0;
  const [primary, ...secondary] = tiers;

  return (
    <div
      aria-hidden={!visible}
      className={`transition-opacity duration-200 ease-out ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none h-0 overflow-hidden"
      }`}
    >
      {visible && (
        <div className="rounded-md border border-cream-dark bg-cream-light px-4 py-3.5">
          <p className="text-base font-semibold text-charcoal sm:text-lg">
            {scopeLabel[primary.scope]}: {primary.medianPrice} zł
          </p>
          <p className="mt-1 text-[11px] leading-relaxed text-warm-gray">
            {primary.description} · na podstawie {formatCount(primary.offerCount)}{" "}
            aktywnych ofert w FashionHero, aktualizacja dzienna
          </p>

          {secondary.length > 0 && (
            <div className="mt-3 border-t border-cream-dark pt-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.5px] text-warm-gray">
                Szerszy benchmark
              </p>
              <ul className="mt-1.5 space-y-1">
                {secondary.map((tier) => (
                  <li
                    key={tier.scope}
                    className="text-[12px] leading-relaxed text-charcoal-light"
                  >
                    <span className="text-warm-gray">{scopeNoun[tier.scope]}:</span>{" "}
                    <span>{tier.description}</span>{" "}
                    <span className="font-medium">· {tier.medianPrice} zł</span>{" "}
                    <span className="text-warm-gray">
                      · {formatCount(tier.offerCount)} ofert
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
