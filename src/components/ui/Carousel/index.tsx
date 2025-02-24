"use client";
import useEmblaCarousel from "embla-carousel-react";
import { ReactNode } from "react";

export interface CarouselProps {
  slides: ReactNode[];
}

export function Carousel({ slides }: CarouselProps) {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {slides.map((slide, index) => (
          <div className="embla__slide" key={index}>
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
}
