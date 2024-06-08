import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Spinner,
} from "@material-tailwind/react";

import useProfile from "../Profile/useProfile";
import Avarta from "../Avarta/Avarta";
import Aos from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import { renderTypePlant } from "../../Utils/helpers";
const MAX_DESCRIPTION_LENGTH = 100; // Số ký tự tối đa bạn muốn hiển thị

const ListPlant = () => {
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
  } = useProfile({
    farmId,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(allPlant?.length / itemsPerPage);

  const currentPlants = allPlant?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div data-aos="fade-up" className="mx-auto pt-20">
        {isSuccessFarmInfo && (
          <>
            <Avarta data={farmInfo.images} />
            <section
              data-aos="fade-up"
              className="relative py-8 bg-blueGray-200"
            >
              <div className="container mx-auto px-4">
                <div className="text-center mt-1">
                  <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-1">
                    {farmInfo.name}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-1 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                    {farmInfo.address}
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
            </section>
          </>
        )}
        {isLoadingFarmInfo && <Spinner />}
        <section className="mx-auto pt-[4vh] px-8 mb-5 justify-center">
          <span className="orangeText">Danh sách cây trồng</span>
          <div className=" mx-auto grid flex justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {isSuccessPlant &&
              currentPlants?.map((card) => (
                <Card className="max-w-xs overflow-hidden mt-5">
                  <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="m-0 rounded-none"
                  >
                    <img
                      src={card.image}
                      alt="ui/ux review check"
                      className="h-48"
                    />
                  </CardHeader>
                  <CardBody>
                    <Typography variant="h6" color="blue-gray">
                      {card.name}
                    </Typography>
                    <Typography
                      variant="h8"
                      color="gray"
                      className="mt-2 font-normal"
                    >
                      {card.description.length > MAX_DESCRIPTION_LENGTH
                        ? `${card.description.substring(
                            0,
                            MAX_DESCRIPTION_LENGTH
                          )}...`
                        : card.description}
                    </Typography>
                  </CardBody>
                  <CardFooter className="flex items-center justify-between">
                    <Button
                      onClick={() => {
                        navigate(
                          `/farm/detail/${card.farmid}/plants/${card.id}`
                        );
                      }}
                    >
                      Chi tiết
                    </Button>
                    <Typography className="font-normal">
                      {renderTypePlant(card.type)}
                    </Typography>
                  </CardFooter>
                </Card>
              ))}

            {isLoadingPlant && <Spinner />}
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
        </section>
      </div>
    </>
  );
};

export default ListPlant;
