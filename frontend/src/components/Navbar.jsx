import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setvisible] = useState(false);
  const {
    setshowSearch,
    navigate,
    getCartCount,
    setToken,
    Token,
    setcartItems,
  } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
    setcartItems({});
  };

  return (
    <div>
      {" "}
      {/*className="sticky top-0 z-100 overflow-hidden"  */}
      <div className="  flex items-center justify-between py-5 font-medium ">
        <Link to="/">
          <img src={assets.logo} className="w-36" alt="" />
        </Link>

        <ul className="sm:flex gap-5 text-gray-700 text-sm hidden">
          <NavLink
            Token={Token}
            to="/"
            className="flex flex-col gap-1 items-center "
          >
            <p className="uppercase">Home</p>
            <hr className="w-2/4 h-[1.5px] border-none bg-gray-600 hidden " />
          </NavLink>

          <NavLink
            Token={Token}
            to="/collection"
            className="flex flex-col gap-1 items-center "
          >
            <p className="uppercase">Collection</p>
            <hr className="w-2/4 h-[1.5px] border-none bg-gray-600 hidden" />
          </NavLink>

          <NavLink
            Token={Token}
            to="/About"
            className="flex flex-col gap-1 items-center "
          >
            <p className="uppercase">About</p>
            <hr className="w-2/4 h-[1.5px] border-none bg-gray-600 hidden" />
          </NavLink>

          <NavLink to="/contact" className="flex flex-col gap-1 items-center ">
            <p className="uppercase">Contact</p>
            <hr className="w-2/4 h-[1.5px] border-none bg-gray-600 hidden" />
          </NavLink>
        </ul>

        <div className="flex gap-5 items-center">
          <img
            onClick={() => setshowSearch(true)}
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt=""
          />

          <div className="group relative">
            <img
              onClick={() => {
                Token ? null : navigate("/login");
              }}
              src={assets.profile_icon}
              className="w-5 cursor-pointer"
              alt=""
            />
            <div className="group-hover:block hidden absolute right-0 dropdown-menu pt-4">
              {/*Drop Down menu */}
              {Token ? (
                <div className="flex flex-col gap-2 w-36 px-5 py-4 bg-slate-100  rounded ">
                  <p className="cursor-pointer hover:text-black  text-gray-500">
                    My Profile
                  </p>
                  <p
                    onClick={() => {
                      navigate("/order");
                    }}
                    className="cursor-pointer hover:text-black text-gray-500"
                  >
                    Orders
                  </p>
                  <p
                    onClick={() => {
                      logout();
                    }}
                    className="cursor-pointer hover:text-black text-gray-500"
                  >
                    Logout
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <Link to="/cart" className="relative mr-2">
            <img src={assets.cart_icon} className="w-5 cursor-pointer" alt="" />
            <p className="bg-black rounded-full absolute w-4 text-center leading-4 text-[10px]  text-white aspect-square right-[-5px] bottom-[-5px] ">
              {getCartCount()}
            </p>
          </Link>

          <img
            onClick={() => {
              setvisible(true);
            }}
            src={assets.menu_icon}
            className="w-5 cursor-pointer sm:hidden"
            alt=""
          />
        </div>

        <div
          className={` absolute right-0 bottom-0 top-0 bg-white overflow-hidden transition-all ${visible ? "w-full" : "w-0"}`}
        >
          <div className="flex flex-col text-gray-600">
            <div
              className="cursor-pointer flex items-center gap-4 p-3"
              onClick={() => setvisible(false)}
            >
              <img
                src={assets.dropdown_icon}
                className="h-5 rotate-180"
                alt=""
              />
              <p>Back</p>
            </div>

            <div className="py-5">
              <NavLink
                onClick={() => {
                  setvisible(false);
                }}
                to="/"
                className="flex  items-center"
              >
                <p className="text-[4vw] lg:text-[2vw] uppercase border-b-1 border-t  w-full p-2 hover:bg-black hover:text-white">
                  Home
                </p>
              </NavLink>

              <NavLink
                onClick={() => {
                  setvisible(false);
                }}
                to="/collection"
                className="flex  items-center"
              >
                <p className="text-[4vw] lg:text-[2vw] uppercase border-b-1  w-full p-2  hover:bg-black hover:text-white">
                  Collection
                </p>
              </NavLink>

              <NavLink
                onClick={() => {
                  setvisible(false);
                }}
                to="/about"
                className="flex  items-center"
              >
                <p className="text-[4vw] lg:text-[2vw] uppercase border-b-1   w-full p-2  hover:bg-black hover:text-white">
                  About
                </p>
              </NavLink>

              <NavLink
                onClick={() => {
                  setvisible(false);
                }}
                to="/contact"
                className="flex  items-center"
              >
                <p className="text-[4vw] lg:text-[2vw] uppercase border-b-1   w-full p-2  hover:bg-black hover:text-white">
                  Contact
                </p>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
