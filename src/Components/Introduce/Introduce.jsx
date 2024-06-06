import React, { useState } from "react";
import "./introduce.css";
import image from "../../Assets/Image/farm4.jpg";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { MdOutlineArrowDropDown, MdCancel, MdAnalytics } from "react-icons/md";
import { HiShieldCheck } from "react-icons/hi";

const data = [
  {
    icon: <HiShieldCheck />,
    heading: "Best interest rates on the market",
    detail:
      "Exercitation in fugiat est ut ad cupidate it in cupidatat occaecat ut occaecat",
  },
  {
    icon: <MdCancel />,
    heading: "Prevent unstable prices",
    detail:
      "Exercitation in fugiat est ut ad cupidate it in cupidatat occaecat ut occaecat",
  },
  {
    icon: <MdAnalytics />,
    heading: "Best price on the market",
    detail:
      "Exercitation in fugiat est ut ad cupidate it in cupidatat occaecat ut occaecat",
  },
];

const Introduce = () => {
  return (
    <section className="v-wrapper">
      <div className="paddings innerWidth flexCenter v-container">
        {/* left side */}
        <div className="v-left">
          <div className="image-container">
            <img src={image} alt="" />
          </div>
        </div>

        {/* right side */}
        <div className="flexColStart v-right">
          <span className="orangeText">Về chúng tôi</span>
          <span className="primaryText">Value We Give to You</span>
          <span className="secondaryText">
            We always ready to help by providding the best services for you.
            <br />
            We belive a good blace to live can make your life better.
          </span>

          <Accordion
            className="accordion"
            allowMultipleExpanded={false}
            preExpanded={[0]}
          >
            {data.map((item, i) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const [className, setClassName] = useState(null);
              return (
                <AccordionItem
                  className={`accordionItem ${className}`}
                  key={i}
                  uuid={i}
                >
                  <AccordionItemHeading>
                    <AccordionItemButton className="flexCenter accordionButton">
                      <AccordionItemState>
                        {({ expanded }) =>
                          expanded
                            ? setClassName("expanded")
                            : setClassName("collapsed")
                        }
                      </AccordionItemState>

                      <div className="flexCenter icon1">{item.icon}</div>
                      <span className="primaryText">{item.heading}</span>
                      <div className="flexCenter icon1">
                        <MdOutlineArrowDropDown size={20} />
                      </div>
                    </AccordionItemButton>
                  </AccordionItemHeading>

                  <AccordionItemPanel>
                    <p className="secondaryText">{item.detail}</p>
                  </AccordionItemPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Introduce;
