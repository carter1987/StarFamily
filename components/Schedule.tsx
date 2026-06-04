import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { CityTabs } from "@/components/ui/CityTabs";
import { Section } from "@/components/ui/Section";

function ScheduleTable({ city }: { city: string }) {
  return (
    <div className="gold-card overflow-hidden rounded-lg">
      <table className="w-full text-left text-sm md:text-base">
        <thead>
          <tr className="border-b border-gold/40 bg-gold/10">
            <th className="px-4 py-4 font-semibold text-gold-light md:px-6">День</th>
            <th className="px-4 py-4 font-semibold text-gold-light md:px-6">Час</th>
            <th className="px-4 py-4 font-semibold text-gold-light md:px-6">Гурток</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3} className="px-4 py-8 text-center text-text-muted md:px-6">
              Графік для {city} — незабаром буде додано
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function Schedule() {
  return (
    <Section id="grafik" title="Графік занять">
      <AnimatedSection>
        <CityTabs
          kyivContent={<ScheduleTable city="Києва" />}
          vinnytsiaContent={<ScheduleTable city="Вінниці" />}
        />
      </AnimatedSection>
    </Section>
  );
}
