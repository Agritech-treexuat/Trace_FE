import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  renderTypeFertilization,
  renderTypePestAndDisease,
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

const SampleProcess = ({ dataDetailSmapleProces, dataProcess }) => {
  const [open, setOpen] = useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const [openDialog, setOpenDialog] = React.useState(false);
  const handleOpenDialog = () => setOpenDialog(!openDialog);

  const [selectedSmapleProcess, setSelectedSmapleProcess] = useState();

  const dataSampleProces = [
    {
      name: "Hoạt động làm đất",
      desc: (
        <>
          <div className="lg:w-[700px] mt-1 relative ">
            <ul className="lg:mt-3 mt-1 mx-auto bg-white  text-left font-medium lg:text-lg leading-none border-green-200 divide-y divide-green-200">
              {dataDetailSmapleProces?.cultivationActivities?.map(
                (cultivation, index) => (
                  <li
                    className="hover:bg-green-100"
                    key={index}
                    onClick={() => {
                      handleOpenDialog();
                      setSelectedSmapleProcess(cultivation);
                    }}
                  >
                    <div className="lg:py-3.5 py-1 w-full flex items-center text-green-500 hover:text-green-700 ">
                      <span className="ml-5 mr-2.5 w-1 h-5 bg-green-500 rounded-r-md"></span>
                      <p>{cultivation.name}</p>
                    </div>
                    <div className="leading-1 text-blue-400 text-xs pl-8 font-thin mb-1">
                      Nhấn vào để xem chi tiết
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>
        </>
      ),
    },
    {
      name: "Hoạt động gieo trồng",
      desc: (
        <>
          <div className="lg:w-[700px] mt-2 relative ">
            <ul className="lg:mt-5 mt-1 mx-auto bg-white  text-left font-medium lg:text-lg leading-none border-green-200 divide-y divide-green-200">
              {dataDetailSmapleProces?.plantingActivity && (
                <li
                  className="hover:bg-green-100"
                  onClick={() => {
                    handleOpenDialog();
                    setSelectedSmapleProcess(
                      dataDetailSmapleProces.plantingActivity
                    );
                  }}
                >
                  <div className="lg:py-3.5 py-1 w-full flex items-center text-green-500 hover:text-green-700 ">
                    <span className="ml-5 mr-2.5 w-1 h-7 bg-green-500 rounded-r-md"></span>
                    <p>{dataDetailSmapleProces?.plantingActivity.density}</p>
                  </div>
                  <div className="leading-1 text-blue-400 text-xs pl-8 font-thin mb-1">
                    Nhấn vào để xem chi tiết
                  </div>
                </li>
              )}
            </ul>
          </div>
        </>
      ),
    },
    {
      name: "Hoạt động bón phân",
      desc: (
        <>
          <div className="lg:w-[700px] mt-2 relative ">
            <ul className="lg:mt-5 mt-1 mx-auto bg-white  text-left font-medium lg:text-lg leading-none border-green-200 divide-y divide-green-200">
              {dataDetailSmapleProces?.fertilizationActivities?.map(
                (fertilization, index) => (
                  <li
                    className="hover:bg-green-100"
                    key={index}
                    onClick={() => {
                      handleOpenDialog();
                      setSelectedSmapleProcess(fertilization);
                    }}
                  >
                    <div className="lg:py-3.5 py-1 w-full flex items-center text-green-500 hover:text-green-700 ">
                      <span className="ml-5 mr-2.5 w-1 h-5 bg-green-500 rounded-r-md"></span>
                      <p>{fertilization.fertilizationTime}</p>
                    </div>
                    <div className="leading-1 text-blue-400 text-xs pl-8 font-thin mb-1">
                      Nhấn vào để xem chi tiết
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>
        </>
      ),
    },
    {
      name: "Phòng ngừa sâu bệnh",
      desc: (
        <>
          <div className="lg:w-[700px] mt-2 relative ">
            <ul className="lg:mt-5 mt-1 mx-auto bg-white  text-left font-medium lg:text-lg leading-none border-green-200 divide-y divide-green-200">
              {dataDetailSmapleProces?.pestAndDiseaseControlActivities?.map(
                (pest, index) => (
                  <li
                    className="hover:bg-green-100"
                    key={index}
                    onClick={() => {
                      handleOpenDialog();
                      setSelectedSmapleProcess(pest);
                    }}
                  >
                    <div className="lg:py-3.5 py-1 w-full flex items-center text-green-500 hover:text-green-700 ">
                      <span className="ml-5 mr-2.5 w-1 h-5 bg-green-500 rounded-r-md"></span>
                      <p>{pest.name}</p>
                    </div>
                    <div className="leading-1 text-blue-400 text-xs pl-8 font-thin mb-1">
                      Nhấn vào để xem chi tiết
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>
        </>
      ),
    },
  ];

  return (
    <section>
      <>
        {dataSampleProces.map((info, index) => (
          <Accordion
            open={open === index + 1}
            icon={<Icon id={index + 1} open={open} />}
          >
            <AccordionHeader
              onClick={() => handleOpen(index + 1)}
              className="text-base"
            >
              {info.name}
            </AccordionHeader>
            <AccordionBody>{info.desc}</AccordionBody>
          </Accordion>
        ))}
        <Dialog
          open={openDialog}
          handler={handleOpenDialog}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <DialogHeader>Thông tin chi tiết</DialogHeader>
          <DialogBody className="overflow-y-scroll !px-5 max-h-96">
            <>
              {selectedSmapleProcess ? (
                <div>
                  {selectedSmapleProcess.name && (
                    <div className="max-w-screen-md text-xs mt-4 border-b pb-2">
                      <h3 className="lg:text-lg text-base font-semibold text-gray-900">
                        {selectedSmapleProcess.symptoms ||
                        selectedSmapleProcess.symptoms === ""
                          ? "Đối tượng"
                          : "Tên hoạt động"}
                      </h3>
                      <p className="lg:text-base mt-1 font-medium text-gray-700">
                        {selectedSmapleProcess.name}
                      </p>
                    </div>
                  )}
                  {selectedSmapleProcess.density && (
                    <div className="max-w-screen-md text-xs mt-4 border-b pb-2">
                      <h3 className="lg:text-lg text-base font-semibold text-gray-900">
                        Mật độ
                      </h3>
                      <p className="lg:text-base mt-1 font-medium text-gray-700">
                        {selectedSmapleProcess.density}
                      </p>
                    </div>
                  )}
                  {selectedSmapleProcess.fertilizationTime && (
                    <div className="max-w-screen-md text-xs mt-4 border-b pb-2">
                      <h3 className="lg:text-lg text-base font-semibold text-gray-900">
                        Thời gian bón phân
                      </h3>
                      <p className="lg:text-base mt-1 font-medium text-gray-700">
                        {selectedSmapleProcess.fertilizationTime}
                      </p>
                    </div>
                  )}
                  {selectedSmapleProcess.fertilizationTime && (
                    <div className="max-w-screen-md text-xs mt-4 border-b pb-2">
                      <h3 className="lg:text-lg text-base font-semibold text-gray-900">
                        Loại phân bón
                      </h3>
                      <p className="lg:text-base mt-1 font-medium text-gray-700">
                        {renderTypeFertilization(selectedSmapleProcess.type)}
                      </p>
                    </div>
                  )}
                  {selectedSmapleProcess.symptoms && (
                    <div className="max-w-screen-md text-xs mt-4 border-b pb-2">
                      <h3 className="lg:text-lg text-base font-semibold text-gray-900">
                        Kiểu
                      </h3>
                      <p className="lg:text-base mt-1 font-medium text-gray-700">
                        {renderTypePestAndDisease(selectedSmapleProcess.type)}
                      </p>
                    </div>
                  )}
                  {selectedSmapleProcess.symptoms && (
                    <div className="max-w-screen-md text-xs mt-4 border-b pb-2">
                      <h3 className="lg:text-lg text-base font-semibold text-gray-900">
                        Triệu chứng
                      </h3>
                      <p className="lg:text-base mt-1 font-medium text-gray-700">
                        {selectedSmapleProcess.symptoms}
                      </p>
                    </div>
                  )}

                  {selectedSmapleProcess.description && (
                    <div className="max-w-screen-md text-xs mt-4 border-b pb-2">
                      <h3 className="lg:text-lg text-base font-semibold text-gray-900">
                        Mô tả
                      </h3>
                      <p className="lg:text-base mt-1 font-medium text-gray-700">
                        {selectedSmapleProcess.description}
                      </p>
                    </div>
                  )}
                  {selectedSmapleProcess.solution && (
                    <div className="max-w-screen-md text-xs mt-4 border-b pb-2">
                      <h3 className="lg:text-lg text-base font-semibold text-gray-900">
                        Giải pháp
                      </h3>
                      {selectedSmapleProcess.solution.map(
                        (solutionInfo, index) => (
                          <p
                            className="lg:text-base mt-1 font-medium text-gray-700"
                            key={index}
                          >
                            {index + 1} : {""}
                            {solutionInfo}
                          </p>
                        )
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-base text-gray-500 lg:text-lg font-medium">
                  Không có dữ liệu
                </div>
              )}
            </>
          </DialogBody>
          <DialogFooter>
            <Button variant="gradient" color="red" onClick={handleOpenDialog}>
              <span>Thoát</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    </section>
  );
};

export default SampleProcess;
