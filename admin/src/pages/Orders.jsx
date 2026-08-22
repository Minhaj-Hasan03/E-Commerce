import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl,currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ Token }) => {
  const [orderData, setorderData] = useState([]);
  const [Select, setSelect] = useState("")


  const statusCheck = async (event,orderId)=>{
    if( !Token){return null }

    try {
      
      const response = await axios.post(backendUrl+"/api/order/status", {orderId:orderId, status:event.target.value}, {headers:{Token}} )
      
      if( response.data.success){
        fetchOrder();
      }
    } catch (error) {
      toast.error(error.message);
      
    }
  }

  

  const fetchOrder = async () => {
    if (!Token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { Token } },
      );
           


      if (response.data.success) {
        setorderData(response.data.order);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [Token]);

  return (
    <div>
      <h3>Order Of User</h3>

      <div>
        {orderData.map((order, index) => (
          <div className="shadow-md/50 shadow-gray-500  grid  grid-cols-1 sm:grid-cols-[.5fr_2fr_1fr] lg:grid-cols-[.5fr_2fr_1fr__1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700  " key={index}>
            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="ph-0.5" key={index}>
                        {item.name} X {item.quantity}{" "}
                        <span>{item.size}</span>{" "}
                      </p>
                    );
                  } else {
                    return (
                      <p className="ph-0.5" key={index}>
                        {item.name} X {item.quantity} <span>{item.size}</span>
                        ,{" "}
                      </p>
                    );
                  }
                })}
              </div>

              <p className="mt-3 mb-2 font-medium">{order.address.firstName + " " + order.address.lastName}</p>
              <div>
                <p className="">{order.address.street + ","}</p>
                <p >
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p >{order.address.phone}</p>
            </div>

            <div>
              <p className="text-sm sm:text-[15px]">Items:{order.items.length}</p>
              <p className="mt-3">Payment Method:{order.paymentMethod}</p>
              <p>Payment: {order.payment ?'Done':'Pending'}</p>

              <p>Date :{new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">{currency}{order.amount}</p>
            <select onChange={(e)=>{
             
              statusCheck(e,order._id)

              }} value={order.status}  className="p-3 font-semibold border outline-none border-orange-600 shadow-md/50 shadow-amber-500"   name="" id="">
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
