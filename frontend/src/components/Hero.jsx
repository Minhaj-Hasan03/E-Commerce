import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border-gray-400 border">
      {/*left */}
      <div className="flex items-center justify-center w-full sm:w-1/2 py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2 uppercase">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">our bestsellers</p>
          </div>
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">Latest Arrivals</h1>
          <div className="flex items-center gap-2 uppercase">
            <p className="font-medium text-sm md:text-base">shop now</p>
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          </div>
        </div>
      </div>

      <img src={assets.hero_img} className="w-full sm:w-1/2" alt="" />
    </div>
  );
};

export default Hero;
