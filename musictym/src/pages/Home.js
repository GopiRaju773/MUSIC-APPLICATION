import React, { useEffect, useState } from 'react'
import Album from '../components/Album'
import axios from 'axios'
function Home() {
  const [tollywood,setTollywood] = useState([]);
  const [bollywood,setBollywood] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result1 = await axios.get('http://localhost:3002/tollywood'); 
        setTollywood(result1.data);
        const result2 = await axios.get('http://localhost:3002/bollywood'); 
        setBollywood(result2.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className='h-10/12 overflow-y-scroll ' >
      <div className=' p-8'>
        <div className='w-full md:w-2/3 gap-5 md:gap-0 flex md:flex-row flex-col items-center justify-between'>
            <input type='search' placeholder='search here for songs' className='w-full md:w-1/2 p-2 bg-black opacity-50 rounded-md text-white'/>
            <div className='flex w-full md:w-1/3 gap-10'>
              <div className='w-1/2 md:w-1/3 flex items-center justify-center p-2 bg-indigo-200 rounded-md cursor-pointer'>Popular</div>
              <div className='w-1/2 md:w-1/3 flex items-center justify-center p-2 bg-indigo-200 rounded-md cursor-pointer'>Favorite</div>
            </div>
        </div>
        <div className='flex flex-wrap flex-col py-10 gap-4 '>
          <div className='text-2xl md:text-4xl font-bold lobster-regular '>Tollywood melodies</div>
          <div className='w-full overflow-x-scroll'>
            {tollywood.length !==0 && 
              <div className='flex gap-10 w-[3000px] h-full'>
              {tollywood.map((movie,index)=>{
                return(
                  <Album key={index} movie={movie}/>
                )
              })}
              </div>
            }
          </div>
          <div className='text-2xl md:text-4xl font-bold lobster-regular my-10'>Bollywood melodies</div>
          <div className='w-full overflow-x-scroll'>
            {bollywood.length !==0 && 
              <div className='flex gap-10 w-[3000px] h-full'>
              {bollywood.map((movie,index)=>{
                return(
                  <Album key={index} movie={movie}/>
                )
              })}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home