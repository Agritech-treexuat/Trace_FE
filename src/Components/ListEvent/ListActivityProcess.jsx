import React, { useState } from "react";
import {
  renderTypeProcess,
  formatTransactionHashTable,
  formatDate,
  formatLongText,
  formatDateTime,
} from "../../Utils/helpers";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  TabPanel,
  Tab,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Button,
} from "@material-tailwind/react";
import { FaCopy, FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import Modal from "react-modal";
import DialogInfoDetail from "../Dialog/DialogInfoDetail";
import { Icon } from "@mui/material";

const ListActivityProcess = ({ listActivity }) => {
  const [openDetailProcess, setOpenDetailProcess] = useState(false);
  const handleOpenDetailDeleteProcess = () =>
    setOpenDetailProcess(!openDetailProcess);
  const [selectedProcess, setSelectedProcess] = useState(null);
  const [reportsOpen, setReportsOpen] = useState(0);
  const handleReportsOpen = (value) =>
    setReportsOpen(reportsOpen === value ? 0 : value);
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copy thành công!");
  };
  const [scrollLeft, setScrollLeft] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleScroll = (scrollOffset) => {
    const slider = document.getElementById("slider");
    const newScrollLeft = scrollLeft + scrollOffset;
    setScrollLeft(newScrollLeft);
    slider.scrollLeft = newScrollLeft;
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  const data = [
    {
      label: "Thông tin",
      value: "infor",
      desc: (
        <DialogBody className="">
          <section className="infor">
            {selectedProcess ? (
              <>
                <Accordion
                  open={reportsOpen === 1}
                  icon={<Icon id={1} open={reportsOpen} />}
                >
                  <AccordionHeader
                    onClick={() => handleReportsOpen(1)}
                    style={{ color: "green" }}
                  >
                    Công việc
                  </AccordionHeader>
                  <AccordionBody>
                    <div className="w-full md:w-[40rem]">
                      <DialogInfoDetail dataDetailInfo={selectedProcess} />
                    </div>
                  </AccordionBody>
                </Accordion>
                <Accordion
                  open={reportsOpen === 2}
                  icon={<Icon id={2} open={reportsOpen} />}
                >
                  <AccordionHeader
                    onClick={() => handleReportsOpen(2)}
                    style={{ color: "green" }}
                  >
                    Lịch sử chỉnh sửa
                  </AccordionHeader>
                  <AccordionBody>
                    {selectedProcess?.historyProcess.length > 0 ? (
                      selectedProcess.historyProcess.map((data, index) => (
                        <div key={index}>
                          <div className="mb-5 lg:text-lg text-base text-blue-500 font-bold border-b bg-gray-200 py-4 px-4 rounded-xl">
                            Chỉnh sửa lần thứ {index + 1}
                          </div>
                          <DialogInfoDetail dataDetailInfo={data} />
                        </div>
                      ))
                    ) : (
                      <div className="mt-4 lg:text-lg text-base text-gray-400 font-medium">
                        Không có chỉnh sửa
                      </div>
                    )}
                  </AccordionBody>
                </Accordion>
              </>
            ) : (
              <div className="text-gray-400 font-medium text-base lg:text-lg">
                Không có thông tin
              </div>
            )}
          </section>
        </DialogBody>
      ),
    },
    {
      label: "Video được phân tích tự động",
      value: "Input",
      desc: (
        <div>
          {selectedProcess?.objectDetections?.length > 0 ? (
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
                      <dd className="mt-1 text-sm text-blue-500 lg:text-base font-medium sm:mt-0 sm:col-span-2 flex items-center">
                        {formatTransactionHashTable({
                          str: selectedProcess?.objectDetections[0].tx_hash,
                          a: 8,
                          b: 5,
                        })}
                        <FaCopy
                          className="ml-20 cursor-pointer text-blue-400 hover:text-blue-800"
                          onClick={() =>
                            copyToClipboard(
                              selectedProcess.objectDetections[0].tx_hash
                            )
                          }
                        />
                      </dd>
                    </div>
                    <div className="lg:py-3 py-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-700">
                        Video Hash
                      </dt>
                      <dd className="mt-1 text-sm text-black lg:text-base font-medium sm:mt-0 sm:col-span-2 flex items-center">
                        {formatLongText({
                          str: selectedProcess?.objectDetections[0]
                            .concatenated_hash,
                          a: 8,
                          b: 5,
                        })}
                        <FaCopy
                          className="ml-20 cursor-pointer text-gray-400 hover:text-gray-700"
                          onClick={() =>
                            copyToClipboard(
                              selectedProcess.objectDetections[0].tx_hash
                            )
                          }
                        />
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="px-2 mt-4 lg:text-xl text-base font-bold text-green-600 lg:mb-5 mb-3">
                Danh sách video
              </div>
              {selectedProcess.objectDetections.map((data, index) => (
                <div key={index}>
                  <span className="ml-1 text-base">
                    {formatDateTime(data.start_time)} -{" "}
                    {formatDateTime(data.end_time)}
                  </span>
                  <video
                    className="h-full w-full my-2 rounded-lg cursor-pointer"
                    controls
                    autoPlay
                    muted
                    onClick={() => handleVideoClick(data)}
                  >
                    <source src={data.video_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 lg:text-lg text-base text-gray-400 font-medium">
              Không có video được phát hiện tự động
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="rounded-xl p-2">
      <div
        className={`mx-auto flex justify-center ${
          listActivity ? (listActivity?.length > 5 ? "h-screen" : "") : ""
        }`}
      >
        <div
          className="w-full h-full overflow-auto shadow bg-white"
          id="journal-scroll"
        >
          {listActivity?.length > 0 ? (
            <table className="w-full">
              {listActivity.map((activity, index) => (
                <tbody
                  key={index}
                  className="border-b-2 border-gray-300 cursor-default bg-gray-200 bg-opacity-25"
                >
                  <tr
                    className="relative transform scale-100 text-xs lg:text-base py-1"
                    onClick={() => {
                      handleOpenDetailDeleteProcess();
                      setSelectedProcess(activity);
                    }}
                  >
                    <td className="lg:pl-5 lg:pr-3 pl-2 whitespace-no-wrap">
                      <div className="text-gray-400">
                        {formatDate(activity.time)}
                      </div>
                    </td>
                    <td className="px-2 py-2 whitespace-no-wrap">
                      <div className="leading-5 text-green-500 font-medium text-base lg:text-xl">
                        {renderTypeProcess(activity.type)}
                      </div>
                      <div className="leading-5 text-gray-900 text-sm lg:text-base">
                        {window.innerWidth > 300 ? (
                          <span>{activity.name}</span>
                        ) : (
                          <span>
                            {activity.name.length > 20
                              ? activity.name.slice(0, 20) + "..."
                              : activity.name}
                          </span>
                        )}
                        <p className="text-blue-500 hover:underline text-sm">
                          {formatTransactionHashTable({
                            str: activity.tx,
                            a: 8,
                            b: 5,
                          })}
                        </p>
                      </div>
                      <div className="leading-2 text-blue-400 text-xs">
                        Nhấn vào để xem chi tiết
                      </div>
                    </td>
                    <td>
                      {activity.objectDetections.length > 0 ? (
                        <div className="item-center justify-center text-green-500">
                          <h3>Passed</h3>
                        </div>
                      ) : (
                        <div className="item-center justify-center text-red-500">
                          <h3>Not Passed</h3>
                        </div>
                      )}
                    </td>
                  </tr>
                  {activity.objectDetections.length > 0 && (
                    <tr>
                      <td colSpan="3">
                        <div className="relative overflow-hidden bg-gray-100">
                          <div className="flex justify-between items-center px-2">
                            <button
                              className="flex items-center justify-center lg:w-10 lg:h-10 w-5 h-5 bg-green-600 text-white rounded-full shadow-md"
                              onClick={() => handleScroll(-100)}
                            >
                              <FaArrowCircleLeft className="w-5 h-5" />
                            </button>
                            <div
                              id="slider"
                              className="flex space-x-2 overflow-x-auto p-2"
                              onScroll={(e) =>
                                setScrollLeft(e.target.scrollLeft)
                              }
                            >
                              {activity.objectDetections?.map(
                                (video, vidIndex) => (
                                  <div key={vidIndex} className="flex-shrink-0">
                                    <video
                                      className="w-24 h-24 lg:w-32 lg:h-32 object-cover rounded-lg shadow-md cursor-pointer"
                                      controls
                                      src={video.video_url}
                                      autoPlay
                                      loop
                                      muted
                                      onClick={() => handleVideoClick(video)}
                                    ></video>
                                  </div>
                                )
                              )}
                            </div>
                            <button
                              className="flex items-center justify-center lg:w-10 lg:h-10 w-5 h-5 bg-green-600 text-white rounded-full shadow-md"
                              onClick={() => handleScroll(100)}
                            >
                              <FaArrowCircleRight className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              ))}
            </table>
          ) : (
            <div className="mt-5 justify-center items-center m-2 p-1">
              <h3 className="text-gray-400">Không có dữ liệu</h3>
            </div>
          )}
        </div>
      </div>
      <Dialog open={openDetailProcess} handler={handleOpenDetailDeleteProcess}>
        <DialogHeader>Chi tiết công việc</DialogHeader>

        <DialogBody className="h-[35rem] overflow-y-auto">
          <Tabs className="tab" id="custom-animation" value="infor">
            <TabsHeader className="tab-header" style={{ height: "80px" }}>
              {data.map(({ label, value }) => (
                <Tab key={value} value={value} style={{ height: "70px" }}>
                  <span className="text-lg leading-5">{label}</span>
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody>
              {data.map(({ value, desc }) => (
                <TabPanel key={value} value={value}>
                  {desc}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpenDetailDeleteProcess}
            className="mr-1"
          >
            <span>Thoát</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <Modal
        isOpen={!!selectedVideo}
        onRequestClose={closeModal}
        contentLabel="Phóng to Video"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: "800px",
          },
        }}
      >
        <button
          onClick={closeModal}
          className="right-2 text-red-500 hover:text-red-700 text-5xl leading-none"
        >
          &times;
        </button>
        {selectedVideo && (
          <video className="w-full h-auto rounded-lg" controls autoPlay muted>
            <source src={selectedVideo.video_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </Modal>
    </div>
  );
};

export default ListActivityProcess;
