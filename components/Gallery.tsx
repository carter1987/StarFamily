"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Section } from "@/components/ui/Section";
import { galleryItemKey, type GalleryItem } from "@/lib/types";

type GalleryProps = {
  items: GalleryItem[];
};

type GalleryFilter = "Фото" | "Відео";

const GALLERY_FILTERS: GalleryFilter[] = ["Фото", "Відео"];

function getThumbnail(item: GalleryItem) {
  if (item.type === "photo") return item.src;
  return `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;
}

export function Gallery({ items }: GalleryProps) {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>("Фото");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        activeFilter === "Фото" ? item.type === "photo" : item.type === "video",
      ),
    [items, activeFilter],
  );

  const lightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const close = useCallback(() => setLightboxIndex(null), []);

  const goPrev = useCallback(() => {
    setLightboxIndex((index) => {
      if (index === null || filteredItems.length === 0) return null;
      return index > 0 ? index - 1 : index;
    });
  }, [filteredItems.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((index) => {
      if (index === null || filteredItems.length === 0) return null;
      return index < filteredItems.length - 1 ? index + 1 : index;
    });
  }, [filteredItems.length]);

  useEffect(() => {
    setLightboxIndex(null);
  }, [activeFilter]);

  useEffect(() => {
    if (lightboxIndex === null) return;

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
  }, [lightboxIndex, close, goPrev, goNext]);

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

  const canGoPrev = lightboxIndex !== null && lightboxIndex > 0;
  const canGoNext =
    lightboxIndex !== null && lightboxIndex < filteredItems.length - 1;

  return (
    <Section id="galereya" title="Галерея">
      {items.length === 0 ? (
        <AnimatedSection>
          <p className="text-center text-text-muted">
            Фотографії незабаром з&apos;являться тут
          </p>
        </AnimatedSection>
      ) : (
        <>
          <div className="scrollbar-hide mb-8 overflow-x-auto">
            <div className="flex flex-nowrap justify-start gap-2 whitespace-nowrap sm:justify-center">
              {GALLERY_FILTERS.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 md:px-6 md:py-2.5 ${
                    activeFilter === filter
                      ? "gold-gradient text-black shadow-[0_0_15px_rgba(201,168,76,0.4)]"
                      : "border border-gold/50 text-text-muted hover:border-gold hover:text-text"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6"
            >
              {filteredItems.map((item, i) => (
                <AnimatedSection key={galleryItemKey(item, i)} delay={(i % 3) * 0.1}>
                  <button
                    type="button"
                    className="group gold-card relative aspect-[4/3] w-full overflow-hidden rounded-lg"
                    onClick={() => setLightboxIndex(i)}
                  >
                    <Image
                      src={getThumbnail(item)}
                      alt={item.description}
                      fill
                      unoptimized={item.type === "video"}
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <span className="text-4xl text-gold drop-shadow-lg" aria-hidden>
                          ▶️
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="text-left text-sm text-text">{item.description}</p>
                    </div>
                  </button>
                </AnimatedSection>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <p className="text-center text-text-muted">У цій категорії поки немає матеріалів</p>
          )}
        </>
      )}

      <AnimatePresence>
        {lightboxItem && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
            onClick={close}
            role="dialog"
            aria-modal
            aria-label={lightboxItem.description}
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
                aria-label="Попереднє"
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
                aria-label="Наступне"
              >
                →
              </button>
            )}

            <motion.div
              key={galleryItemKey(lightboxItem, lightboxIndex)}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl px-10 md:px-14"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => onTouchStart(e.touches[0]?.clientX ?? 0)}
              onTouchEnd={(e) => onTouchEnd(e.changedTouches[0]?.clientX ?? 0)}
            >
              {lightboxItem.type === "photo" ? (
                <Image
                  src={lightboxItem.src}
                  alt={lightboxItem.description}
                  width={1200}
                  height={800}
                  className="mx-auto max-h-[85vh] w-auto rounded-lg object-contain"
                />
              ) : (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                  <iframe
                    src={`https://www.youtube.com/embed/${lightboxItem.youtubeId}?autoplay=1`}
                    title={lightboxItem.description}
                    className="absolute inset-0 h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
              <p className="mt-4 text-center text-lg text-text-muted">{lightboxItem.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
