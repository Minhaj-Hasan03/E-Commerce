import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [CurrentState, setCurrentState] = useState("Login");
  const { Token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (CurrentState === "Sign up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });

        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          setToken(response.data.token);
          setname("");
          setemail("");
          setpassword("");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          setToken(response.data.token);
          
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    
    if( Token ){
      navigate('/');
    }
    
  }, [Token])
  

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center mt-14 m-auto w-[90%] sm:max-w-96 text-gray-800 gap-4"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{CurrentState}</p>
        <hr className="border-none w-8 bg-gray-800 h-[1.5px]" />
      </div>

      {CurrentState === "Login" ? (
        ""
      ) : (
        <input
          onChange={(e) => setname(e.target.value)}
          value={name}
          required
          className="roboto-regular border border-gray-700 px-3 py-2 w-full "
          type="text"
          placeholder="Name"
        />
      )}
      <input
        onChange={(e) => setemail(e.target.value)}
        value={email}
        className="roboto-regular border border-gray-700 px-3 py-2 w-full "
        type="email"
        placeholder="Email"
        required
      />
      <input
        onChange={(e) => setpassword(e.target.value)}
        value={password}
        className="roboto-regular border border-gray-700 px-3 py-2 w-full "
        type="password"
        name=""
        id=""
        required
        placeholder="Password"
      />

      <div className="w-full flex justify-between items-center text-sm mt-[-8px] ">
        <p>Forgot your password?</p>
        {CurrentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign up")}
            className="cursor-pointer"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>

      <button className="bg-black hover:rounded-full active:scale-95 transition-normal duration-initial text-white roboto-regular px-8 py-3 font-light mt-2">
        {CurrentState === "Login" ? "Sign in" : "Sign up"}
      </button>
    </form>
  );
};

export default Login;
