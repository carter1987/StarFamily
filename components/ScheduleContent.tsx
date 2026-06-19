"use client";

import { useState } from "react";
import type { DaySchedule } from "@/lib/data/schedule";

const CLASS_COLUMNS = ["Клас 1", "Клас 2", "Клас 3", "Клас 4", "Клас 5"];

function ScheduleGrid({ schedules }: { schedules: DaySchedule[] }) {
  const [dayId, setDayId] = useState(schedules[0]?.id ?? "");
  const active = schedules.find((s) => s.id === dayId) ?? schedules[0];

  if (!active) return null;

  return (
    <div>
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {schedules.map((schedule) => (
          <button
            key={schedule.id}
            type="button"
            onClick={() => setDayId(schedule.id)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 md:px-6 md:py-2.5 ${
              dayId === schedule.id
                ? "gold-gradient text-black shadow-[0_0_15px_rgba(201,168,76,0.4)]"
                : "border border-gold/50 text-text-muted hover:border-gold hover:text-text"
            }`}
          >
            {schedule.label}
          </button>
        ))}
      </div>

      {active.note && (
        <p className="mb-4 text-center text-sm text-text-muted md:text-base">{active.note}</p>
      )}

      <div className="gold-card overflow-x-auto rounded-lg">
        <table className="w-full min-w-[640px] text-left text-sm md:text-base">
          <thead>
            <tr className="border-b border-gold/40 bg-gold/10">
              <th className="whitespace-nowrap px-3 py-4 font-semibold text-gold-light md:px-4">
                Час
              </th>
              {CLASS_COLUMNS.map((col) => (
                <th
                  key={col}
                  className="whitespace-nowrap px-3 py-4 font-semibold text-gold-light md:px-4"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {active.rows.map((row) => (
              <tr key={row.time} className="border-b border-gold/10 last:border-b-0">
                <td className="whitespace-nowrap px-3 py-3 font-medium text-gold-light md:px-4">
                  {row.time}
                </td>
                {row.classes.map((cls, i) => (
                  <td
                    key={`${row.time}-${i}`}
                    className="whitespace-nowrap px-3 py-3 text-text md:px-4"
                  >
                    {cls}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {active.footnotes && active.footnotes.length > 0 && (
        <div className="mt-3 space-y-1">
          {active.footnotes.map((note) => (
            <p key={note} className="text-sm text-text-muted">
              {note}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export function ScheduleContent({
  kyivSchedules,
  vinnytsiaSchedules,
}: {
  kyivSchedules: DaySchedule[];
  vinnytsiaSchedules: DaySchedule[];
}) {
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
      <ScheduleGrid schedules={city === "kyiv" ? kyivSchedules : vinnytsiaSchedules} />
    </div>
  );
}
