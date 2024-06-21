import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { generateDate, months } from "../../Utils/calendar";
import cn from "../../Utils/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  formatTransactionHashTable,
  formatDateTime,
  formatDate,
  formatLongText,
} from "../../Utils/helpers";
import { FaCopy } from "react-icons/fa";

const Calendar = ({ dataImage, dataWeather, startTime, endTime }) => {
  const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const currentDate = dayjs();
  const startDate = startTime
    ? dayjs(startTime).subtract(1, "day").format("YYYY-MM-DD")
    : dayjs("2020-01-01");
  const endDate = endTime
    ? dayjs(endTime).add(1, "day").format("YYYY-MM-DD")
    : currentDate.add(1, "day").format("YYYY-MM-DD");

  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [filterImages, setFilterImages] = useState([]);
  const [filterWeather, setFilterWeather] = useState([]);
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleFilter = () => {
    setFilterImages(
      dataImage.filter((item) => {
        return (
          new Date(item.capture_time).toLocaleDateString() ===
          selectDate.toDate().toLocaleDateString()
        );
      })
    );
    setFilterWeather(
      dataWeather.filter((item) => {
        return (
          new Date(item.time).toLocaleDateString() ===
          selectDate.toDate().toLocaleDateString()
        );
      })
    );
    handleOpen();
  };

  useEffect(() => {
    handleFilter();
  }, [selectDate]);

  const isDateWithinRange = (date) => {
    return date.isAfter(startDate) && date.isBefore(endDate);
  };

  const findWeatherInTimeRange = (time) => {
    const timeDate = new Date(time);
    if (!filterWeather || filterWeather.length === 0) return null;

    const weatherInRange = filterWeather.find((weather) => {
      const weatherTime = new Date(weather.time);
      return (
        weatherTime.getHours() === timeDate.getHours() &&
        weatherTime.toLocaleDateString() === timeDate.toLocaleDateString()
      );
    });

    return weatherInRange || null;
  };

  const groupImagesByHour = () => {
    const groupedImages = {};

    for (let i = 0; i < 24; i++) {
      groupedImages[i] = [];
    }

    filterImages.forEach((image) => {
      const imageHour = new Date(image.capture_time).getHours();
      groupedImages[imageHour].push(image);
    });

    return groupedImages;
  };

  const imagesByHour = groupImagesByHour();

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // alert("Copy thành công!");
  };

  return (
    <section>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-5 sm:w-3/4 mx-auto">
        <div className="w-full sm:w-96">
          <h1 className="font-semibold text-sm">
            Dự án bắt đầu từ ngày {formatDate(startDate)} đến {formatDate(endDate)} 
          </h1>
          <p className="text-gray-400 text-xs">
            Vui lòng chọn ngày tháng trong dự án để xem thông tin (Ngoài ra không xem được)
          </p>
        </div>
        <div className="w-full sm:w-96">
          <div className="flex justify-between items-center">
            <h1 className="select-none font-semibold text-sm">
              {months[today.month()]}, {today.year()}
            </h1>
            <div className="flex gap-5 items-center">
              <GrFormPrevious
                className="w-4 h-4 cursor-pointer hover:scale-105 transition-all"
                onClick={() => {
                  setToday(today.month(today.month() - 1));
                }}
              />
              <h1
                className="cursor-pointer hover:scale-105 transition-all text-xs"
                onClick={() => {
                  setToday(currentDate);
                }}
              >
                Hôm nay
              </h1>
              <GrFormNext
                className="w-4 h-4 cursor-pointer hover:scale-105 transition-all"
                onClick={() => {
                  setToday(today.month(today.month() + 1));
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-7">
            {days.map((day, index) => (
              <h1
                key={index}
                className="text-xs text-center h-10 w-10 grid place-content-center text-gray-500 select-none"
              >
                {day}
              </h1>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {generateDate(today.month(), today.year()).map(
              ({ date, currentMonth, today }, index) => {
                const isWithinRange = isDateWithinRange(date);
                return (
                  <div
                    key={index}
                    className={`p-1 text-center h-10 w-10 grid place-content-center text-xs border-t ${
                      isWithinRange ? "" : "cursor-not-allowed"
                    }`}
                  >
                    <h1
                      className={cn(
                        currentMonth ? "" : "text-gray-400",
                        today ? "bg-red-600 text-white" : "",
                        selectDate.isSame(date, "day") ? "bg-black text-white" : "",
                        "h-6 w-6 rounded-full grid place-content-center",
                        isWithinRange
                          ? "hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                          : "text-gray-300"
                      )}
                      onClick={() => {
                        if (isWithinRange) {
                          setSelectDate(date);
                        }
                      }}
                    >
                      {date.date()}
                    </h1>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Hình ảnh và thời tiết </DialogHeader>
        <DialogBody className="h-[28rem] lg:h-[35rem] overflow-y-auto">
          <div>
            {Object.keys(imagesByHour).map((hour) => {
              const images = imagesByHour[hour];
              const weather = findWeatherInTimeRange(
                new Date(selectDate).setHours(hour)
              );

              return (
                <div key={hour}>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {`${hour} giờ`}
                  </h4>
                  <div className="flex flex-col lg:flex-row items-center gap-4 p-4 bg-white shadow-md rounded-lg mb-4">
                    {images.length > 0 ? (
                      images.map((item, index) => (
                        <div key={index} className="flex-shrink-0">
                          <img
                            className="w-60 h-40 lg:w-80 lg:h-72 rounded-lg object-cover object-center border border-gray-200"
                            src={item.image_url}
                            alt="gallery-photo"
                          />
                          <p className="text-gray-800 text-base lg:ml-4 lg:text-xl font-semibold lg:mb-2">
                            {formatDateTime(item.capture_time)}
                          </p>
                          <div className="flex items-center">

                          <p className="font-semibold text-blue-800 lg:text-base lg:ml-4">
                            Mã Hash: {formatTransactionHashTable(
                              {
                                str: item.tx_hash,
                                a: 8,
                                b: 5,
                              }
                            )}
                          </p>
                          <FaCopy
                          className="ml-3 cursor-pointer text-blue-400 hover:text-blue-800"
                          onClick={() =>
                            copyToClipboard(
                              item.tx_hash
                            )
                          }
                        />
                        </div>
                        <div className="flex items-center">
                          <p className="font-semibold text-gray-600 lg:text-base lg:ml-4">
                            Image Hash: {
                              formatLongText({
                                str: item.image_hash,
                                a: 8,
                                b: 5,
                              })
                            }
                          </p>
                          <FaCopy
                          className="ml-3 cursor-pointer text-blue-400 hover:text-gray-600"
                          onClick={() =>
                            copyToClipboard(
                              item.image_hash
                            )
                          }
                        />
                        </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600">Không có hình ảnh</p>
                    )}
                    {weather ? (
                      <div className="text-gray-600 text-sm lg:text-base mt-2 lg:mt-0 lg:ml-4 space-y-1">
                        <p className="flex items-center">
                          <span className="font-medium text-gray-800">Mô tả:</span>{" "}
                          {weather.description}
                        </p>
                        <p className="flex items-center">
                          <span className="font-medium text-gray-800">Nhiệt độ:</span>{" "}
                          {weather.temp}°C
                        </p>
                        <p className="flex items-center">
                          <span className="font-medium text-gray-800">Độ ẩm:</span>{" "}
                          {weather.humidity}%
                        </p>
                        <p className="flex items-center">
                          <span className="font-medium text-gray-800">Tốc độ gió:</span>{" "}
                          {weather.windSpeed}m/s
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-600">Không có thông tin thời tiết</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Thoát</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </section>
  );
};

export default Calendar;
