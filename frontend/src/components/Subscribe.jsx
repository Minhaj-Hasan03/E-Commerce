import React from 'react'

const Subscribe = () => {

  const subscribehandel = (event)=>{
    event.preventDefault() ;
  }

  return (
    <div className='text-center'>
        <p className='text-3xl roboto-regular text-gray-800'>Subscribe now & get 20% off</p>
        <p className='text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, adipisci! Deserunt, illum? Ab, et recusandae!</p>
    
        <form onSubmit={
          subscribehandel 
        } action="" className='flex items-center border my-6 mx-auto w-full sm:w-1/2 pl-3 gap-3'>
            <input type="email" name="email" id=""  required className='outline-none flex-1 w-full' placeholder='Enter your email' />
            <button type='submit' className='bg-black text-white text-sm px-10 py-4 uppercase'>Subscribe</button>
        </form>
    </div>
  )
}

export default Subscribe