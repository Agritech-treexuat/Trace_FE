import React from "react";
import Footer from "../../Components/Footer/Footer";
import Main from "../../Components/Main/Main";
import Navbar from "../../Components/Navbar/Navbar";
import Search from "../../Components/Search/Search";
import useListFarm from "../../Components/Farm/useListFarm";
import { useParams } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
const Home = () => {
  const projectId = useParams().projectId;
  const { allFarm, isSuccessAllFarm, isLoadingAllFarm } = useListFarm();
  return (
    <>
      <Navbar />
      <Search projectId={projectId} />
      {isSuccessAllFarm && <Main farm={allFarm} />}{isLoadingAllFarm && <Spinner /> }
      
      <Footer />
    </>
  );
};

export default Home;
