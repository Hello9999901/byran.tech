import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { type CarouselApi } from "@/components/ui/carousel"
import React from "react";

interface InteractiveCarouselProps {
    imagePaths: string[];
}

const InteractiveCarousel: React.FC<InteractiveCarouselProps> = ({ imagePaths }) => {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
      if (!api) {
        return
      }

      setCount(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap() + 1)

      api.on("select", () => {
        setCurrent(api.selectedScrollSnap() + 1)
      })
    }, [api])

    return (
        <Carousel setApi={setApi} className="max-w-[600px] select-none">
            <CarouselContent>
            {imagePaths.map((path, index) => (
                <CarouselItem key={index}>
                <div className="p-1">
                    <Card className="border-none">
                    <CardContent className="flex aspect-square items-center justify-center p-0">
                        <img src={path} alt={`Image ${index + 1}`} className="object-cover w-full h-full -z-10 rounded-lg" />
                    </CardContent>
                    </Card>
                </div>
                </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
};

export default InteractiveCarousel;
