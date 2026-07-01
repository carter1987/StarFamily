"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { GoldButton } from "@/components/ui/GoldButton";
import { PHONE_CONTACTS, phoneTelHref } from "@/lib/constants";

function PhoneIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`shrink-0 text-gold ${className}`}
      aria-hidden
    >
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

export function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [phonesOpen, setPhonesOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) {
      setPhonesOpen(false);
      return;
    }

    const onPointerDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 h-full w-full overflow-hidden" aria-hidden>
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-bg.jpg"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

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
            aria-expanded={menuOpen}
            aria-haspopup="true"
            onClick={() => setMenuOpen((open) => !open)}
          >
            Записатись
          </GoldButton>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="gold-card absolute left-1/2 top-full z-20 mt-2 max-h-[350px] w-[min(100vw-2rem,340px)] -translate-x-1/2 overflow-hidden rounded-lg text-left text-[13px] shadow-[0_8px_32px_rgba(0,0,0,0.5)] md:mt-3"
                role="menu"
              >
                {!phonesOpen ? (
                  <>
                    <button
                      type="button"
                      role="menuitem"
                      className="flex w-full items-center border-b border-gold/20 px-3 py-2.5 text-left transition-colors hover:bg-gold/10"
                      onClick={() => {
                        closeMenu();
                        window.open("https://n1433454.alteg.io", "_blank");
                      }}
                    >
                      <span className="font-semibold leading-tight text-gold-light">
                        Записатись онлайн
                      </span>
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      className="flex w-full items-center px-3 py-2.5 text-left transition-colors hover:bg-gold/10"
                      onClick={() => setPhonesOpen(true)}
                    >
                      <span className="font-semibold leading-tight text-gold-light">
                        Зателефонувати
                      </span>
                    </button>
                  </>
                ) : (
                  <>
                    <p className="border-b border-gold/30 px-3 py-2 text-center text-[11px] font-medium uppercase tracking-wider text-text-muted">
                      Оберіть номер
                    </p>
                    {PHONE_CONTACTS.flatMap(({ city, contacts }) =>
                      contacts.map(({ name, phone }) => (
                        <a
                          key={`${city}-${name}-${phone}`}
                          href={phoneTelHref(phone)}
                          role="menuitem"
                          className="flex items-center gap-2 border-b border-gold/20 px-3 py-2.5 transition-colors last:border-b-0 hover:bg-gold/10"
                          onClick={closeMenu}
                        >
                          <PhoneIcon className="h-3.5 w-3.5" />
                          <span className="flex min-w-0 flex-col gap-0">
                            <span className="font-semibold leading-tight text-gold-light">
                              {city}: {name}
                            </span>
                            <span className="leading-tight text-text">{phone}</span>
                          </span>
                        </a>
                      )),
                    )}
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
