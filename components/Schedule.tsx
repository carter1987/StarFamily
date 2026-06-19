import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Section } from "@/components/ui/Section";
import { ScheduleContent } from "@/components/ScheduleContent";
import { KYIV_SCHEDULE, VINNYTSIA_SCHEDULE } from "@/lib/data/schedule";

export function Schedule() {
  return (
    <Section id="grafik" title="Графік занять">
      <AnimatedSection>
        <ScheduleContent
          kyivSchedules={KYIV_SCHEDULE}
          vinnytsiaSchedules={VINNYTSIA_SCHEDULE}
        />
      </AnimatedSection>
    </Section>
  );
}
