"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Section } from "@/components/ui/Section";
import { galleryItemKey, type GalleryItem } from "@/lib/types";

type GalleryProps = {
  items: GalleryItem[];
};

function getThumbnail(item: GalleryItem) {
  if (item.type === "photo") return item.src;
  return `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;
}

export function Gallery({ items }: GalleryProps) {
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const close = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, close]);

  return (
    <Section id="galereya" title="Галерея">
      {items.length === 0 ? (
        <AnimatedSection>
          <p className="text-center text-text-muted">
            Фотографії незабаром з&apos;являться тут
          </p>
        </AnimatedSection>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {items.map((item, i) => (
            <AnimatedSection key={galleryItemKey(item, i)} delay={(i % 3) * 0.1}>
              <button
                type="button"
                className="group gold-card relative aspect-[4/3] w-full overflow-hidden rounded-lg"
                onClick={() => setLightbox(item)}
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
        </div>
      )}

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
            onClick={close}
            role="dialog"
            aria-modal
            aria-label={lightbox.description}
          >
            <button
              type="button"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gold text-2xl text-gold transition-colors hover:bg-gold/20"
              onClick={close}
              aria-label="Закрити"
            >
              ×
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              {lightbox.type === "photo" ? (
                <Image
                  src={lightbox.src}
                  alt={lightbox.description}
                  width={1200}
                  height={800}
                  className="mx-auto max-h-[75vh] w-auto rounded-lg object-contain"
                />
              ) : (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                  <iframe
                    src={`https://www.youtube.com/embed/${lightbox.youtubeId}?autoplay=1`}
                    title={lightbox.description}
                    className="absolute inset-0 h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
              <p className="mt-4 text-center text-lg text-text-muted">{lightbox.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
