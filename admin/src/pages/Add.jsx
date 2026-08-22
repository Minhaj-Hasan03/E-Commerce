import React, { useState } from "react";
import { assets } from "../assets/assets.js";
import axios from 'axios'
import {backendUrl} from '../App'
import { toast } from "react-toastify";

const Add = ({Token}) => {
  const [image1, setimage1] = useState(false);
  const [image2, setimage2] = useState(false);
  const [image3, setimage3] = useState(false);
  const [image4, setimage4] = useState(false);

  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("Men");
  const [subcategory, setsubcategory] = useState("Topwear");
  const [bestseller, setbestseller] = useState(false);
  const [sizes, setsizes] = useState([]);
  
  const onSubmitHandler = async (e)=>{
      e.preventDefault();

      try {

        const formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("subcategory", subcategory);
        formData.append("bestseller", bestseller);
        formData.append("sizes", JSON.stringify(sizes));


        image1 && formData.append("image1", image1 );
        image2 && formData.append("image2", image2 );
        image3 && formData.append("image3", image3 );
        image4 && formData.append("image4", image4 );




        const response = await axios.post( backendUrl + "/api/product/add", formData, {headers:{Token}} )
        console.log(response.data);
        
        
        if( response.data.success ){
          toast.success(response.data.message );

          setname('');
          setdescription('');
          setprice('');
          
          
          setsizes([]);

          setimage1(false);
          setimage2(false);
          setimage3(false);
          setimage4(false);
        }else{
          toast.error(response.data.message);
        }

      } catch (error) {
        
      }
  }

  return (
    <div className=" ">
      <div className="">
        <form onSubmit={onSubmitHandler} action="" className="flex flex-col w-full items-start gap-3">
          <div>
            <p>Upload Image</p>

            <div className="flex gap-2 mt-2">
              <label htmlFor="image1">
                <img
                  className="w-20"
                  src={
                    !image1 ? assets.upload_area : URL.createObjectURL(image1)
                  }
                  alt=""
                />
                <input
                  onChange={(e) => setimage1(e.target.files[0])}
                  type="file"
                  id="image1"
                  hidden
                />
              </label>

              <label htmlFor="image2">
                <img
                  className="w-20"
                  src={
                    !image2 ? assets.upload_area : URL.createObjectURL(image2)
                  }
                  alt=""
                />
                <input
                  onChange={(e) => setimage2(e.target.files[0])}
                  type="file"
                  id="image2"
                  hidden
                />
              </label>

              <label htmlFor="image3">
                <img
                  className="w-20"
                  src={
                    !image3 ? assets.upload_area : URL.createObjectURL(image3)
                  }
                  alt=""
                />
                <input
                  onChange={(e) => setimage3(e.target.files[0])}
                  type="file"
                  id="image3"
                  hidden
                />
              </label>

              <label htmlFor="image4">
                <img
                  className="w-20"
                  src={
                    !image4 ? assets.upload_area : URL.createObjectURL(image4)
                  }
                  alt=""
                />
                <input
                  onChange={(e) => setimage4(e.target.files[0])}
                  type="file"
                  id="image4"
                  hidden
                />
              </label>
            </div>
          </div>

          <div className="mt-2 w-full">
            <p className="mb-2">Product name</p>
            <input
              onChange={(e) => setname(e.target.value)}
              value={name}
              className="w-full max-w-125 outline-none border border-gray-400 rounded px-2 py-2"
              type="text"
              placeholder="Type here"
              required
            />
          </div>

          <div className="mt-3 w-full">
            <p className="mb-2">Product description</p>
            <textarea
              onChange={(e) => setdescription(e.target.value)}
              value={description}
              className="border max-w-125 w-full outline-none border-gray-400 rounded px-4 py-3"
              placeholder="Write content here"
              required
              name=""
              id=""
            ></textarea>
          </div>

          <div className="mt-2 flex flex-col sm:flex-row gap-2 sm:gap-8 w-full items-center">
            <div className="mt-3">
              <p className="mb-2">Product category</p>
              <select
                onChange={(e) => setcategory(e.target.value)}
                className="w-full border border-gray-400 rounded px-2 py-2"
                name=""
                id=""
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div className="mt-3">
              <p className="mb-2">Sub category </p>
              <select
                onChange={(e) => setsubcategory(e.target.value)}
                className="w-full border border-gray-400 rounded px-2 py-2"
                name=""
                id=""
              >
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>

            <div className="mt-3">
              <p className="mb-2">Price</p>
              <input
                onChange={(e) => setprice(e.target.value)}
                value={price}
                className="sm:w-30 w-full border border-gray-400 rounded px-2 py-2"
                type="number"
                name=""
                id=""
                placeholder="25"
                required
              />
            </div>
          </div>

          <div className="mt-3">
            <p className="mb-2">Product Sizes</p>
            <div className="flex gap-8  ">
              <div
                className=""
                onClick={() =>
                  setsizes((prev) =>
                    prev.includes("S")
                      ? prev.filter((item) => item !== "S")
                      : [...prev, "S"],
                  )
                }
              >
                <p
                  className={`${sizes.includes("S") ? "bg-pink-100 " : "bg-slate-200 "}cursor-pointer px-3 py-1`}
                >
                  S
                </p>
              </div>

              <div
                className=""
                onClick={() =>
                  setsizes((prev) =>
                    prev.includes("M")
                      ? prev.filter((item) => item !== "M")
                      : [...prev, "M"],
                  )
                }
              >
                <p
                  className={`${sizes.includes("M") ? "bg-pink-100 " : "bg-slate-200 "}cursor-pointer px-3 py-1`}
                >
                  M
                </p>
              </div>

              <div
                className=""
                onClick={() =>
                  setsizes((prev) =>
                    prev.includes("L")
                      ? prev.filter((item) => item !== "L")
                      : [...prev, "L"],
                  )
                }
              >
                <p
                  className={`${sizes.includes("L") ? "bg-pink-100 " : "bg-slate-200 "}cursor-pointer px-3 py-1`}
                >
                  L
                </p>
              </div>

              <div
                className=""
                onClick={() =>
                  setsizes((prev) =>
                    prev.includes("XL")
                      ? prev.filter((item) => item !== "XL")
                      : [...prev, "XL"],
                  )
                }
              >
                <p
                  className={`${sizes.includes("XL") ? "bg-pink-100 " : "bg-slate-200 "}cursor-pointer px-3 py-1`}
                >
                  XL
                </p>
              </div>

              <div
                className=""
                onClick={() =>
                  setsizes((prev) =>
                    prev.includes("XXL")
                      ? prev.filter((item) => item !== "XXL")
                      : [...prev, "XXL"],
                  )
                }
              >
                <p
                  className={`${sizes.includes("XXL") ? "bg-pink-100 " : "bg-slate-200 "}cursor-pointer px-3 py-1`}
                >
                  XXl
                </p>
              </div>
            </div>
          </div>

          <div
            className="mt-3 flex gap-2"
            
          >
            <input onClick={() => setbestseller((prev) => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
            <label className="cursor-pointer" htmlFor="bestseller">
              Add to bestseller
            </label>
          </div>

          <button
            className="active:scale-95 mt-3 bg-black text-white px-5 py-2 w-28  rounded"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
