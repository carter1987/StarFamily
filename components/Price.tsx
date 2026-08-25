import { Fragment } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { CityTabs } from "@/components/ui/CityTabs";
import { Section } from "@/components/ui/Section";
import {
  KYIV_PRICE_SECTIONS,
  VINNYTSIA_PRICES,
} from "@/lib/data/price";

const MOBILE_SERVICE_NAME = "text-sm leading-snug text-text";

function KyivPriceTable() {
  return (
    <div>
      <div className="space-y-6 md:hidden">
        {KYIV_PRICE_SECTIONS.map((section) => (
          <div key={section.title} className="space-y-3">
            <h3 className="font-heading text-base font-semibold text-gold md:text-lg">
              {section.title}
            </h3>
            {section.rows.map((row) => (
              <div key={row.service} className="gold-card rounded-lg p-4">
                <p className={MOBILE_SERVICE_NAME}>{row.service}</p>
                {row.price && (
                  <p className="mt-2 text-sm font-semibold text-gold-light">{row.price}</p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="gold-card hidden overflow-x-auto rounded-lg md:block">
        <table className="w-full min-w-[480px] text-left text-sm md:text-base">
          <thead>
            <tr className="border-b border-gold/40 bg-gold/10">
              <th className="px-4 py-4 font-semibold text-gold-light md:px-6">Послуга</th>
              <th className="px-4 py-4 font-semibold text-gold-light md:px-6"></th>
              <th className="px-4 py-4 text-right font-semibold text-gold-light md:px-6">Ціна</th>
            </tr>
          </thead>
          <tbody>
            {KYIV_PRICE_SECTIONS.map((section) => (
              <Fragment key={section.title}>
                <tr className="bg-black/20">
                  <th
                    colSpan={3}
                    className="px-4 py-3 text-left font-semibold text-gold md:px-6"
                  >
                    {section.title}
                  </th>
                </tr>
                {section.rows.map((row) => (
                  <tr key={row.service} className="border-b border-gold/10 last:border-b-0">
                    <td className="px-4 py-3 text-text md:px-6">{row.service}</td>
                    <td className="whitespace-nowrap px-4 py-3 md:px-6"></td>
                    <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-gold-light md:px-6">
                      {row.price}
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
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
