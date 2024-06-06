import React, { useState, useRef } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  formatTransactionHashTable,
  formatLongText,
  formatDateTime,
  formatDate,
} from "../../Utils/helpers";
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const AccordionListVideo = ({ dataAccordion }) => {
  const [open, setOpen] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const handleSwipe = (direction) => {
    const lastIndex = dataAccordion.length - 1;
    let newIndex;
    if (direction === "left") {
      newIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
    } else if (direction === "right") {
      newIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
    }
    setCurrentIndex(newIndex);
    // Scroll to the new video element
    const newPosition = newIndex * sliderRef.current.offsetWidth;
    sliderRef.current.scrollTo({ left: newPosition, behavior: "smooth" });
  };
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      {dataAccordion?.map((data, index) => (
        <Accordion
          open={open === index + 1}
          icon={<Icon id={index + 1} open={open} />}
          key={index}
        >
          <AccordionHeader
            onClick={() => handleOpen(index + 1)}
            className={`border-b-2 transition-colors text-sm ${
              open === index + 1 ? "text-green-200 hover:text-green-500" : ""
            } text-sm lg:text-xl`}
          >
            {formatDate(data.date)}{" "}({data.objectDetections.length} video)
          </AccordionHeader>
          <AccordionBody>
            <div>
              <div className="mt-2 bg-white overflow-hidden shadow rounded-lg border">
                <div className="lg:py-5 px-4 py-2">
                  <h3 className="lg:text-lg text-base leading-6 font-medium text-green-500">
                    Thông tin chung
                  </h3>
                </div>
                <div className="border-t border-gray-200 lg:px-4 lg:py-5 sm:p-0 px-5 py-1">
                  <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="lg:py-3 py-1 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-700">
                        Mã Transaction
                      </dt>
                      <dd className="mt-1 text-sm text-blue-500 lg:text-base font-medium sm:mt-0 sm:col-span-2">
                        {formatTransactionHashTable({
                          str: data?.objectDetections[0].tx_hash,
                          a: 8,
                          b: 5,
                        })}
                      </dd>
                    </div>
                    <div className="lg:py-3 py-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-700">
                        Video Hash
                      </dt>
                      <dd className="mt-1 text-sm text-black lg:text-base font-medium sm:mt-0 sm:col-span-2">
                        {formatLongText({
                          str: data?.objectDetections[0].concatenated_hash,
                          a: 8,
                          b: 5,
                        })}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div>
                <div className="px-2 mt-4 lg:text-xl text-base font-bold text-green-600 lg:mb-5 mb-3">
                  Danh sách video
                </div>
                <div className="flex items-center justify-center">
                  <button
                    className="bg-gray-200 p-2 rounded-full mx-2"
                    onClick={() => handleSwipe("left")}
                  >
                    <FaChevronLeft className="lg:h-6 lg:w-6 h-4 w-4 text-gray-600" />
                  </button>
                  <div
                    className="flex-1 overflow-x-scroll whitespace-nowrap scrollbar-hide"
                    ref={sliderRef}
                  >
                    <div className=" justify-center items-center">
                      {data.objectDetections.map((item, index) => (
                        <div key={index} className="inline-block mx-1">
                          <span className="ml-1 lg:text-base block text-xs">
                            {formatDateTime(item.start_time)} -{" "}
                            {formatDateTime(item.end_time)}
                          </span>
                          <video
                            className="lg:h-72 lg:w-96 h-40 w-56 mx-2 my-2 rounded-lg" // Thay đổi kích thước từ cố định sang auto
                            controls
                            autoPlay
                            muted
                          >
                            <source src={item.video_url} type="video/mp4" />
                            Your browser does not support the video tag
                          </video>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    className="bg-gray-200 p-2 rounded-full mx-2"
                    onClick={() => handleSwipe("right")}
                  >
                    <FaChevronRight className="lg:h-6 lg:w-6 h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </AccordionBody>
        </Accordion>
      ))}
    </>
  );
};

export default AccordionListVideo;
