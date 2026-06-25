"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { FormaPhotoItem } from "@/lib/types";

type FormaPhotoGridProps = {
  photos: FormaPhotoItem[];
};

export function FormaPhotoGrid({ photos }: FormaPhotoGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const close = useCallback(() => setLightboxIndex(null), []);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i !== null && i < photos.length - 1 ? i + 1 : i));
  }, [photos.length]);

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
  const canGoNext = lightboxIndex !== null && lightboxIndex < photos.length - 1;

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            className="group gold-card w-full overflow-hidden rounded-lg"
            style={{ backgroundColor: "#0D0D0D" }}
            onClick={() => setLightboxIndex(i)}
          >
            <Image
              src={photo.src}
              alt={photo.description || `Форма Star Family ${i + 1}`}
              width={1200}
              height={800}
              sizes="(max-width: 768px) 50vw, 33vw"
              className="h-auto w-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
            onClick={close}
            role="dialog"
            aria-modal
            aria-label="Фото форми"
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
              key={photos[lightboxIndex].src}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative flex w-full max-w-[100vw] flex-col items-center justify-center px-0 md:max-w-5xl md:px-14"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => onTouchStart(e.touches[0]?.clientX ?? 0)}
              onTouchEnd={(e) => onTouchEnd(e.changedTouches[0]?.clientX ?? 0)}
            >
              <Image
                src={photos[lightboxIndex].src}
                alt={photos[lightboxIndex].description || "Форма Star Family"}
                width={1200}
                height={800}
                className="h-auto w-screen max-w-[100vw] object-contain md:mx-auto md:max-h-[85vh] md:w-auto md:max-w-none rounded-lg"
              />
              {photos[lightboxIndex].description && (
                <p className="mt-4 px-4 text-center text-lg text-text-muted md:px-0">
                  {photos[lightboxIndex].description}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
