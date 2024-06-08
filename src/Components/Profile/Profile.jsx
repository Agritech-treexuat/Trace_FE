import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import useProfile from "./useProfile";
import Plant from "../Plant/Plant";
import Project from "../Project/Project";
import Avarta from "../Avarta/Avarta";
import Aos from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
const ProfileFarm = () => {
  const navigate = useNavigate();
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const { farmId } = useParams();
  const {
    farmInfo,
    isSuccessFarmInfo,
    isLoadingFarmInfo,
    allPlant,
    isSuccessPlant,
    isLoadingPlant,
    allProject,
    isSuccessProject,
    isLoadingProject,
    plantsCount,
    inProgressProjectsCount,
    finishedProjectsCount,
    canceledProjectsCount,
    totalQRCount,
    scannedQRCount,
    distributorsByFarm,
    isSuccessQR,
    isLoadingQR,
    isSuccessDistributorByFarm,
    isLoadingDistributorByFarm,
  } = useProfile({
    farmId,
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isSuccessFarmInfo && !farmInfo.id) {
    navigate("/404-notfound");
  }

  const displayWalletAddress = (address) => {
    if (isMobile) {
      return `${address.slice(0, 10)}...${address.slice(-10)}`;
    }
    return address;
  };
  return (
    <>
      <div data-aos="fade-up" className="mx-auto pt-20">
        {isSuccessFarmInfo && farmInfo.id && <Avarta data={farmInfo.images} />}
        {isLoadingFarmInfo && <Spinner />}

        <section data-aos="fade-up" className="relative py-8 bg-blueGray-200">
          {isSuccessFarmInfo && farmInfo.id && (
            <div className="container mx-auto px-4">
              <div className="text-center mt-1">
                <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-1">
                  {farmInfo.name}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-1 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {farmInfo.address}
                </div>
                <div className="text-sm leading-normal mt-0 mb-1 text-blue-800 font-bold uppercase">
                  <i className="fas fa-wallet mr-2 text-lg text-blueGray-400"></i>
                  {farmInfo?.walletAddress ? (
                    <a
                      href={`/event/farm/${farmInfo.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {displayWalletAddress(farmInfo.walletAddress)}
                    </a>
                  ) : (
                    ""
                  )}
                </div>
                {farmInfo?.email?.map((email) => (
                  <div className="mb-2 text-blue-500 mt-3">
                    <i className="fas fa-mail-bulk mr-2 text-lg"></i>
                    <span>{email}</span>
                  </div>
                ))}
                <div className="mb-2 text-blue-500">
                  <i className="fas fa-phone mr-2 text-lg text-blueGray-400"></i>
                  {farmInfo?.phone?.map((phone) => (
                    <span> - {phone} </span>
                  ))}
                </div>
              </div>
            </div>
          )}
          {isLoadingFarmInfo && <Spinner />}
        </section>

        <section>
          {isSuccessFarmInfo && farmInfo.id && (
            <div
              data-aos="fade-up"
              className="bg-[#f3f6ff] flex justify-center items-center min-h-screen"
            >
              <div className="w-full ml-1 mr-1 flex flex-col justify-center items-center sm:w-96 border-gray-700 text-center lg:w-[900px]">
                <div className="w-full rounded-2xl p-8 text-white bg-gradient-to-br from-[#5f99f9] to-[#8868dc] pb-44 relative">
                  <h1 className="text-xl mb-4">Lời giới thiệu</h1>
                  <p>{farmInfo.description}</p>
                </div>
                <div className="text-center bg-white shadow-lg w-[80%] rounded-xl -mt-32 z-10 p-9 flex items-center flex-col">
                  {/* <h2 className="font-semibold text-xl">Start chatting</h2> */}
                  <img
                    src={farmInfo.images[0]}
                    alt="Profile"
                    className="w-[40%] rounded-full mt-7"
                  />
                  <p className="mt-3 font-semibold text-lg">{farmInfo.name}</p>
                  {farmInfo.status === "active" ? (
                    <span className="text-slate-500 rounded-xl border-slate-100 text-sm mt-2 pl-3 pr-3 border-[1px]">
                      <span className="bg-green-500 w-2 h-2 rounded-full mt-0.5 inline-block"></span>{" "}
                      Đang hoạt động
                    </span>
                  ) : (
                    <span className="text-slate-500 rounded-xl border-slate-100 text-sm mt-2 pl-3 pr-3 border-[1px]">
                      <span className="bg-red-500 w-2 h-2 rounded-full mt-0.5 inline-block"></span>{" "}
                      Dừng hoạt động
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
          {isLoadingFarmInfo && <Spinner />}
        </section>
      </div>
      {isSuccessQR &&
        isSuccessDistributorByFarm &&
        isSuccessPlant &&
        isSuccessProject && (
          <section className="flex justify-center">
            <div className="w-full lg:w-[900px] p-6 bg-grey lg:ml-20 lg:mr-20">
              <div className="bg-white overflow-hidden shadow rounded-lg border">
                <div className="lg:py-5 px-4 py-3">
                  <div className="justify-between items-center text-sm">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-green-700 lg:text-2xl">
                        Tổng quan trang trại
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 lg:px-4 lg:py-5 sm:p-0 px-5 py-1">
                  <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="lg:py-3 py-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-700">
                        Số cây trang trại canh tác
                      </dt>
                      <dd className="lg:ml-52 mt-1 text-sm text-black lg:text-base font-medium sm:mt-0 sm:col-span-2">
                        {plantsCount}
                      </dd>
                    </div>
                    <div className="lg:py-3 py-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-700">
                        Số dự án đang thực hiện
                      </dt>
                      <dd className="lg:ml-52 mt-1 text-sm text-black lg:text-base font-medium sm:mt-0 sm:col-span-2">
                        {inProgressProjectsCount}
                      </dd>
                    </div>
                    <div className="lg:py-3 py-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-700">
                        Số dự án đã hoàn thành
                      </dt>
                      <dd className="lg:ml-52 mt-1 text-sm text-black lg:text-base font-medium sm:mt-0 sm:col-span-2">
                        {finishedProjectsCount}
                      </dd>
                    </div>
                    <div className="lg:py-3 py-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-700">
                        Số dự án đã hủy
                      </dt>
                      <dd className="lg:ml-52 mt-1 text-sm text-black lg:text-base font-medium sm:mt-0 sm:col-span-2">
                        {canceledProjectsCount}
                      </dd>
                    </div>
                    <div className="lg:py-3 py-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-700">
                        Tổng số mã QR đã tạo
                      </dt>
                      <dd className="lg:ml-52 mt-1 text-sm text-black lg:text-base font-medium sm:mt-0 sm:col-span-2">
                        {totalQRCount}
                      </dd>
                    </div>
                    <div className=" lg:py-3 py-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-700">
                        Tổng số mã QR đã quét
                      </dt>
                      <dd className="lg:ml-52 mt-1 text-sm text-black lg:text-base font-medium sm:mt-0 sm:col-span-2">
                        {scannedQRCount}
                      </dd>
                    </div>
                    <div className="lg:py-3 py-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-700">
                        Số dự án đã hủy
                      </dt>
                      <dd className="lg:ml-52 mt-1 text-sm text-black lg:text-base font-medium sm:mt-0 sm:col-span-2">
                        {canceledProjectsCount}
                      </dd>
                    </div>
                    <div className="lg:py-3 py-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-700">
                        Số lượng đối tác phân phối
                      </dt>
                      <dd className="lg:ml-52 text-sm text-black lg:text-base font-medium sm:mt-0 sm:col-span-2">
                        {distributorsByFarm.map((distributer) => (
                          <div key={distributer.name}>
                            <h1>
                              {distributer.name}- {distributer.totalAmount}
                              {""}
                              sản phẩm
                            </h1>
                            <br />
                          </div>
                        ))}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </section>
        )}

      {isSuccessPlant && <Plant dataPlant={allPlant} />}
      {isLoadingPlant && <Spinner />}

      {isSuccessProject && <Project dataProject={allProject} />}
      {isLoadingProject && <Spinner />}
    </>
  );
};

export default ProfileFarm;
