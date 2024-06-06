import React, { useEffect } from "react";
import "./main.css";
import farm1 from "../../Assets/Image/farm1.jpg";
import { BiCurrentLocation } from "react-icons/bi";
import Aos from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

const Main = ({ farm }) => {
  const MAX_DESCRIPTION_LENGTH = 100; // Số ký tự tối đa bạn muốn hiển thị
  const navigate = useNavigate();
  // Create a react hook to add aa scroll animation
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <section className="main container section">
      <div className="secTitle">
        <h3 className="title">{/* List Farm */}</h3>
      </div>

      <div className="secContent grid">
        {farm.slice(0, 6).map((data, index) => {
          return (
            <div data-aos="fade-up" key={index} className="singleDestination">
              {/*Here it will return single id from the map array*/}

              <div className="imageDiv">
                <img src={farm1} alt={data.roles} />
              </div>

              <div className="cardInfo">
                <h4 className="destTitle">{data.name}</h4>
                <span className="continent flex">
                  <BiCurrentLocation className="icon" />
                  <span className="name">{data.address}</span>
                </span>

                <div className="fees flex">
                    <div className="grade">
                      {/* <span>
                        {grade}
                        <small></small>
                      </span> */}
                    </div>

                    {/* <div className="quantity">
                      <h5>{quantity}</h5>
                    </div> */}
                  </div>

                <div className="desc">
                  <p>{data.description.length > MAX_DESCRIPTION_LENGTH
                    ? `${data.description.substring(
                        0,
                        MAX_DESCRIPTION_LENGTH
                      )}...`
                    : data.description}</p>
                </div>

                <button  onClick={() => navigate(`/farm/detail/${data.id}`)} className="btn flex">Chi tiết</button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Main;
