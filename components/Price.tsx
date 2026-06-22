import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { CityTabs } from "@/components/ui/CityTabs";
import { Section } from "@/components/ui/Section";
import {
  KYIV_PRICES,
  VINNYTSIA_PRICES,
} from "@/lib/data/price";

const MOBILE_SERVICE_NAME = "text-sm leading-snug text-text";

function KyivPriceTable() {
  return (
    <>
      <div className="space-y-3 md:hidden">
        {KYIV_PRICES.map((row) => (
          <div key={row.service} className="gold-card rounded-lg p-4">
            <p className={MOBILE_SERVICE_NAME}>{row.service}</p>
            <p className="mt-2 text-sm font-semibold text-gold-light">{row.price}</p>
          </div>
        ))}
      </div>

      <div className="gold-card hidden overflow-x-auto rounded-lg md:block">
        <table className="w-full min-w-[320px] text-left text-sm md:text-base">
          <thead>
            <tr className="border-b border-gold/40 bg-gold/10">
              <th className="px-4 py-4 font-semibold text-gold-light md:px-6">Послуга</th>
              <th className="px-4 py-4 font-semibold text-gold-light md:px-6">Ціна</th>
            </tr>
          </thead>
          <tbody>
            {KYIV_PRICES.map((row) => (
              <tr key={row.service} className="border-b border-gold/10 last:border-b-0">
                <td className="px-4 py-3 text-text md:px-6">{row.service}</td>
                <td className="whitespace-nowrap px-4 py-3 font-semibold text-gold-light md:px-6">
                  {row.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function VinnytsiaPriceTable() {
  return (
    <div>
      <div className="space-y-3 md:hidden">
        {VINNYTSIA_PRICES.map((row) => (
          <div key={row.service} className="gold-card rounded-lg p-4">
            <p className={MOBILE_SERVICE_NAME}>{row.service}</p>
            <p className="mt-2 text-sm">
              {row.oldPrice && (
                <>
                  <span className="text-text-muted line-through">{row.oldPrice}</span>
                  <span className="mx-2 text-text-muted">→</span>
                </>
              )}
              <span className="font-semibold text-gold-light">{row.newPrice}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="gold-card hidden overflow-x-auto rounded-lg md:block">
        <table className="w-full min-w-[480px] text-left text-sm md:text-base">
          <thead>
            <tr className="border-b border-gold/40 bg-gold/10">
              <th className="px-4 py-4 font-semibold text-gold-light md:px-6">Послуга</th>
              <th className="px-4 py-4 font-semibold text-gold-light md:px-6">Стара ціна</th>
              <th className="px-4 py-4 font-semibold text-gold-light md:px-6">Нова ціна</th>
            </tr>
          </thead>
          <tbody>
            {VINNYTSIA_PRICES.map((row) => (
              <tr key={row.service} className="border-b border-gold/10 last:border-b-0">
                <td className="px-4 py-3 text-text md:px-6">{row.service}</td>
                <td className="whitespace-nowrap px-4 py-3 text-text-muted line-through md:px-6">
                  {row.oldPrice ?? ""}
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-semibold text-gold-light md:px-6">
                  {row.newPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Price() {
  return (
    <Section id="prais" title="Прайс">
      <AnimatedSection>
        <CityTabs
          kyivContent={<KyivPriceTable />}
          vinnytsiaContent={<VinnytsiaPriceTable />}
        />
      </AnimatedSection>
    </Section>
  );
}
