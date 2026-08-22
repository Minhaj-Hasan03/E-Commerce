import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productid } = useParams(); // {productid} as name same as the app.jsx route file.
  const { products, currency , addToCart} = useContext(ShopContext);

  const [productData, setproductData] = useState(false);
  const [iimage, setiimage] = useState("");
  const [size, setsize] = useState("");//specific size of product

  const fetchproductdata = async () => {
    products.map((item) => {
      if (item._id === productid) {
        setproductData(item);
        setiimage(item.image[0]);

        return null;
      }
    });
  };

  useEffect(() => {
    fetchproductdata();
    window.scrollTo({
      top:0,
      behavior:"smooth" 
    })
  }, [productid, products]);

  return productData ? (
    <div className="transition-opacity duration-500 border-t-2 pt-10 ease-in opacity-100">
      {/*------- Product Data ------ */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          {/*------ Product Images------ */}
          <div className="flex  sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => {
                  setiimage(item);
                }}
                src={item}
                key={index}
                alt=""
                className=" w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>

          <div className="w-full sm:w-[80%]">
            <img src={iimage} className="w-full h-auto  " alt="" />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_dull_icon} className="w-3.5" alt="" />
            <p className="pl-2">{122}</p>
          </div>

          <p className="mt-5 font-medium sm:text-3xl text-2xl">
            {currency}
            {productData.price}
          </p>
          <p className="text-gray-500 md:w-4/5 mt-5">
            {productData.description}
          </p>

          <div className="flex flex-col my-8 gap-4">
            <p>Select size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setsize(item);
                  }}
                  className={`border border-gray-300 bg-gray-100 py-2 px-4 ${item === size ? "border-orange-500" : ""}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button onClick={()=>{addToCart(productData._id, size )}} className="bg-black text-white px-8 py-3 font-medium text-sm my-4 active:bg-gray-700 shadow-md/30">
            ADD TO CART
          </button>

          <hr className="sm:w-4/5 my-8" />
          <div className="flex flex-col text-gray-500 text-sm mt-5 gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/**Descriptin and review */}
      <div className="mt-20">
        <div className="flex">
          <b className="border border-gray-400 px-5 py-3 text-sm">
            Description
          </b>
          <p className="border border-gray-400 px-2 py-3 text-sm">
            Reviews(122)
          </p>
        </div>
        <div className="flex flex-col gap-4 border border-gray-400 text-sm text-gray-500 px-6 py-6">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>

      {/**relatded product */}
      <RelatedProducts category={productData.category} subcategory={productData.subcategory} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
