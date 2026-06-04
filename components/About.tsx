import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Section } from "@/components/ui/Section";

export function About() {
  return (
    <Section id="pro-nas" title="Про нас" accent="Star Family">
      <AnimatedSection>
        <div className="mx-auto max-w-3xl space-y-6 text-center text-base leading-relaxed text-text-muted md:text-lg">
          <p>
            <span className="font-semibold text-gold">Star Family</span> — це сучасна
            студія творчого розвитку, яка об&apos;єднує дітей, дорослих та молодь навколо
            мистецтва, сцени та самовираження.
          </p>
          <p>
            Наша місія — допомогти кожній дитині знайти свій талант і впевнено розвивати
            його в професійному середовищі.
          </p>
          <p className="font-heading text-xl italic text-gold-light md:text-2xl">
            «Талант є в кожного — потрібно лише дати йому правильний напрямок»
          </p>
          <p>
            У нашій команді — досвідчені педагоги, хореографи, вокальні та акторські
            наставники, які не просто навчають, а виховують майбутніх артистів.
          </p>
          <p className="text-text">
            Тут народжуються не просто навички —{" "}
            <span className="italic text-gold">тут формується майбутнє зірок!</span>
          </p>
        </div>
      </AnimatedSection>
    </Section>
  );
}
