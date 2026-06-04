import { type ReactNode } from "react";
import { AnimatedSection } from "./AnimatedSection";

type SectionProps = {
  id: string;
  title: string;
  accent?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, title, accent, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-24 py-16 md:py-24 ${className}`}>
      <div className="section-divider mb-12 md:mb-16" />
      <AnimatedSection>
        <h2 className="font-heading text-center text-3xl font-normal tracking-wide text-text md:text-4xl lg:text-5xl">
          {title}
          {accent && (
            <span className="mt-2 block font-heading text-xl italic text-gold md:text-2xl">
              {accent}
            </span>
          )}
        </h2>
      </AnimatedSection>
      <div className="mx-auto mt-10 max-w-6xl px-4 md:mt-14 md:px-6">{children}</div>
    </section>
  );
}
