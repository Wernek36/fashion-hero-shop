import type { Metadata } from "next";
import { InsightsView } from "@/components/insights/InsightsView";

export const metadata: Metadata = {
  title: "Luka Podażowa | FashionHero",
  description:
    "Czego szukają kupujący FashionHero, a czego brakuje w ofercie — niezaspokojony popyt w Twojej kategorii.",
};

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:py-14 lg:px-8">
        <InsightsView />
      </div>
    </main>
  );
}
