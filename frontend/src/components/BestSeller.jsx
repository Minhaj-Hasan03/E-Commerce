import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'

const BestSeller = () => {

  const {products} = useContext(ShopContext)
  const [bestsell, setbestsell] = useState([]);

  useEffect(()=>{
    const bestproducts = products.filter((items)=>(items.bestseller))
    setbestsell(products.slice(0,5) ) ;
  },[products])

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl '>
            <Title  text1={'BEST'} text2={'SELLER'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm  md:text-base text-gray-700'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga eos quaerat molestias explicabo ullam dolore.
            </p>
        </div>


        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                bestsell.map((items, index)=>(
                    <ProductItem key={index} id={items._id} image={items.image} name= {items.name} price= {items.price} />
                ))
            }
        </div>
    </div>
  )
}

export default BestSeller