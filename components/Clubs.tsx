import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Section } from "@/components/ui/Section";
import { CLUBS } from "@/lib/data/clubs";

export function Clubs() {
  return (
    <Section id="hurtky" title="Що обрати?">
      <AnimatedSection>
        <div className="mx-auto max-w-3xl space-y-4 text-center text-base leading-relaxed text-text-muted md:text-lg">
          <p>
            У нашій студії є найбільший перелік гуртків у вашому місті.
            Радимо поєднати декілька напрямків для всебічного розвитку.
          </p>
          <p>
            Також у нас це мега зручно, оскільки дитину можна залишити на декілька
            годин!
          </p>
        </div>
      </AnimatedSection>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CLUBS.map((club, i) => (
          <AnimatedSection key={club.title} delay={i * 0.08}>
            <div className="gold-card flex h-full flex-col rounded-lg p-6 text-center transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(201,168,76,0.25)]">
              <h3 className="font-heading text-xl text-gold-light">{club.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {club.description}
              </p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </Section>
  );
}
