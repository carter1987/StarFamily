import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Section } from "@/components/ui/Section";

const PARTNERS = [
  { icon: "🎓", label: "Освітніми закладами" },
  { icon: "📺", label: "Телебаченням" },
  { icon: "🎭", label: "Творчими організаціями" },
  { icon: "🏢", label: "Брендами та компаніями" },
  { icon: "🎪", label: "Організаторами подій" },
  { icon: "🏛", label: "Культурними центрами" },
];

export function Cooperation() {
  return (
    <Section id="spivpratsya" title="Співпраця">
      <AnimatedSection>
        <div className="mx-auto max-w-3xl space-y-8 text-center">
          <p className="text-base leading-relaxed text-text-muted md:text-lg">
            Star Family відкрита до партнерства та спільних проєктів.
            <br />
            Ми із задоволенням співпрацюємо з:
          </p>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PARTNERS.map((partner) => (
              <li
                key={partner.label}
                className="gold-card flex items-center gap-4 rounded-lg px-5 py-4 text-left transition-shadow duration-300 hover:shadow-[0_0_15px_rgba(201,168,76,0.2)]"
              >
                <span className="text-2xl" aria-hidden>
                  {partner.icon}
                </span>
                <span className="text-text">{partner.label}</span>
              </li>
            ))}
          </ul>

          <p className="text-base leading-relaxed text-text-muted md:text-lg">
            Разом ми створюємо масштабні проєкти, фестивалі, концерти та
            соціально-культурні ініціативи, які розвивають творче середовище України.
          </p>
        </div>
      </AnimatedSection>
    </Section>
  );
}
