import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import Token from "../App";

const List = ({ Token }) => {
  const [list, setlist] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.success) {
        setlist(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeList = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { Token } },
      );

      if( response.data.success){
        toast.success(response.data.message);
        await fetchList();
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div>
        {/* List Table Title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr]   items-center py-1 px-2 border-none bg-gray-300 text-sm ">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/*Product List */}
        {list.map((item, index) => (
          <div
            className=" grid grid-cols-[1fr_3fr_1fr] gap-2 md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 "
            key={index}
          >
            <img className="w-12" src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {"$"}
              {item.price}
            </p>
            <p onClick={()=>{removeList(item._id)}} className=" text-right md:text-center cursor-pointer text-lg">
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
