import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import SearchTransactionHash from "../../Components/Traceanility/SearchTransactionHash";
import Footer from "../../Components/Footer/Footer";

const TransactionHashQuery = () => {
  return (
    <>
      <Navbar />
      <SearchTransactionHash />
      <Footer />
    </>
  );
};

export default TransactionHashQuery;
