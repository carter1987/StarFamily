import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const members = [
  {
    name: "Євген Кот",
    photo: "/team/evgen.jpg",
    bio: "Професійний хореограф та артист, який присвятив свою кар'єру розвитку сценічного мистецтва та популяризації сучасної хореографії в Україні. Його підхід — це поєднання техніки, емоцій та сценічної харизми.",
  },
  {
    name: "Анна Олександрівна",
    photo: "/team/anna.jpg",
    bio: "Засновниця та керівниця творчої студії Star Family, яка об'єднала навколо себе команду професіоналів для створення простору розвитку дітей і молоді. Її головна мета — допомогти кожній дитині розкрити свій потенціал і повірити у власні можливості.",
  },
];

export function Team() {
  return (
    <section className="py-16 md:py-24">
      <div className="section-divider mb-12 md:mb-16" />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2 md:gap-16 md:px-6">
        {members.map((member, i) => (
          <AnimatedSection key={member.name} delay={i * 0.15}>
            <article className="flex flex-col items-center text-center">
              <div className="relative mb-6 h-48 w-48 overflow-hidden rounded-full border-2 border-gold p-1 sm:h-56 sm:w-56">
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={224}
                  height={224}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <h3 className="font-heading text-2xl text-gold-light md:text-3xl">
                {member.name}
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-text-muted md:text-base">
                {member.bio}
              </p>
            </article>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
