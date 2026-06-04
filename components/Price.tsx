import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { CityTabs } from "@/components/ui/CityTabs";
import { Section } from "@/components/ui/Section";

function PriceTable({ city }: { city: string }) {
  return (
    <div className="gold-card overflow-hidden rounded-lg">
      <table className="w-full text-left text-sm md:text-base">
        <thead>
          <tr className="border-b border-gold/40 bg-gold/10">
            <th className="px-4 py-4 font-semibold text-gold-light md:px-6">Напрямок</th>
            <th className="px-4 py-4 font-semibold text-gold-light md:px-6">Ціна</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={2} className="px-4 py-8 text-center text-text-muted md:px-6">
              Прайс для {city} — незабаром буде додано
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function Price() {
  return (
    <Section id="prais" title="Прайс">
      <AnimatedSection>
        <CityTabs
          kyivContent={<PriceTable city="Києва" />}
          vinnytsiaContent={<PriceTable city="Вінниці" />}
        />
      </AnimatedSection>
    </Section>
  );
}
