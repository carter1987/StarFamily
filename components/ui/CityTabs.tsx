"use client";

import { useState, type ReactNode } from "react";

type CityTabsProps = {
  kyivContent: ReactNode;
  vinnytsiaContent: ReactNode;
};

export function CityTabs({ kyivContent, vinnytsiaContent }: CityTabsProps) {
  const [city, setCity] = useState<"kyiv" | "vinnytsia">("kyiv");

  return (
    <div>
      <div className="mb-8 flex justify-center gap-2">
        {(["kyiv", "vinnytsia"] as const).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCity(c)}
            className={`rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
              city === c
                ? "gold-gradient text-black shadow-[0_0_15px_rgba(201,168,76,0.4)]"
                : "border border-gold/50 text-text-muted hover:border-gold hover:text-text"
            }`}
          >
            {c === "kyiv" ? "Київ" : "Вінниця"}
          </button>
        ))}
      </div>
      <div className="transition-opacity duration-300">
        {city === "kyiv" ? kyivContent : vinnytsiaContent}
      </div>
    </div>
  );
}
