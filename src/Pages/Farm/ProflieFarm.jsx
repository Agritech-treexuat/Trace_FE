import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import ProfileFarm from "../../Components/Profile/Profile";
const ProflieFarm = () => {
  return (
    <div className="layout-proflie-farm">
      <div className="white-gradient">
        <Navbar />
        <ProfileFarm />
        <Footer />
      </div>
    </div>
  );
};

export default ProflieFarm;
