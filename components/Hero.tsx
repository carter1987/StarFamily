"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { GoldButton } from "@/components/ui/GoldButton";
import { PHONE_OPTIONS, phoneTelHref } from "@/lib/constants";

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 shrink-0 text-gold"
      aria-hidden
    >
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

export function Hero() {
  const [phonesOpen, setPhonesOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!phonesOpen) return;

    const onPointerDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setPhonesOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPhonesOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [phonesOpen]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <video
        className="absolute inset-0 hidden h-full w-full object-cover md:block"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      <div
        className="absolute inset-0 bg-cover bg-center md:hidden"
        style={{ backgroundImage: "url(/hero-bg.jpg)" }}
        aria-hidden
      />

      <div className="absolute inset-0 bg-black/55" aria-hidden />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-32 text-center">
        <h1 className="font-heading text-5xl font-normal tracking-wide text-text sm:text-6xl md:text-7xl lg:text-8xl">
          Star Family
        </h1>

        <p className="mt-4 font-heading text-xl italic text-gold-light sm:text-2xl">
          Студія творчого розвитку
        </p>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
          Місце потенціалу, професійної творчості та справжньої зіркової кар&apos;єри
        </p>

        <div ref={containerRef} className="relative mt-10 inline-block">
          <GoldButton
            type="button"
            aria-expanded={phonesOpen}
            aria-haspopup="true"
            onClick={() => setPhonesOpen((open) => !open)}
          >
            Записатись
          </GoldButton>

          <AnimatePresence>
            {phonesOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="gold-card absolute left-1/2 top-full z-20 mt-3 w-[min(100vw-2rem,320px)] -translate-x-1/2 overflow-hidden rounded-lg text-left shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                role="menu"
              >
                <p className="border-b border-gold/30 px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-text-muted">
                  Оберіть місто
                </p>
                {PHONE_OPTIONS.map(({ city, phone }) => (
                  <a
                    key={city}
                    href={phoneTelHref(phone)}
                    role="menuitem"
                    className="flex items-center gap-3 border-b border-gold/20 px-4 py-4 transition-colors last:border-b-0 hover:bg-gold/10"
                    onClick={() => setPhonesOpen(false)}
                  >
                    <PhoneIcon />
                    <span className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold text-gold-light">{city}</span>
                      <span className="text-base text-text">{phone}</span>
                    </span>
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
