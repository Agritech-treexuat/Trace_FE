import React from "react";
import { Carousel } from "@material-tailwind/react";
const CarouselPicture = ({ dataImage }) => {
  return (
    <Carousel
      className="rounded-xl lg:h-72 lg:w-96"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      {dataImage?.map((image, index) => (
        <div
          key={index}
          className="h-44 flex justify-center items-center"
        >
          <img
            src={image?.img || image}
            alt={`Image ${index + 1}`}
            className="object-contain rounded-xl"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselPicture;
