import React, { useEffect, useState } from 'react'
import AudioPlayer from 'react-h5-audio-player';
import axios from 'axios'
import {useParams} from 'react-router-dom'
import 'react-h5-audio-player/lib/styles.css';
function MusicBar() {
    const {movieId,songId} = useParams();
    const [data,setData] = useState({});
    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await axios.get(`http://localhost:3002/movie/${movieId}/song/${songId}`); 
            setData(result.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
        fetchData();
    },[songId,movieId]);
  return (
    <div className='fixed bottom-0 w-full'>
        <AudioPlayer autoPlay src={data.url} className='audio' onPlay={e => console.log("onPlay")} />
    </div>
  )
}

export default MusicBar