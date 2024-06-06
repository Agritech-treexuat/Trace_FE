import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Introduce from "../../Components/Introduce/Introduce";
import Contact from "../../Components/Contact/Contact";
import Footer from "../../Components/Footer/Footer";

const About = () => {
  return (
    <div>
      <Navbar />
      <Introduce />
      <Contact />
      <Footer/>
    </div>
  );
};

export default About;
