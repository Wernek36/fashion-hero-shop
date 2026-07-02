"use client";

import { useState, useMemo, useEffect } from "react";
import demandData from "@/data/demand-gaps.json";
import { GapCard, type DemandGap } from "./GapCard";
import { track } from "@/lib/analytics";

interface Category {
  id: string;
  label: string;
  gaps: DemandGap[];
}

const categories = demandData.categories as Category[];

export function InsightsView() {
  const [categoryId, setCategoryId] = useState<string>(categories[0].id);

  const selectedCategory = useMemo(
    () => categories.find((c) => c.id === categoryId) ?? categories[0],
    [categoryId],
  );

  const sortedGaps = useMemo(
    () =>
      [...selectedCategory.gaps].sort(
        (a, b) => b.demandSupplyRatio - a.demandSupplyRatio,
      ),
    [selectedCategory],
  );

  // Fire once on mount so the test can see the screen was reached.
  useEffect(() => {
    track("insights_viewed", { category_id: categories[0].id });
  }, []);

  function handleCategoryChange(value: string) {
    setCategoryId(value);
    const category = categories.find((c) => c.id === value);
    track("insights_category_changed", {
      category_id: value,
      category_label: category?.label ?? null,
      top_ratio: category
        ? Math.max(...category.gaps.map((g) => g.demandSupplyRatio))
        : null,
    });
  }

  function handleListClick(gap: DemandGap) {
    track("insights_gap_cta_clicked", {
      category_id: selectedCategory.id,
      attribute: gap.attribute,
      demand_supply_ratio: gap.demandSupplyRatio,
    });
    alert("Prototyp — flow wystawiania niedostępny");
  }

  return (
    <div>
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-light text-charcoal sm:text-3xl">
          Luka Podażowa
        </h1>
        <p className="mt-2 text-sm text-warm-gray">
          Czego szukają Twoi kupujący, a czego brakuje w ofercie
        </p>

        <div className="mt-5 flex flex-col gap-2">
          <label
            htmlFor="category"
            className="text-[11px] font-medium uppercase tracking-[0.5px] text-charcoal"
          >
            Kategoria
          </label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full max-w-xs appearance-none rounded-md border border-black/15 bg-white px-3.5 py-2.5 text-sm text-charcoal focus:border-charcoal focus:outline-none focus:ring-1 focus:ring-charcoal"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>

          <p className="text-[11px] leading-relaxed text-warm-gray">
            na podstawie {demandData.source}, {demandData.period}
          </p>
        </div>
      </header>

      {/* Gap list */}
      <div className="space-y-4">
        {sortedGaps.map((gap) => (
          <GapCard
            key={gap.attribute}
            gap={gap}
            onListClick={handleListClick}
          />
        ))}
      </div>

      {/* Trust / reason-to-stay label */}
      <p className="mt-6 border-t border-black/10 pt-4 text-[12px] leading-relaxed text-warm-gray">
        Te dane pochodzą z zachowań{" "}
        <span className="font-medium text-charcoal">
          {demandData.buyerBase}
        </span>{" "}
        — nie z rynku ogólnego.
      </p>
    </div>
  );
}
