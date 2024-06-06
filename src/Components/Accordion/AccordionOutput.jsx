import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import OutputInformation from "../Output/OutputInformation";

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

const AccordionOutput = ({ dataAccordion }) => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  return (
    <>
      {dataAccordion.length ? (
        dataAccordion?.map((data, index) => (
          <Accordion
            open={open === index + 1}
            icon={<Icon id={index + 1} open={open} />}
          >
            <AccordionHeader
              onClick={() => handleOpen(index + 1)}
              className={`border-b-0 transition-colors ${
                open === index + 1 ? "text-green-200 hover:text-green-500" : ""
              } text-sm lg:text-xl`}
            >
              Thu hoạch lần thứ {index + 1}
            </AccordionHeader>
            <AccordionBody>
              <OutputInformation OutputInfo={data} />
            </AccordionBody>
          </Accordion>
        ))
      ) : (
        <div className="lg:text-2xl text-gray-400 text-base mt-5">
          Không có dữ liệu
        </div>
      )}
    </>
  );
};

export default AccordionOutput;
