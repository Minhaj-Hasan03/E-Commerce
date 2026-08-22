import React, { useContext } from 'react'
import {ShopContext} from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
const Orders = () => {

  const { currency, Token, backendUrl} = useContext(ShopContext)
  

  const [orderData, setorderData] = useState([])

  const loadOrderData = async ()=>{
      try {
          if(!Token){
            return null ;
          }

          const response = await axios.post(backendUrl+"/api/order/userorders", {}, {headers:{Token}})
          console.log(response.data);
          
          if(response.data.success){
            let allOrderItem = []
            response.data.orders.map((order)=>{
              order.items.map((item)=>{
                item['status'] = order.status
                item['payment'] = order.payment
                item['paymentMethod'] = order.paymentMethod
                item['date'] = order.date
                allOrderItem.push(item);
              })
            })
            setorderData(allOrderItem.reverse() );
          }

          

      } catch (error) {
        
        
        
      }
  }


  useEffect(() => {
    loadOrderData();
  }, [Token])
  
console.log(orderData);

  return (
    <div className='pt-16 border-t'>
      <div className='text-2xl'>
        <Title text1={'my'} text2={'orders'}/>
      </div>


      <div>
        {
          orderData.slice(1,4).map((item,index)=>(
            <div key={index} className='py-4  border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-center gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                    <p className='text-lg'>{currency}{item.price}</p>
                    <p>Quantity : {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-1'>Date : <span>{new Date(item.date).toDateString()}  </span> </p>
                  <p className='mt-1'>Payment : <span>{item.paymentMethod}  </span> </p>
                </div>
              </div>

              <div className='w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 bg-green-500 rounded-full'></p>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
                <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm border-gray-400'>Track Order</button>
              </div>
            </div>
   

          ))
        }
      </div>
    </div>
  )
}

export default Orders