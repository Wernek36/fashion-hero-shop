"use client";

import { useState, useMemo } from "react";
import benchmarkData from "@/data/benchmark.json";
import { BenchmarkBar } from "./BenchmarkBar";

interface Category {
  id: string;
  label: string;
  medianPrice: number;
  offerCount: number;
}

const categories: Category[] = benchmarkData.categories;

export function ListingForm() {
  const [categoryId, setCategoryId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const selectedCategory = useMemo(
    () => categories.find((c) => c.id === categoryId),
    [categoryId],
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert("Prototyp — dalej niedostępny");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <label
          htmlFor="category"
          className="block text-[11px] font-medium uppercase tracking-[0.5px] text-charcoal"
        >
          Kategoria
        </label>
        <select
          id="category"
          name="category"
          required
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full appearance-none rounded-md border border-black/15 bg-white px-3.5 py-2.5 text-sm text-charcoal focus:border-charcoal focus:outline-none focus:ring-1 focus:ring-charcoal"
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

      <BenchmarkBar
        visible={!!selectedCategory}
        medianPrice={selectedCategory?.medianPrice ?? 0}
        offerCount={selectedCategory?.offerCount ?? 0}
      />

      <div className="space-y-1.5">
        <label
          htmlFor="title"
          className="block text-[11px] font-medium uppercase tracking-[0.5px] text-charcoal"
        >
          Tytuł oferty
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          placeholder="np. Nike Air Max 90, rozmiar 42"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-black/15 bg-white px-3.5 py-2.5 text-sm text-charcoal placeholder:text-warm-gray/70 focus:border-charcoal focus:outline-none focus:ring-1 focus:ring-charcoal"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="price"
          className="block text-[11px] font-medium uppercase tracking-[0.5px] text-charcoal"
        >
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
