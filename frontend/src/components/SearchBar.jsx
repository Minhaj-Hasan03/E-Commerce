import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import {assets} from '../assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {

    const [Visible, setVisible] = useState(false)
    const location = useLocation() ;

    const {search, setsearch, showSearch, setshowSearch} = useContext(ShopContext) ;
    useEffect(() => {
      
        if(location.pathname.includes('collection')){
            setVisible(true);
        }else{
            setVisible(false)
        }
      
    }, [location])
    

  return showSearch && Visible ?(
    <div className=' bg-gray-100 text-center border-t border-b border-gray-300'>
        <div className='rounded-full mx-2 inline-flex items-center justify-center px-5 py-3 my-4 border border-gray-400 w-3/4 sm:w-1/2'>
            <input className='outline-none flex-1 bg-inherit text-sm' value={search} onChange={(e)=>{setsearch(e.target.value)}} type="text" placeholder='Search' name="" id="" />
            <img className="w-4" src={assets.search_icon} alt="" />
        </div>
        <img onClick={()=>setshowSearch(false)} className='w-4 inline cursor-pointer' src={assets.cross_icon} alt="" />
    </div>
  ):null
}

export default SearchBar