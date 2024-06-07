import React from "react";
import { Carousel } from "@material-tailwind/react";
const Avarta = ({ data }) => {
  return (
    <section>
      <div>
        <Carousel
          className=""
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
          {data?.map((url, index) => (
            <img
              key={index}
              src={url}
              className="object-cover max-h-96"
            />
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Avarta;
