import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Section } from "@/components/ui/Section";

export function Events() {
  return (
    <Section id="podiyi" title="Події">
      <AnimatedSection>
        <div className="gold-card mx-auto max-w-xl rounded-lg p-10 text-center">
          <p className="font-heading text-xl text-text-muted md:text-2xl">
            Незабаром — стежте за оновленнями
          </p>
        </div>
      </AnimatedSection>
    </Section>
  );
}
