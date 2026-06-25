"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ShowMoreButton } from "@/components/ui/ShowMoreButton";
import type { EventItem } from "@/lib/types";

type EventsFeedProps = {
  events: EventItem[];
};

type LightboxState = {
  event: EventItem;
  photoIndex: number;
};

function getMonthKey(date: string) {
  return date.slice(0, 7);
}

function formatMonthLabel(monthKey: string) {
  const [year, month] = monthKey.split("-");
  const label = new Intl.DateTimeFormat("uk-UA", {
    month: "long",
    year: "numeric",
  }).format(new Date(Number(year), Number(month) - 1, 1));
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function formatEventDate(date: string) {
  return new Intl.DateTimeFormat("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function groupEventsByMonth(events: EventItem[]) {
  const sorted = [...events].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const groups = new Map<string, EventItem[]>();
  for (const event of sorted) {
    const key = getMonthKey(event.date);
    const list = groups.get(key) ?? [];
    list.push(event);
    groups.set(key, list);
  }

  return [...groups.entries()].sort(([a], [b]) => b.localeCompare(a));
}

function EventCard({ event, onOpen }: { event: EventItem; onOpen: () => void }) {
  const previewPhotos = event.photos.slice(0, 3);
  const remaining = event.photos.length - 3;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="gold-card w-full rounded-lg p-4 text-left transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(201,168,76,0.25)]"
    >
      {previewPhotos.length > 0 && (
        <div className="mb-4 grid grid-cols-3 gap-2">
          {previewPhotos.map((photo, index) => (
            <div key={photo} className="relative aspect-[4/3] overflow-hidden rounded-md">
              <Image
                src={photo}
                alt=""
                fill
                sizes="(max-width: 768px) 33vw, 200px"
                className="object-cover"
              />
              {index === 2 && remaining > 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                  <span className="text-lg font-semibold text-gold-light">+{remaining}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <p className="text-sm text-gold">{formatEventDate(event.date)}</p>
      <h3 className="mt-1 font-heading text-xl text-gold-light">{event.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-text-muted">
        {event.description}
      </p>
    </button>
  );
}

export function EventsFeed({ events }: EventsFeedProps) {
  const sortedEvents = useMemo(
    () =>
      [...events].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [events],
  );
  const [showAll, setShowAll] = useState(false);
  const visibleEvents = showAll ? sortedEvents : sortedEvents.slice(0, 5);
  const hasMoreEvents = sortedEvents.length > 5 && !showAll;
  const canCollapseEvents = sortedEvents.length > 5 && showAll;

  const collapseEvents = useCallback(() => {
    setShowAll(false);
    document.getElementById("podiyi")?.scrollIntoView({ behavior: "smooth" });
  }, []);
  const grouped = useMemo(() => groupEventsByMonth(visibleEvents), [visibleEvents]);
  const latestMonth = grouped[0]?.[0] ?? "";

  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(
    () => new Set(latestMonth ? [latestMonth] : []),
  );
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const touchStartX = useRef<number | null>(null);

  const photos = lightbox ? lightbox.event.photos.slice(0, 10) : [];

  const close = useCallback(() => setLightbox(null), []);

  const goPrev = useCallback(() => {
    setLightbox((state) => {
      if (!state || photos.length === 0) return null;
      return {
        ...state,
        photoIndex: state.photoIndex > 0 ? state.photoIndex - 1 : state.photoIndex,
      };
    });
  }, [photos.length]);

  const goNext = useCallback(() => {
    setLightbox((state) => {
      if (!state || photos.length === 0) return null;
      return {
        ...state,
        photoIndex:
          state.photoIndex < photos.length - 1 ? state.photoIndex + 1 : state.photoIndex,
      };
    });
  }, [photos.length]);

  useEffect(() => {
    if (!lightbox) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, close, goPrev, goNext]);

  const toggleMonth = (monthKey: string) => {
    setExpandedMonths((prev) => {
      const next = new Set(prev);
      if (next.has(monthKey)) next.delete(monthKey);
      else next.add(monthKey);
      return next;
    });
  };

  const onTouchStart = (clientX: number) => {
    touchStartX.current = clientX;
  };

  const onTouchEnd = (clientX: number) => {
    if (touchStartX.current === null) return;
    const diff = clientX - touchStartX.current;
    if (diff > 50) goPrev();
    else if (diff < -50) goNext();
    touchStartX.current = null;
  };

  const canGoPrev = lightbox !== null && lightbox.photoIndex > 0;
  const canGoNext = lightbox !== null && lightbox.photoIndex < photos.length - 1;
  const currentPhoto = lightbox ? photos[lightbox.photoIndex] : null;

  return (
    <>
      <div className="space-y-4">
        {grouped.map(([monthKey, monthEvents]) => {
          const isExpanded = expandedMonths.has(monthKey);

          return (
            <div key={monthKey} className="gold-card overflow-hidden rounded-lg">
              <button
                type="button"
                onClick={() => toggleMonth(monthKey)}
                className="flex w-full items-center justify-between px-4 py-4 text-left md:px-6"
                aria-expanded={isExpanded}
              >
                <span className="font-heading text-lg text-gold-light md:text-xl">
                  {formatMonthLabel(monthKey)}
                </span>
                <span className="text-gold transition-transform duration-300">
                  {isExpanded ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-4 border-t border-gold/20 px-4 pb-4 pt-4 md:px-6 md:pb-6">
                      {monthEvents.map((event) => (
                        <EventCard
                          key={event.id}
                          event={event}
                          onOpen={() => {
                            if (event.photos.length > 0) {
                              setLightbox({ event, photoIndex: 0 });
                            }
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {hasMoreEvents && <ShowMoreButton onClick={() => setShowAll(true)} />}

      {canCollapseEvents && <ShowMoreButton label="Згорнути" onClick={collapseEvents} />}

      <AnimatePresence>
        {lightbox && currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
            onClick={close}
            role="dialog"
            aria-modal
            aria-label={lightbox.event.title}
          >
            <button
              type="button"
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-gold text-xl text-gold transition-colors hover:bg-gold/20 md:h-10 md:w-10 md:text-2xl"
              onClick={close}
              aria-label="Закрити"
            >
              ×
            </button>

            {canGoPrev && (
              <button
                type="button"
                className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-gold text-lg text-gold transition-colors hover:bg-gold/20 md:left-4 md:h-10 md:w-10 md:text-2xl"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                aria-label="Попереднє фото"
              >
                ←
              </button>
            )}

            {canGoNext && (
              <button
                type="button"
                className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-gold text-lg text-gold transition-colors hover:bg-gold/20 md:right-4 md:h-10 md:w-10 md:text-2xl"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                aria-label="Наступне фото"
              >
                →
              </button>
            )}

            <motion.div
              key={currentPhoto}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative flex w-full max-w-[100vw] flex-col items-center justify-center px-0 md:max-w-5xl md:px-14"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => onTouchStart(e.touches[0]?.clientX ?? 0)}
              onTouchEnd={(e) => onTouchEnd(e.changedTouches[0]?.clientX ?? 0)}
            >
              <div className="mb-4 px-4 text-center md:px-0">
                <p className="text-sm text-gold">{formatEventDate(lightbox.event.date)}</p>
                <h3 className="mt-1 font-heading text-2xl text-gold-light">{lightbox.event.title}</h3>
              </div>

              <Image
                src={currentPhoto}
                alt={lightbox.event.title}
                width={1200}
                height={800}
                className="h-auto w-screen max-w-[100vw] object-contain md:mx-auto md:max-h-[65vh] md:w-auto md:max-w-none rounded-lg"
              />

              <p className="mt-4 px-4 text-center text-base leading-relaxed text-text-muted md:px-0 md:text-lg">
                {lightbox.event.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
