import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {

    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')

    const onSubmitHandler = async (e)=>{
        try {
            e.preventDefault();

            const response = await axios.post(backendUrl+'/api/user/admin', {email:Email,password:Password})
            if( response.data.success){
                setToken(response.data.token)
            }else{
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }

  return (
    <div className=' min-h-screen flex items-center justify-center w-full'>
        <div className='bg-white shadow-xl/30 rounded-lg px-7 py-6 max-w-md'>
            <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>

            <form onSubmit={onSubmitHandler}>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium mb-2 text-gray-700'>Email Address</p>
                    <input onChange={(e)=>{setEmail(e.target.value)}} value={Email} required className='rounded-md w-full px-3 py-2 border border-gray-300' type="email" placeholder='your@gmail.com' />
                </div>

                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium mb-2 text-gray-700'>Password</p>
                    <input onChange={(e)=>{setPassword(e.target.value)}} value={Password} required className='rounded-md w-full px-3 py-2 border border-gray-300' type="password" placeholder='Enter your password' />
                </div>


                <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type='submit'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login