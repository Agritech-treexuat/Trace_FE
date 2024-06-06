import React, { useEffect, useState } from "react";
import "./search.css";
import video from "../../Assets/Video/video1.mp4";
import Aos from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import PROJECT from "../../Services/projectService";
const Search = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState("");
  const [errorSearchText, setErrorSearchText] = useState("");
  const handleChange = (event) => {
    setInputData(event.target.value);
  };
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const handleClick = async () => {
    try {
      const res = await PROJECT.getProjectByProjectId(inputData);
      console.log("res: ", res);
      if (res.status === 200) {
        setErrorSearchText("");
        navigate(`/results/${inputData}`);
      }
      if (res.response?.status === 400) {
        setErrorSearchText("Không có mã truy xuất này, kiểm tra lại !");
      }
      if (res.response?.status === 401) {
        setErrorSearchText("Hãy nhập mã truy xuất !");
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <section className="home">
      <div className="overlay"></div>
      <video
        className="video"
        src={video}
        muted
        autoPlay
        loop
        type="video/mp4"
      ></video>

      <div className="homeContent container">
        <div className="textDiv">
          <h1 data-aos="fade-up" className="homeTitle">
            Truy xuất nguồn gốc
          </h1>
        </div>
        <div className="searchDiv">
          <div className="relative w-full max-w-xl mx-auto bg-white rounded-full ">
            <input
              placeholder="Nhập mã code ..."
              className="rounded-full w-full h-16 bg-transparent py-2 pl-8 pr-32 outline-none border-2 border-gray-100 shadow-md hover:outline-none focus:ring-teal-200 focus:border-teal-200 text-black"
              type="text"
              name="query"
              id="query"
              value={inputData}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="absolute inline-flex items-center h-10 px-4 py-2 text-sm text-white transition duration-150 ease-in-out rounded-full outline-none right-3 top-3 bg-teal-600 sm:px-6 sm:text-base sm:font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              onClick={handleClick}
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
              Tra cứu
            </button>
            <div className="text-red-600 justify-center mt-2 ml-3 text-sm lg:text-base">
              {errorSearchText}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
