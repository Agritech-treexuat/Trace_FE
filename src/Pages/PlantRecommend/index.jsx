import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import PlantRecommendDetail from "../../Components/PlantRecommendDetail";

const PlantRecommend = () => {
  return (
    <>
      <Navbar/>
      <PlantRecommendDetail />
      <Footer />
    </>
  );
};

export default PlantRecommend;
