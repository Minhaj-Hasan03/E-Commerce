import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [select, setselect] = useState("cod");
  const {
    navigate,
    Token,
    backendUrl,
    cartItems,
    setcartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setformData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items),
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (select) {
        //api call for cash on delivery
        case 'cod':
          const response = await axios.post(backendUrl+"/api/order/place", orderData, {headers:{Token}})
          console.log(response.data.message);
          
          if(response.data.success){
            setcartItems({});
            navigate('/order')
            toast.success(response.data.message)
          }else{toast.error(error.message)}
          break;

        default:
          break;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row sm:pt-14 pt-5 gap-5 min-h-[80vh] border-t justify-between"
    >
      {/* Left side */}
      <div className=" flex flex-col max-w-120 w-full gap-4">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"delivery"} text2={"information"} />
        </div>

        <div className="flex gap-4">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 py-1.5 px-3.5 w-full rounded"
            type="text"
            placeholder="First name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 py-1.5 px-3.5 w-full rounded"
            type="text"
            placeholder="Last name"
          />
        </div>

        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border border-gray-300 py-1.5 px-3.5 w-full rounded"
          type="text"
          placeholder="Email address"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="border border-gray-300 py-1.5 px-3.5 w-full rounded"
          type="text"
          placeholder="Street"
        />

        <div className="flex gap-4">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-300 py-1.5 px-3.5 w-full rounded"
            type="text"
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="border border-gray-300 py-1.5 px-3.5 w-full rounded"
            type="text"
            placeholder="State"
          />
        </div>

        <div className="flex gap-4">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="border border-gray-300 py-1.5 px-3.5 w-full rounded hide-spin-button"
            type="number"
            placeholder="Zipcode"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border border-gray-300 py-1.5 px-3.5 w-full rounded"
            type="text"
            placeholder="Country"
          />
        </div>

        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 py-1.5 px-3.5 w-full rounded hide-spin-button"
          type="number"
          placeholder="Phone"
        />
      </div>

      {/*Right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"payment"} text2={"Method"} />

          {/*Payment method  */}
          <div className="flex flex-col lg:flex-row gap-3">
            <div
              onClick={() => {
                setselect("stripe");
              }}
              className="flex items-center gap-3 p-2 px-3 border border-gray-300 cursor-pointer  "
            >
              <p
                className={`min-w-3.5 h-3.5 border border-transparent rounded-full ${select === "stripe" ? "bg-green-600" : ""}`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>

            <div
              onClick={() => {
                setselect("razorpay");
              }}
              className="flex items-center gap-3 p-2 px-3 border border-gray-300 cursor-pointer  "
            >
              <p
                className={`min-w-3.5 h-3.5 border border-transparent  rounded-full ${select === "razorpay" ? "bg-green-600" : ""}`}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>

            <div
              onClick={() => {
                setselect("cod");
              }}
              className="flex items-center gap-3 p-2 px-3 border border-gray-300 cursor-pointer  "
            >
              <p
                className={`min-w-3.5 h-3.5 border border-transparent rounded-full ${select === "cod" ? "bg-green-600" : ""}`}
              ></p>
              <p className="uppercase text-sm text-gray-500 font-medium mx-4">
                Cash on delivery
              </p>
            </div>
          </div>
          <div className="text-start w-full mt-8">
            <button
              type="submit"
              className="active:scale-110  shadow-xl bg-black text-white px-16 py-3 text-sm uppercase"
            >
              Place order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
