'use client'
import React, { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";

interface ReviewCarouselProps {
  reviews: string[];
  itemsPerPage?: number;
}

const ReviewCarousel: React.FC<ReviewCarouselProps> = ({ reviews, itemsPerPage = 4 }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  return (
    <div className="w-full px-4">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <CarouselItem key={pageIndex}>
              <div className="space-y-4">
                {reviews.slice(pageIndex * itemsPerPage, pageIndex * itemsPerPage + itemsPerPage).map((review, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl shadow-md">
                    <p className="text-sm text-left text-gray-700 line-clamp-3">{review}</p>
                  </div>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="py-4 text-center space-x-1">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${index === current ? "bg-gray-700 w-4" : "bg-gray-400"
              }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewCarousel;