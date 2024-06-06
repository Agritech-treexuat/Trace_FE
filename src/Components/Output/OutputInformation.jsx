import React, { useState } from "react";
import TableOutput from "../Tables/TableOutput";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import CarouselPicture from "../Picture/CarouselPicture";
import TableDetailOutput from "../Tables/TableDetailOutput";
import TabComponet from "../Tabs/TabComponet";

const OutputInformation = ({ OutputInfo }) => {
  const [selectedDataOutput, setSelectedDataOutput] = useState();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white lg:p-8 p-2 w-[96rem]">
        <header className="flex font-light text-xs lg:text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 rotate-90 -ml-2"
            viewBox="0 0 24 24"
            stroke="#b91c1c"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 12H4"
            />
          </svg>
          <p>Đầu ra</p>
        </header>
        <h2 className="font-bold text-base mt- lg:text-xl">Thông tin cơ bản</h2>

        <TableOutput dataInfoOutput={OutputInfo} />
        <div className="flex justify-end">
          <button
            className="bg-green-600 text-white font-semibold py-2 px-5 text-sm mt-6 inline-flex items-center group rounded-md"
            onClick={() => {
              handleOpen();
              setSelectedDataOutput(OutputInfo);
            }}
          >
            <p>Chi tiết</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1 group-hover:translate-x-2 delay-100 duration-200 ease-in-out"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
      <>
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>Thông tin chi tiết</DialogHeader>
          <DialogBody className="overflow-y-scroll !px-5 max-h-96">
            {selectedDataOutput ? (
              <div>
                {(() => {
                  const dataDetailOutput = [
                    {
                      label: "Thông tin",
                      value: "Info",
                      desc: (
                        <>
                          <CarouselPicture
                            dataImage={selectedDataOutput.images}
                          />
                          <TableDetailOutput
                            detailOutput={selectedDataOutput}
                          />
                        </>
                      ),
                    },
                    {
                      label: "Lịch sử",
                      value: "history",
                      desc: (
                        <>
                          {selectedDataOutput.historyOutput?.map(
                            (dataHistoryOutput, index) => (
                              <>
                                <div className="bg-green-500 text-white py-2 px-4 text-base lg:text-xl rounded-xl font-bold mt-3">
                                  Lần chỉnh sửa thứ {index + 1}
                                </div>
                                <TableDetailOutput
                                  detailOutput={dataHistoryOutput}
                                  key={index}
                                />
                              </>
                            )
                          )}
                        </>
                      ),
                    },
                  ];
                  return <TabComponet data={dataDetailOutput} />;
                })()}
              </div>
            ) : (
              <div className="lg:text-xl lg:mt-4 text-base text-gray-400 font-normal px-2 mt-2">
                Dữ liệu chưa cập nhật
              </div>
            )}
          </DialogBody>
          <DialogFooter>
            <Button variant="gradient" color="red" onClick={handleOpen}>
              <span>Thoát</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    </div>
  );
};

export default OutputInformation;
