import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useEventFarm from "./useEventFarm";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

import "aos/dist/aos.css";
import {
  formatDateTime,
  formatTransactionHashTable,
} from "../../Utils/helpers";

const EventFarmComponent = () => {
  const { farmId } = useParams();
  const { allEventByFarm, isSuccessAllEventByFarm, isLoadingAllEventByFarm } =
    useEventFarm({
      farmId,
    });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalItems = allEventByFarm ? allEventByFarm.length : 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`mx-1 px-3 py-1 border rounded ${
              i === currentPage ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(
            <button
              key={i}
              onClick={() => handleClick(i)}
              className={`mx-1 px-3 py-1 border rounded ${
                i === currentPage ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              {i}
            </button>
          );
        }
        pageNumbers.push(
          <button
            key="ellipsis1"
            className="mx-1 px-3 py-1 border rounded bg-white"
            disabled
          >
            ...
          </button>
        );
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(
          <button
            key="ellipsis1"
            className="mx-1 px-3 py-1 border rounded bg-white"
            disabled
          >
            ...
          </button>
        );
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(
            <button
              key={i}
              onClick={() => handleClick(i)}
              className={`mx-1 px-3 py-1 border rounded ${
                i === currentPage ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              {i}
            </button>
          );
        }
      } else {
        pageNumbers.push(
          <button
            key="ellipsis1"
            className="mx-1 px-3 py-1 border rounded bg-white"
            disabled
          >
            ...
          </button>
        );
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(
            <button
              key={i}
              onClick={() => handleClick(i)}
              className={`mx-1 px-3 py-1 border rounded ${
                i === currentPage ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              {i}
            </button>
          );
        }
        pageNumbers.push(
          <button
            key="ellipsis2"
            className="mx-1 px-3 py-1 border rounded bg-white"
            disabled
          >
            ...
          </button>
        );
      }
    }
    return pageNumbers;
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEvents = allEventByFarm
    ? allEventByFarm.slice(startIndex, startIndex + itemsPerPage)
    : [];

  return (
    <>
      <section className="py-1 bg-blueGray-50">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-2xl">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-2xl text-blueGray-700 lg:text-3xl">
                    Bảng thông tin
                  </h3>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto lg:h-[440px] h-[330px]">
              <table className="items-center bg-transparent w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 bg-gray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs lg:text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Mã Transaction
                    </th>
                    <th className="px-4 bg-gray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs lg:text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Thời gian
                    </th>
                    <th className="px-4 bg-gray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs lg:text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Sự kiện
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isSuccessAllEventByFarm &&
                    currentEvents &&
                    currentEvents.length > 0 &&
                    currentEvents.map((event) => {
                      return (
                        <tr key={event.id}>
                          <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs lg:text-xl whitespace-nowrap p-4 text-left text-blue-500 hover:text-blue-00">
                            {formatTransactionHashTable({
                              str: event.tx,
                              a: 8,
                              b: 5,
                            })}
                          </th>
                          <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs lg:text-xl whitespace-nowrap p-4 text-gray-600">
                            {formatDateTime(event.timestamp)}
                          </td>
                          <td className="border-t-0 px-4 align-center border-l-0 border-r-0 text-xs lg:text-xl whitespace-nowrap p-4 text-gray-600">
                            {event.event}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center lg:mt-10 lg:mb-10 mt-5 mb-5">
              <div className="flex justify-center mt-4">
                {totalPages > 1 && (
                  <div>
                    {currentPage > 1 && (
                      <button
                        onClick={() => handleClick(currentPage - 1)}
                        className="mx-1 px-3 py-1 border rounded bg-white"
                      >
                        <FaAngleLeft />
                      </button>
                    )}

                    {renderPageNumbers()}

                    {currentPage < totalPages && (
                      <button
                        onClick={() => handleClick(currentPage + 1)}
                        className="mx-1 px-3 py-1 border rounded bg-white"
                      >
                        <FaAngleRight />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {isLoadingAllEventByFarm && (
        <div className="flex flex-col items-center justify-center pt-[10vh]">
          <p className="text-lg font-semibold text-gray-800">Loading...</p>
        </div>
      )}
      {isSuccessAllEventByFarm &&
        (!allEventByFarm || allEventByFarm.length === 0) && (
          <div className="flex flex-col items-center justify-center pt-[10vh]">
            <p className="text-lg font-semibold text-gray-800">
              Không có dữ liệu
            </p>
          </div>
        )}
    </>
  );
};

export default EventFarmComponent;
