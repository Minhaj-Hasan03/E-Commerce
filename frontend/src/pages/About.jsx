import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import Subscribe from "../components/Subscribe";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"about"} text2={"us"} />
      </div>

      <div className="flex flex-col sm:flex-row my-8 gap-16">
        <img
          className="w-full sm:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 text-gray-600 text-sm  w-2/4">
          <p>
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>
          <p>
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>
          <b>Our Mission</b>
          <p>
            Our mission at Forever is to empower customers with choice,
            convenience, and confidence. We're dedicated to providing a seamless
            shopping experience that exceeds expectations, from browsing and
            ordering to delivery and beyond.
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"Why"} text2={"choose us"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20 ">
        <div className="border px-10 py-8 md:px-16 md:py-20 flex flex-col gap-6 border-gray-400">
          <b className="roboto-regular">Quality Assurance:</b>
          <p className="text-sm text-gray-500">
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>

        <div className="border px-10 py-8 md:px-16 md:py-20 flex flex-col gap-6 border-gray-400">
          <b className="roboto-regular">Convenience:</b>
          <p className="text-sm text-gray-500">
          With our user-friendly interface and hassle-free ordering process, shopping has never been easier.
          </p>
        </div>

        <div className="border px-10 py-8 md:px-16 md:py-20 flex flex-col gap-6 border-gray-400">
          <b className="roboto-regular">Exceptional Customer Service:</b>
          <p className="text-sm text-gray-500">
           Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>

      <Subscribe />
    </div>
  );
};

export default About;
