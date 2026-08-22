import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showsearch } = useContext(ShopContext);
  const [showfilter, setshowfilter] = useState(false);
  const [filterproducts, setfilterproducts] = useState([]);

  const [category, setcategory] = useState([]);
  const [subcatagory, setsubcatagory] = useState([]);
  const [sortType, setsortType] = useState("relavent");

 

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setcategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setcategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subcatagory.includes(e.target.value)) {
      setsubcatagory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setsubcatagory((prev) => [...prev, e.target.value]);
    }
  };

  const applyfilter = () => {
    let productcopy = products.slice();

    if(   search  ){
      
      
      
      productcopy = productcopy.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase() ) ) ;
    }

    if (category.length > 0) {
      productcopy = productcopy.filter((item) =>
        category.includes(item.category),
      );
    }

    if (subcatagory.length > 0) {
      productcopy = productcopy.filter((item) =>
        subcatagory.includes(item.subCategory),
      );
    }

    setfilterproducts(productcopy);
  };

  const sortporduct = () => {
    let ftcopy = filterproducts.slice();
    switch (sortType) {
      case "low-high":
        setfilterproducts(ftcopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setfilterproducts(ftcopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyfilter();
        break;
    }
  };

  useEffect(() => {
    applyfilter();
  }, [category, subcatagory, showsearch, search, products]);


  useEffect(()=>{
    sortporduct();
    
  }, [sortType])

  return (
    <div className="flex flex-col sm:flex-row  gap-1 sm:gap-10 pt-10 border-t border-gray-300">
      <div className="min-w-60">
        <p
          onClick={() => {
            setshowfilter(!showfilter);
          }}
          className="text-xl uppercase my-2 flex items-center cursor-pointer gap-2"
        >
          Filters
          <img
            className={`w-2 sm:hidden ${showfilter ? "rotate-90" : ""} `}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>
        <div
          className={`border border-gray-400 my-6 pl-3 py-3 ${showfilter ? "" : "hidden"}   sm:block`}
        >
          <p className="uppercase text-sm mb-3 font-bold  roboto-regular">
            Cattagories
          </p>
          <div className="flex flex-col text-sm font-light gap-2 text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Men"}
                onChange={toggleCategory}
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Women"}
                onChange={toggleCategory}
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Kids"}
                onChange={toggleCategory}
              />
              Kid
            </p>
          </div>
        </div>

        <div
          className={`border border-gray-400 my-6 pl-3 py-3 ${showfilter ? "" : "hidden"}  sm:block`}
        >
          <p className="uppercase text-sm mb-3 font-bold  roboto-regular">
            type
          </p>
          <div className="flex flex-col text-sm font-light gap-2 text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Topwear"}
                onChange={toggleSubCategory}
              />
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
              />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Winterwear"}
                onChange={toggleSubCategory}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTION"} />

          <select
            name=""
            id=""
            className="border-2 border-gray-300 text-xl px-2"
            onChange={(e) => setsortType(e.target.value)}
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterproducts.map((items, index) => (
            <ProductItem
              key={index}
              id={items._id}
              image={items.image}
              name={items.name}
              price={items.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
