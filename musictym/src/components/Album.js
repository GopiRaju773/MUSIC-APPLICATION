import React from 'react'
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Album({movie}) {
  return (
    <Link to={`/movie/${movie._id}`} className='flex flex-col p-2 border-2 items-center gap-2 h-full w-[250px] rounded-md shadow-xl hover:cursor-pointer'>
        <img src={movie.posterurl} alt={movie.posterurl} className=''/>
        <div className='font-bold text-xl md:text-2xl w-full text-star'>{movie.name}</div>
        <div className='flex items-center justify-between w-full gap-4'>
            <div className='flex items-center gap-2'><FaEye /> {movie.views}</div> 
        </div>
    </Link>
  )
}

export default Album