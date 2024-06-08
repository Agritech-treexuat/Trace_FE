import React, { useEffect, useState, useMemo } from "react";
import "./listfarm.css";
import useListFarm from "./useListFarm";
import { Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router";
import Aos from "aos";
import "aos/dist/aos.css";

const ListFarm = () => {
  const { allFarm, isSuccessAllFarm, isLoadingAllFarm } = useListFarm();
  const MAX_DESCRIPTION_LENGTH = 100;
  const navigate = useNavigate();
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const [inputData, setInputData] = useState("");
  const handleChange = (event) => {
    setInputData(event.target.value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredFarms = useMemo(() => {
    return (allFarm || []).filter(
      (farm) =>
        farm.name.toLowerCase().includes(inputData.toLowerCase()) ||
        farm.address.toLowerCase().includes(inputData.toLowerCase())
    );
  }, [allFarm, inputData]);

  const totalPages = Math.ceil(filteredFarms.length / itemsPerPage);

  const currentFarms = filteredFarms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <section className="mx-auto sm:px-6 lg:px-8 py-24 justify-center">
      <div className="relative w-full lg:max-w-4xl mx-auto bg-white rounded-full mt-2 mb-10">
        <input
          placeholder="Nhập tên trang trại"
          className="rounded-full lg:text-xl w-full h-16 bg-transparent py-2 pl-8 pr-32 outline-none border-2 border-gray-100 shadow-md hover:outline-none focus:ring-teal-200 focus:border-teal-200"
          type="text"
          name="query"
          id="query"
          value={inputData}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="absolute inline-flex items-center h-10 px-4 py-2 text-sm text-white transition duration-150 ease-in-out rounded-full outline-none right-3 top-3 bg-teal-600 sm:px-6 sm:text-base sm:font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          <svg
            className="-ml-0.5 sm:-ml-1 mr-2 w-4 h-4 sm:h-5 sm:w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Tìm kiếm
        </button>
      </div>
      {isSuccessAllFarm && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {currentFarms.map((farm) => (
              <div
                data-aos="fade-up"
                className="mx-auto relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
              >
                <div className="relative mx-4 mt-4 h-72 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                  <img
                    src="https://i.pinimg.com/originals/5e/3f/dd/5e3fdd7119bffad728705e852680ba9a.jpg"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                      {farm.name}
                    </p>
                    <p className="block font-sans text-base font-medium leading-relaxed text-green-500 antialiased">
                      {farm.status === "active"
                        ? "Đang hoạt động"
                        : "Chưa cập nhật"}
                    </p>
                  </div>
                  <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
                    {farm.description.length > MAX_DESCRIPTION_LENGTH
                      ? `${farm.description.substring(
                          0,
                          MAX_DESCRIPTION_LENGTH
                        )}...`
                      : farm.description}
                  </p>
                </div>
                <div className="p-6 pt-0">
                  <button
                    className="block w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={() => navigate(`/farm/detail/${farm.id}`)}
                  >
                    Chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`mx-1 px-3 py-1 rounded-md ${
                  currentPage === index + 1
                    ? "bg-teal-600 text-white"
                    : "bg-white text-teal-600"
                } border border-teal-600 hover:bg-teal-700 hover:text-white`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
      {isLoadingAllFarm && <Spinner />}
    </section>
  );
};

export default ListFarm;
