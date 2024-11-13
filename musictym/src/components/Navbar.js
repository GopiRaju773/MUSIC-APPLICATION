import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
  const [name,setName] = useState(null);
  useEffect(()=>{
    setName(localStorage.getItem('name'));
  },[])
  return (
    <div className='stciky top-0 flex p-3 justify-between items-center text-white'>
        <Link to='/' className='text-2xl font-bold'>Music Tym</Link>
        <div className='flex w-1/2 md:w-1/6 items-center'>
            {!name &&<div className='flex gap-2 w-2/3 '>
                <Link to='/login' className='flex p-1 md:p-2 bg-red-400 w-1/2 justify-center items-start font-semibold rounded-md hover:cursor-pointer'>Login</Link>
                <Link to='/signup' className='flex p-1 md:p-2 bg-red-400 w-1/2 justify-center items-start font-semibold rounded-md hover:cursor-pointer'>Signup</Link>
            </div>}
          </div>
          {name&&<div className=' w-2/5  text-center flex items-center justify-around'>
            <div className='text-2xl'>Welcome! {name}</div>
            <div onClick={()=>localStorage.removeItem('name')} className='flex p-1 md:p-2 text-md bg-red-400 w-1/5 justify-center items-start font-semibold rounded-md hover:cursor-pointer'>Logout</div>
          </div>}

    </div>
  )
}

export default Navbar