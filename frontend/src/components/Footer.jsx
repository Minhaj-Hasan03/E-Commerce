import React from 'react'
import {assets} from '../assets/assets'

const Footer = () => {

    const dateyear = new Date();
  return (
    <div>
        <div className='flex flex-col  sm:grid grid-cols-[3fr_1fr_1fr] gap-10 my-10 mt-40 text-sm'>
            <div>
                <img src={assets.logo} className='w-32 mb-5' alt="" />
                <p className='w-full md:w-2/3 text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quas quasi repellendus. Delectus dolor doloribus voluptatem earum, sint quas, minus explicabo, pariatur hic distinctio adipisci porro alias ab. Harum, consequatur.</p>
            </div>


            <div>
                <p className='text-xl roboto-regular mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>

            <div>
                <p className='text-xl roboto-regular mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+880-179848270</li>
                    <li>contact49@gmail.com</li>
                </ul>
            </div>
        </div>

        <div>
            <hr />
            <p className='py-5 text-md text-gray-700 text-center roboto-regular'>Copyright {dateyear.getFullYear()}@ forever.com - All Right Reserved.</p>
        </div>

    </div>
  )
}

export default Footer