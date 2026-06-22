import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Section } from "@/components/ui/Section";
import { EventsFeed } from "@/components/EventsFeed";
import type { EventItem } from "@/lib/types";

type EventsProps = {
  events: EventItem[];
};

export function Events({ events }: EventsProps) {
  return (
    <Section id="podiyi" title="Події">
      {events.length === 0 ? (
        <AnimatedSection>
          <div className="gold-card mx-auto max-w-xl rounded-lg p-10 text-center">
            <p className="font-heading text-xl text-text-muted md:text-2xl">
              Незабаром — стежте за оновленнями
            </p>
          </div>
        </AnimatedSection>
      ) : (
        <AnimatedSection>
          <EventsFeed events={events} />
        </AnimatedSection>
      )}
    </Section>
  );
}
