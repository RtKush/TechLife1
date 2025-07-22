"use client";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
interface EmblaCarouselProps {
  items: { id: number; image: string; title: string }[];
  title?: string;
}

export default function EmblaCarousel({ items, title }: EmblaCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center mb-4">
        <div className="md:mb-12 mb-5 text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 md:text-4xl">
            {title}
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={scrollPrev}
            className="p-2 bg-cyan-600 text-white rounded-full hover:bg-cyan-700"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={scrollNext}
            className="p-2 bg-cyan-600 text-white rounded-full hover:bg-cyan-700"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {items?.map((item) => (
            <div
              key={item.id}
              className="min-w-[300px] flex-shrink-0 overflow-hidden rounded-lg relative"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={500}
                height={300}
                className="object-cover w-full h-64"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                <p className="text-white font-semibold text-lg">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
