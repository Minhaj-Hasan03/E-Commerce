import React from "react";
import Title from "../components/Title";
import Subscribe from "../components/Subscribe";
import { assets } from "../assets/assets";
const Contact = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-10 border-t">
        <Title text1={"Contact"} text2={"Us"} />
      </div>

      <div className="flex flex-col md:flex-row gap-10 my-10 mb-28">
        <img className="w-full md:max-w-[450px]" src={assets.contact_img} alt="" />
        <div className="flex flex-col items-start gap-6 justify-center">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-400">
            54709 Willms Station
            <br />
            Suite 350, Washington, USA
          </p>
          <p className="text-gray-400">
            Tel: (415) 555-0132 <br />
            Email: admin@forever.com
          </p>
          <p className="font-semibold text-xl text-gray-600">Careers at Forever</p>
          <p className="text-gray-400">Learn more about our teams and job openings.</p>
          <button className="hover:bg-black hover:text-white px-8 py-4 border transition-all duration-500">Explore Jobs</button>
        </div>
      </div>

      <Subscribe/>
    </div>
  );
};

export default Contact;
