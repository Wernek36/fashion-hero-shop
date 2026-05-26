import type { Metadata } from "next";
import { ListingForm } from "@/components/sell/ListingForm";

export const metadata: Metadata = {
  title: "Wystaw produkt | FashionHero",
  description:
    "Wystaw produkt w FashionHero i sprawdź medianę cen dla wybranej kategorii.",
};

export default function SellPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-xl px-4 py-10 sm:py-14 lg:px-8">
        <header className="mb-8">
          <h1 className="text-2xl font-light text-charcoal sm:text-3xl">
            Wystaw produkt
          </h1>
          <p className="mt-2 text-sm text-warm-gray">
            Wybierz kategorię, aby zobaczyć aktualną medianę cen na FashionHero.
          </p>
        </header>

        <ListingForm />
      </div>
    </main>
  );
}
