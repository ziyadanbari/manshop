import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function ProductImagesCarousel({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="aspect-square">
              <Image
                src={image || "/placeholder.svg"}
                alt={`${name} - Image ${index + 1}`}
                width={600}
                height={600}
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
}
