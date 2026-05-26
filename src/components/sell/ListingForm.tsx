"use client";

import { useState, useMemo } from "react";
import benchmarkData from "@/data/benchmark.json";
import { BenchmarkBar, type BenchmarkTier } from "./BenchmarkBar";

interface Variant {
  id: string;
  label: string;
  medianPrice: number;
  offerCount: number;
}

interface Model {
  id: string;
  label: string;
  medianPrice: number;
  offerCount: number;
  variants: Variant[];
}

interface Category {
  id: string;
  label: string;
  medianPrice: number;
  offerCount: number;
  models: Model[];
}

const categories: Category[] = benchmarkData.categories;

export function ListingForm() {
  const [categoryId, setCategoryId] = useState<string>("");
  const [modelId, setModelId] = useState<string>("");
  const [variantId, setVariantId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const selectedCategory = useMemo(
    () => categories.find((c) => c.id === categoryId),
    [categoryId],
  );

  const selectedModel = useMemo(
    () => selectedCategory?.models.find((m) => m.id === modelId),
    [selectedCategory, modelId],
  );

  const selectedVariant = useMemo(
    () => selectedModel?.variants.find((v) => v.id === variantId),
    [selectedModel, variantId],
  );

  const tiers = useMemo<BenchmarkTier[]>(() => {
    const result: BenchmarkTier[] = [];
    if (selectedVariant && selectedModel && selectedCategory) {
      result.push({
        scope: "wariant",
        description: `${selectedModel.label} · ${selectedVariant.label}`,
        medianPrice: selectedVariant.medianPrice,
        offerCount: selectedVariant.offerCount,
      });
    }
    if (selectedModel && selectedCategory) {
      result.push({
        scope: "model",
        description: selectedModel.label,
        medianPrice: selectedModel.medianPrice,
        offerCount: selectedModel.offerCount,
      });
    }
    if (selectedCategory) {
      result.push({
        scope: "kategoria",
        description: selectedCategory.label,
        medianPrice: selectedCategory.medianPrice,
        offerCount: selectedCategory.offerCount,
      });
    }
    return result;
  }, [selectedCategory, selectedModel, selectedVariant]);

  function handleCategoryChange(value: string) {
    setCategoryId(value);
    setModelId("");
    setVariantId("");
  }

  function handleModelChange(value: string) {
    setModelId(value);
    setVariantId("");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert("Prototyp — dalej niedostępny");
  }

  const selectClasses =
    "w-full appearance-none rounded-md border border-black/15 bg-white px-3.5 py-2.5 text-sm text-charcoal focus:border-charcoal focus:outline-none focus:ring-1 focus:ring-charcoal disabled:cursor-not-allowed disabled:bg-cream-light disabled:text-warm-gray";

  const labelClasses =
    "block text-[11px] font-medium uppercase tracking-[0.5px] text-charcoal";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <label htmlFor="category" className={labelClasses}>
          Kategoria
        </label>
        <select
          id="category"
          name="category"
          required
          value={categoryId}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className={selectClasses}
        >
          <option value="" disabled>
            Wybierz kategorię
          </option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div
        className={`space-y-1.5 transition-opacity duration-200 ease-out ${
          selectedCategory ? "opacity-100" : "opacity-0 pointer-events-none h-0 overflow-hidden"
        }`}
        aria-hidden={!selectedCategory}
      >
        <label htmlFor="model" className={labelClasses}>
          Model
        </label>
        <select
          id="model"
          name="model"
          required={!!selectedCategory}
          disabled={!selectedCategory}
          value={modelId}
          onChange={(e) => handleModelChange(e.target.value)}
          className={selectClasses}
        >
          <option value="" disabled>
            Wybierz model
          </option>
          {selectedCategory?.models.map((m) => (
            <option key={m.id} value={m.id}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      <div
        className={`space-y-1.5 transition-opacity duration-200 ease-out ${
          selectedModel ? "opacity-100" : "opacity-0 pointer-events-none h-0 overflow-hidden"
        }`}
        aria-hidden={!selectedModel}
      >
        <label htmlFor="variant" className={labelClasses}>
          Wariant (kolor / rozmiar)
        </label>
        <select
          id="variant"
          name="variant"
          required={!!selectedModel}
          disabled={!selectedModel}
          value={variantId}
          onChange={(e) => setVariantId(e.target.value)}
          className={selectClasses}
        >
          <option value="" disabled>
            Wybierz wariant
          </option>
          {selectedModel?.variants.map((v) => (
            <option key={v.id} value={v.id}>
              {v.label}
            </option>
          ))}
        </select>
      </div>

      <BenchmarkBar tiers={tiers} />

      <div className="space-y-1.5">
        <label htmlFor="title" className={labelClasses}>
          Tytuł oferty
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          placeholder="np. Nike Air Max 90 White, rozmiar 42"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-black/15 bg-white px-3.5 py-2.5 text-sm text-charcoal placeholder:text-warm-gray/70 focus:border-charcoal focus:outline-none focus:ring-1 focus:ring-charcoal"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="price" className={labelClasses}>
          Cena (PLN)
        </label>
        <input
          id="price"
          name="price"
          type="number"
          required
          min={0}
          step="0.01"
          inputMode="decimal"
          placeholder="0.00"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full rounded-md border border-black/15 bg-white px-3.5 py-2.5 text-sm text-charcoal placeholder:text-warm-gray/70 focus:border-charcoal focus:outline-none focus:ring-1 focus:ring-charcoal"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-charcoal px-4 py-3 text-[12px] font-medium uppercase tracking-[0.5px] text-white transition-colors hover:bg-charcoal-light focus:outline-none focus:ring-2 focus:ring-charcoal focus:ring-offset-2"
      >
        Dalej →
      </button>
    </form>
  );
}
