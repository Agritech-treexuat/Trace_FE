import React, { useState, useEffect } from "react";
import Avarta from "../Avarta/Avarta";
import Aos from "aos";
import "aos/dist/aos.css";
import { useParams } from "react-router-dom";
import usePlants from "../Plant/usePlants";
import Footer from "../Footer/Footer";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Spinner,
} from "@material-tailwind/react";
import {
  renderTypePlant,
  renderTypeFertilization,
  renderTypePestAndDisease,
} from "../../Utils/helpers";
import Loading from "../Loading";

const DialogDefault = ({ data, isOpen, handleClose }) => {
  return (
    <div>
      <Dialog open={isOpen} handler={handleClose}>
        <DialogHeader>Thông tin</DialogHeader>
        <DialogBody className="lg:h-[35rem] h-[25rem] overflow-y-auto">
          <section>
            <div>
              {data?.name && (
                <div className="max-w-screen-md text-xs">
                  <h4 className="text-lg font-semibold  text-gray-900 mb-2">
                    Tên hoạt động :
                  </h4>
                  <p className="font-semibold text-gray-600 mb-4 lg:text-base">
                    {data?.name}
                  </p>
                </div>
              )}
              {data?.density && (
                <div className="max-w-screen-md text-xs">
                  <h4 className="text-lg font-semibold  text-gray-900 mb-2">
                    Mật độ :
                  </h4>
                  <p className="font-semibold text-gray-600 mb-4 lg:text-base">
                    {data?.density}
                  </p>
                </div>
              )}
              {data?.fertilizationTime && (
                <div className="max-w-screen-md text-xs">
                  <h4 className="text-lg font-semibold  text-gray-900 mb-2">
                    Thời điểm :
                  </h4>
                  <p className="font-semibold text-gray-600 mb-4 lg:text-base">
                    {data?.fertilizationTime}
                  </p>
                </div>
              )}
              {data?.type && (
                <div className="max-w-screen-md text-xs">
                  <h4 className="text-lg font-semibold  text-gray-900 mb-2">
                    Kiểu loại :
                  </h4>
                  <p className="font-semibold text-gray-600 mb-4 lg:text-base">
                    {renderTypeFertilization(data.type)}
                  </p>
                </div>
              )}
              {data?.symptoms && (
                <div className="max-w-screen-md text-xs">
                  <h4 className="text-lg font-semibold  text-gray-900 mb-2">
                    Triệu chứng :
                  </h4>
                  <p className="font-semibold text-gray-600 lg:text-base mb-4">
                    {data?.symptoms}
                  </p>
                </div>
              )}
              {data?.description && (
                <div className="max-w-screen-md text-xs">
                  <h4 className="text-lg font-semibold  text-gray-900 mb-2">
                    Mô tả :
                  </h4>
                  <p className="font-semibold text-gray-600 lg:text-base mb-4">
                    {data?.description}
                  </p>
                </div>
              )}
              {data?.solution && (
                <div className="max-w-screen-md text-xs">
                  <h4 className="text-lg font-semibold  text-gray-900 mb-2">
                    Giải pháp :
                  </h4>

                  {data?.solution.map((solution, index) => (
                    <p className="font-semibold text-gray-600 mb-4 lg:text-base">
                      Giải pháp {index + 1} : {solution}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </section>
        </DialogBody>

        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleClose}
            className="mr-1"
          >
            <span>Thoát</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

const PlantRecommendDetail = () => {
  const { plantId } = useParams();
  const { dataPlantFarm, isSuccessPlantFarmById, isLoadingPlantFarmById } =
    usePlants({
      plantId,
    });
  const [open, setOpen] = useState(0);
  const [openPlantFarming, setOpenPlantFarming] = useState(0);

  const [openDialogCultivationActivities, setOpenDialogCultivationActivities] =
    useState(false);
  const [openDialogPlantingActivity, setOpenDialogPlantingActivity] =
    useState(false);
  const [
    openDialogFertilizationActivities,
    setOpenDialogFertilizationActivities,
  ] = useState(false);
  const [
    openDialogPestAndDiseaseControlActivities,
    setOpenDialogPestAndDiseaseControlActivities,
  ] = useState(false);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const handleOpenPlantFarming = (value) =>
    setOpenPlantFarming(openPlantFarming === value ? 0 : value);

  const handleOpenCultivationActivities = () =>{
    setOpenDialogCultivationActivities(!openDialogCultivationActivities);
  }
  const handleOpenPlantingActivity = () =>
    setOpenDialogPlantingActivity(!openDialogPlantingActivity);
  const handleOpenFertilizationActivities = () =>
    setOpenDialogFertilizationActivities(!openDialogFertilizationActivities);
  const handleOpenPestAndDiseaseControlActivities = () =>
    setOpenDialogPestAndDiseaseControlActivities(
      !openDialogPestAndDiseaseControlActivities
    );
  const [selectData,setSelectData] = useState();
  const [dataFertilizationActivities, setDataFertilizationActivities] =
    useState();
  const [
    dataPestAndDiseaseControlActivities,
    setDataPestAndDiseaseControlActivities,
  ] = useState();

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

  
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  

  return (
    <section data-aos="fade-up" className="mx-auto pt-20">
      <>
        {isSuccessPlantFarmById && (
          <>
            <section className="mb-5">
              <div className="container mx-auto my-5 px-2 sm:px-0">
                <div className="md:flex md:flex-wrap">
                  <div className="w-full md:pr-2">
                    <div className="bg-white p-3 border-t-4 border-green-400 lg:mt-5">
                      {/* <div className="image overflow-hidden">
                        <img
                          className="h-48 w-52 mx-auto"
                          src={dataPlantFarm[0].plant.plant_thumb}
                          alt=""
                        />
                      </div> */}
                      <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                        Thông tin chung
                      </h1>
                      <h3 className="text-gray-900 font-bold text-semibold leading-7 text-xl">
                        {dataPlantFarm[0].plant.plant_name}
                      </h3>
                      <p className="text-base text-gray-600 hover:text-gray-600 leading-6">
                        {dataPlantFarm[0].plant.plant_description}
                      </p>
                      <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3  rounded shadow-sm">
                        <li className="flex items-center py-3 lg:text-xl text-base">
                          <span>Phân loại</span>
                          <span className="ml-auto">
                            <span className="bg-green-500 py-1 px-2 rounded text-white text-base lg:text-xl">
                              {renderTypePlant(
                                dataPlantFarm[0].plant.plant_type
                              )}
                            </span>
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="my-4"></div>
                  </div>
                </div>
              </div>
            </section>
            <div className="text-green-500 font-bold text-2xl m-5 lg:ml-20 lg:mr-20">
              Danh sách các hạt giống{" "}
            </div>
            <section className="m-3 px-5 rounded-2xl bg-white lg:ml-20 lg:mr-20">
              {dataPlantFarm.map((plantFarming, index) => (
                <>
                  <Accordion
                    open={open === index + 1}
                    icon={<Icon id={index + 1} open={open} />}
                  >
                    <AccordionHeader onClick={() => handleOpen(index + 1)}>
                      {plantFarming.seed.seed_name}
                    </AccordionHeader>
                    <AccordionBody>
                      <section className="mx-2">
                        <>
                          <Accordion
                            open={openPlantFarming === 1}
                            className="mb-2 rounded-lg border border-blue-gray-100 px-4"
                          >
                            <AccordionHeader
                              onClick={() => handleOpenPlantFarming(1)}
                              className={`border-b-0 transition-colors ${
                                openPlantFarming === 1
                                  ? "text-green-400 hover:!text-blue-900"
                                  : ""
                              }`}
                            >
                              Thông tin hạt giống
                            </AccordionHeader>
                            <AccordionBody className="pt-0 text-base font-normal">
                              <section>
                                <div className="grid md:grid-cols-2 text-sm">
                                  <div className="grid grid-cols-2 lg:text-base">
                                    <div className="px-4 py-2 font-semibold">
                                      Số hiệu
                                    </div>
                                    <div className="px-4 py-2">
                                      {plantFarming.id}
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 lg:text-base">
                                    <div className="px-4 py-2 font-semibold">
                                      Tên
                                    </div>
                                    <div className="px-4 py-2">
                                      {plantFarming.seed.seed_name}
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 lg:text-base">
                                    <div className="px-4 py-2 font-semibold">
                                      Mô tả
                                    </div>
                                    <div className="px-4 py-2">
                                      {plantFarming.seed.seed_description}
                                    </div>
                                  </div>
                                </div>
                              </section>
                            </AccordionBody>
                          </Accordion>
                          <Accordion
                            open={openPlantFarming === 2}
                            className="mb-2 rounded-lg border border-blue-gray-100 px-4"
                          >
                            <AccordionHeader
                              onClick={() => handleOpenPlantFarming(2)}
                              className={`border-b-0 transition-colors ${
                                openPlantFarming === 2
                                  ? "text-green-400 hover:!text-green-900"
                                  : ""
                              }`}
                            >
                              Hoạt động làm đất
                            </AccordionHeader>
                            <AccordionBody className="pt-0 text-base font-normal">
                              <section>
                                {plantFarming.cultivationActivities.map(
                                  (cultivationActivities, index) => (
                                   
                                    <div key={index}>
                                      <Button
                                        key={index}
                                        className="m-1"
                                        style={{ backgroundColor: "#A5DD9B" }}
                                        onClick={() => {
                                          handleOpenCultivationActivities();
                                          setSelectData(cultivationActivities);
                                        }}
                                      >
                                        {cultivationActivities.name}
                                      </Button>
                                      
                                    </div>
                                  )
                                )}
                                {openDialogCultivationActivities && (
                                        <DialogDefault
                                          data={selectData}
                                          isOpen={
                                            openDialogCultivationActivities
                                          }
                                          handleClose={
                                            handleOpenCultivationActivities
                                          }
                                        />
                                      )}
                              </section>
                            </AccordionBody>
                          </Accordion>
                          <Accordion
                            open={openPlantFarming === 3}
                            className="mb-2 rounded-lg border border-blue-gray-100 px-4"
                          >
                            <AccordionHeader
                              onClick={() => handleOpenPlantFarming(3)}
                              className={`border-b-0 transition-colors ${
                                openPlantFarming === 3
                                  ? "text-green-400 hover:!text-green-900"
                                  : ""
                              }`}
                            >
                              Hoạt động gieo trồng
                            </AccordionHeader>
                            <AccordionBody className="pt-0 text-base font-normal">
                              <section>
                                <Button
                                  className="m-1"
                                  style={{ backgroundColor: "#A5DD9B" }}
                                  onClick={() => {
                                    handleOpenPlantingActivity();
                                  }}
                                >
                                  {plantFarming.plantingActivity.density}
                                </Button>
                                {openDialogPlantingActivity && (
                                  <DialogDefault
                                    data={plantFarming.plantingActivity}
                                    isOpen={openDialogPlantingActivity}
                                    handleClose={handleOpenPlantingActivity}
                                  />
                                )}
                              </section>
                            </AccordionBody>
                          </Accordion>
                          <Accordion
                            open={openPlantFarming === 4}
                            className="mb-2 rounded-lg border border-blue-gray-100 px-4"
                          >
                            <AccordionHeader
                              onClick={() => handleOpenPlantFarming(4)}
                              className={`border-b-0 transition-colors ${
                                openPlantFarming === 4
                                  ? "text-green-400 hover:!text-green-900"
                                  : ""
                              }`}
                            >
                              Hoạt động bón phân
                            </AccordionHeader>
                            <AccordionBody className="pt-0 text-base font-normal">
                              <section>
                                {plantFarming.fertilizationActivities.map(
                                  (fertilizationActivities, index) => (
                                    <div key={index}>
                                      <Button
                                        className="m-1"
                                        style={{ backgroundColor: "#A5DD9B" }}
                                        onClick={() => {
                                          handleOpenFertilizationActivities();
                                          setDataFertilizationActivities(
                                            fertilizationActivities
                                          );
                                        }}
                                      >
                                        {
                                          fertilizationActivities.fertilizationTime
                                        }
                                      </Button>
                                    </div>
                                  )
                                )}
                                {openDialogFertilizationActivities && (
                                  <DialogDefault
                                    data={dataFertilizationActivities}
                                    isOpen={openDialogFertilizationActivities}
                                    handleClose={
                                      handleOpenFertilizationActivities
                                    }
                                  />
                                )}
                              </section>
                            </AccordionBody>
                          </Accordion>
                          <Accordion
                            open={openPlantFarming === 5}
                            className="mb-2 rounded-lg border border-blue-gray-100 px-4"
                          >
                            <AccordionHeader
                              onClick={() => handleOpenPlantFarming(5)}
                              className={`border-b-0 transition-colors ${
                                openPlantFarming === 5
                                  ? "text-green-400 hover:!text-green-900"
                                  : ""
                              }`}
                            >
                              Phòng ngừa sâu bệnh
                            </AccordionHeader>
                            <AccordionBody className="pt-0 text-base font-normal">
                              <section>
                                {plantFarming.pestAndDiseaseControlActivities.map(
                                  (pestAndDiseaseControlActivities) => (
                                    <>
                                      <Button
                                        className="m-1"
                                        style={{ backgroundColor: "#A5DD9B" }}
                                        onClick={() => {
                                          handleOpenPestAndDiseaseControlActivities();
                                          setDataPestAndDiseaseControlActivities(
                                            pestAndDiseaseControlActivities
                                          );
                                        }}
                                      >
                                        {pestAndDiseaseControlActivities.name}
                                      </Button>
                                    </>
                                  )
                                )}
                                {openDialogPestAndDiseaseControlActivities && (
                                  <DialogDefault
                                    data={dataPestAndDiseaseControlActivities}
                                    isOpen={
                                      openDialogPestAndDiseaseControlActivities
                                    }
                                    handleClose={
                                      handleOpenPestAndDiseaseControlActivities
                                    }
                                  />
                                )}
                              </section>
                            </AccordionBody>
                          </Accordion>
                        </>
                      </section>
                    </AccordionBody>
                  </Accordion>
                </>
              ))}
            </section>
          </>
        )}
        {isLoadingPlantFarmById && <Loading />}
        <Footer />
      </>
    </section>
  );
};

export default PlantRecommendDetail;
