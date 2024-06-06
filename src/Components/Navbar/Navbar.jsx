import React, { useState } from "react";
import "./navbar.css";
import { RxAccessibility } from "react-icons/rx";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Typography,
  MenuItem,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("navBar");

  // Function to toggle navBar
  const showNav = () => {
    setActive("navBar activeNavbar");
  };

  // Function to remove navBar
  const removeNavbar = () => {
    setActive("navBar");
  };

  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <section className="navBarSection">
      <header className="header flex">
        <div className="logoDiv">
          <a href="/" className="logo flex">
            <h1>
              <RxAccessibility className="icon" />
              Agritech.
            </h1>
          </a>
        </div>

        <div className={active}>
          <ul className="navLists flex">
            <li className="navItem">
              <a href="/" className="navLink">
                Trang chủ
              </a>
            </li>

            <li className="navItem">
              <a href="/farm" className="navLink">
                Nông trại
              </a>
            </li>

            {/* <li className="navItem">
              <a href="/news" className="navLink">
                Tin tức
              </a>
            </li>

            <li className="navItem">
              <a href="/about-us" className="navLink">
                Thông tin
              </a>
            </li> */}

            <button className="btn" onClick={handleOpen}>
              <a>Truy xuất</a>
            </button>
          </ul>

          <div onClick={removeNavbar} className="closeNavbar">
            <AiFillCloseCircle className="icon" />
          </div>
        </div>

        <div onClick={showNav} className="toggleNavbar">
          <TbGridDots className="icon" />
        </div>
      </header>
      <section>
        <Dialog size="xs" open={open} handler={handleOpen}>
          <DialogHeader className="justify-between">
            <div>
              <Typography variant="h5" color="blue-gray">
                Truy xuất trên mạng blockchain
              </Typography>
              <Typography color="gray" variant="paragraph">
                Bạn hãy chọn một trong hai các để truy xuất , sau đó nhập
                transaction hash hoặc project index tương ứng.
              </Typography>
            </div>
            <IconButton
              color="blue-gray"
              size="sm"
              variant="text"
              onClick={handleOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </DialogHeader>
          <DialogBody className="overflow-y-scroll !px-5">
            <div className="mb-6">
              <Typography
                variant="paragraph"
                color="blue-gray"
                className="py-3 font-semibold uppercase opacity-70"
              >
                Chọn một trong 2 cách
              </Typography>
              <ul className="mt-3 -ml-2 flex flex-col gap-1">
                <MenuItem className="mb-4 flex items-center justify-center gap-3 !py-4 shadow-md">
                  <img
                    src="https://docs.material-tailwind.com/icons/metamask.svg"
                    alt="metamask"
                    className="h-6 w-6"
                  />
                  <Typography
                    className="uppercase"
                    color="blue-gray"
                    variant="h6"
                    onClick={() => navigate(`/search/transaction-hash-query`)}
                  >
                    Transaction Hash
                  </Typography>
                </MenuItem>
                <MenuItem className="mb-1 flex items-center justify-center gap-3 !py-4 shadow-md">
                  <img
                    src="https://docs.material-tailwind.com/icons/coinbase.svg"
                    alt="coinbase"
                    className="h-6 w-6 rounded-md"
                  />
                  <Typography
                    className="uppercase"
                    color="blue-gray"
                    variant="h6"
                    onClick={() => navigate(`/search/index-query`)}
                  >
                    Project index
                  </Typography>
                </MenuItem>
              </ul>
            </div>
          </DialogBody>
        </Dialog>
      </section>
    </section>
  );
};

export default Navbar;
