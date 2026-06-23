import { Footer } from "@/components/Footer";
import { FormaPhotoGrid } from "@/components/FormaPhotoGrid";
import { Header } from "@/components/Header";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { GoldButton } from "@/components/ui/GoldButton";
import { Section } from "@/components/ui/Section";
import {
  FORMA_DESIGN,
  FORMA_MATERIALS,
  FORMA_ORDER_STEPS,
  FORMA_ORDER_URL,
  FORMA_PRODUCTS,
} from "@/lib/data/forma";
import type { FormaPhotoItem } from "@/lib/types";
import type { Metadata } from "next";
import { readFile } from "fs/promises";
import path from "path";

export const metadata: Metadata = {
  title: "Форма Star Family — Студія творчого розвитку",
  description:
    "Фірмова форма Star Family — стиль, комфорт та єдина команда для занять танцями та хореографією.",
};

function FormaBlock({
  title,
  items,
  icon,
}: {
  title: string;
  items: string[];
  icon: string;
}) {
  return (
    <AnimatedSection>
      <div className="gold-card rounded-lg p-6 md:p-8">
        <h2 className="font-heading text-2xl text-gold-light md:text-3xl">{title}</h2>
        <ul className="mt-4 space-y-3">
          {items.map((item) => (
            <li key={item} className="flex gap-3 text-base leading-relaxed text-text-muted md:text-lg">
              <span aria-hidden>{icon}</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </AnimatedSection>
  );
}

async function getFormaPhotos(): Promise<FormaPhotoItem[]> {
  try {
    const filePath = path.join(process.cwd(), "public", "store", "data.json");
    const raw = await readFile(filePath, "utf-8");
    return JSON.parse(raw) as FormaPhotoItem[];
  } catch {
    return [];
  }
}

export default async function FormaPage() {
  const photos = await getFormaPhotos();

  return (
    <>
      <Header />
      <main>
        <section className="scroll-mt-24 px-4 pb-16 pt-32 text-center md:pt-40">
          <AnimatedSection>
            <h1 className="font-heading text-4xl font-normal tracking-wide text-text md:text-6xl lg:text-7xl">
              Форма Star Family
            </h1>
            <p className="mt-4 font-heading text-xl italic text-gold-light sm:text-2xl">
              Стиль. Комфорт. Єдина команда.
            </p>
          </AnimatedSection>
        </section>

        <div className="section-divider mx-auto max-w-6xl" />

        <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
          <AnimatedSection>
            <p className="text-center text-base leading-relaxed text-text-muted md:text-lg">
              Фірмова форма Star Family створена спеціально для активних занять танцями та
              хореографією. Ми поєднали сучасний дизайн, якісні матеріали та комфорт, щоб кожна
              дитина почувалася впевнено та вільно під час тренувань.
            </p>
          </AnimatedSection>
        </div>

        <div className="mx-auto max-w-6xl space-y-8 px-4 md:px-6">
          <FormaBlock title="Матеріали" items={FORMA_MATERIALS} icon="✔" />
          <FormaBlock title="Дизайн" items={FORMA_DESIGN} icon="✨" />
          <FormaBlock title="Що можна замовити" items={FORMA_PRODUCTS} icon="🖤" />

          <AnimatedSection>
            <div className="gold-card rounded-lg p-6 md:p-8">
              <h2 className="font-heading text-2xl text-gold-light md:text-3xl">
                Як замовити?
              </h2>
              <ol className="mt-4 space-y-3">
                {FORMA_ORDER_STEPS.map((step, i) => (
                  <li
                    key={step}
                    className="flex gap-3 text-base leading-relaxed text-text-muted md:text-lg"
                  >
                    <span className="font-semibold text-gold-light">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-8 flex justify-center">
                <GoldButton
                  as="a"
                  href={FORMA_ORDER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Замовити
                </GoldButton>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <Section id="forma-foto" title="Фото">
          <AnimatedSection>
            {photos.length === 0 ? (
              <p className="text-center text-text-muted">Фото незабаром з&apos;являться тут</p>
            ) : (
              <FormaPhotoGrid photos={photos} />
            )}
          </AnimatedSection>
        </Section>

        <div className="pb-16 pt-4 text-center">
          <GoldButton as="a" href={FORMA_ORDER_URL} target="_blank" rel="noopener noreferrer">
            Замовити
          </GoldButton>
        </div>
      </main>
      <Footer />
    </>
  );
}
