"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { ImageLightbox } from "@/components/ui/ImageLightbox";

interface ImageCarouselProps {
  readonly urls: string[];
  readonly aspectRatio?: string;
}

export function ImageCarousel({ urls, aspectRatio = "16/9" }: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: false });
  const [current, setCurrent] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrent(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  return (
    <>
      <div className="mt-3 w-full overflow-hidden">
        {/* Slide track */}
        <div ref={emblaRef} className="overflow-hidden rounded-xl">
          <div className="flex h-[22.5vh] md:h-[50vh]">
            {urls.map((url, i) => (
              <div key={url} className="relative min-w-0 flex-[0_0_100%]">
                <button
                  type="button"
                  className="w-full"
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`Open image ${i + 1}`}
                >
                  <Image
                    src={url}
                    alt=""
                    width={1920}
                    height={1080}
                    className="w-full object-cover cursor-pointer"
                    style={{ aspectRatio }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        {urls.length > 1 && (
          <div className="mt-4 flex items-center justify-center gap-1.5">
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
                      : "rgba(255,255,255,0.25)",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          urls={urls}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
