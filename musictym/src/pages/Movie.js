import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, Outlet, NavLink } from 'react-router-dom';
import { FaRegHeart } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";

import './style.css'
function Movie() {
    const [data,setData] = useState({});
    const {movieId} = useParams();
    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await axios.get(`http://localhost:3002/movies/${movieId}`); 
            setData(result.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
        fetchData();
    },[movieId]);
    
  return (
    <div id='moviepage' className='w-full justify-center flex items-center '> 
        {data && <div className='flex w-full p-10 gap-10 md:flex-row flex-col'>
            <div className='w-full md:w-1/3'>
                <img className='w-full rounded-2xl' src={data.posterurl} alt={data.posterurl}/>
            </div>
            <div className='flex w-full md:w-2/3 flex-col gap-2 '>
                <div className='text-4xl font-bold'>{data.name}</div>
                <div className='text-2xl font-bold'>{data.category}</div>
                <div className='h-2/3 w-full overflow-y-scroll gap-2 flex flex-col pb-12 my-2 md:pb-6'>
                    {data.songs && data.songs.map((song,index)=>{
                        return(
                            <NavLink id='a' to={`song/${song._id}`} key={index} className='p-2 bg-black opacity-40  text-white rounded-md hover:opacity-70 hover:cursor-pointer flex justify-between items-center '>
                                <div className=''>{song.name}</div>
                                <div id='b' className='hidden text-xl gap-6 p-2'>
                                    <FaRegHeart/>
                                    <CiShare2/>
                                </div>
                            </NavLink>
                        )
                    })}
                </div>
            </div>
        </div>}
        <Outlet/>
    </div>
  )
}

export default Movie