"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ImageLightboxProps {
  urls: string[];
  initialIndex?: number;
  onClose: () => void;
}

export function ImageLightbox({ urls, initialIndex = 0, onClose }: ImageLightboxProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, startIndex: initialIndex });
  const [current, setCurrent] = useState(initialIndex);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrent(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex flex-col justify-center"
      style={{ background: "rgba(0,0,0,0.92)" }}
      onClick={onClose}
    >
      {/* Close button */}
      <div className="flex items-center justify-between px-4 md:px-96 pb-4" onClick={(e) => e.stopPropagation()}>
        <span className="text-sm text-white/50">{current + 1} / {urls.length}</span>
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:text-white"
          style={{ background: "rgba(255,255,255,0.1)" }}
          aria-label="Close"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Carousel */}
      <div
        className="flex items-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div ref={emblaRef} className="w-full overflow-hidden">
          <div className="flex items-center">
            {urls.map((url) => (
              <div
                key={url}
                className="min-w-0 flex-[0_0_100%] flex items-center justify-center px-4"
              >
                <div className="relative w-full" style={{ maxHeight: "70dvh" }}>
                  <Image
                    src={url}
                    alt=""
                    width={1920}
                    height={1920}
                    className="w-full h-auto rounded-xl object-contain"
                    style={{ maxHeight: "70dvh" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      {urls.length > 1 && (
        <div
          className="flex items-center justify-center gap-1.5 py-6"
          onClick={(e) => e.stopPropagation()}
        >
          {urls.map((url, i) => (
            <button
              key={url}
              type="button"
              aria-label={`Go to image ${i + 1}`}
              onClick={() => scrollTo(i)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: current === i ? 20 : 6,
                background:
                  current === i
                    ? "linear-gradient(90deg, #4a9fd5, #e8a020)"
                    : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
      )}
    </div>,
    document.body
  );
}
