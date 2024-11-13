import React, { useState } from 'react'
import {ref, uploadBytesResumable, getDownloadURL}  from 'firebase/storage'
import {storage} from '../firebase-config';
import axios from 'axios'
function Upload() {
  const [uploading,setUploading] = useState(false);
  const [posterUploaded,setPosterUploaded] = useState(false);
  const [songsUploaded,setSongsUploaded] = useState(false);
  const [data,setData] = useState({
    posterImageUrl:"",
    movieTitle:"",
    songsName:[],
    songsURL:[]
  });
  const uploadPoster = (e)=>{
    setUploading(true);
    let poster = e.target.files[0];
    if (poster) {
        const imageRef = ref(storage, `songs/${data.movieTitle}/${poster.name}`);
        const uploadTask = uploadBytesResumable(imageRef, poster);
        uploadTask.on('state_changed',(snapshot) => {
              // setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              return;
          },(error) => {
                console.error('Error uploading image:', error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((posterURL) => {
                  setData(previous=>({
                    ...previous,
                    posterImageUrl: posterURL
                  }));
                  setUploading(false);
                  setPosterUploaded(true);
                });
            }
        );
    }
  }
  const uploadSongs = async (e)=>{
    setUploading(true);
    let sngs = e.target.files;
    for(let i = 0;i<sngs.length;i++){
      let poster = e.target.files[i];
      let temp = data.songsName;
      temp.push(poster.name);
      setData({...data,songsName:temp});
      if (poster) {
          const imageRef = ref(storage, `songs/${data.movieTitle}/${poster.name}`);
          const uploadTask = uploadBytesResumable(imageRef, poster);
          uploadTask.on('state_changed',(snapshot) => {
                // setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                return;
            },(error) => {
                  console.error('Error uploading image:', error);
              },
              () => {
                  getDownloadURL(uploadTask.snapshot.ref).then((posterURL) => {
                    let temp = data.songsURL;
                    temp.push(posterURL);
                    setData({...data,songsURL:posterURL});
                    if((i+1) === sngs.length){
                      console.log(data);
                      setUploading(false);
                      setSongsUploaded(true);
                    }
                  });
              }
          );
      }
    }
  }
  const save = ()=>{
    
    axios.post('http://localhost:3002/upload',data).then((result) => {
        console.log("data saved succesfully");
        setPosterUploaded(false);
        setSongsUploaded(false);
      }).catch((error)=>{
        console.log('error',error);
    })
  }
  return (
    <div className='h-2/3 flex justify-center items-center'>
      <div className='flex flex-col items-center w-full gap-6 '>
        <div className="w-2/3 lg:w-1/2 ">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
            Movie name
          </label>
          <input onChange={(e)=>setData({...data,movieTitle:e.target.value})} value={data.movieTitle} className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-black opacity-50" id="song" type="text" placeholder="Enter song"/>
        </div>
        {!posterUploaded && <div className="w-full flex ">
            <div className="extraOutline p-4 bg-black bg-opacity-60 w-2/3 lg:w-1/2 bg-whtie m-auto rounded-lg ">
              <div className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg">
                  <svg className="text-indigo-500 w-24 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                  <div className="input_field flex flex-col w-max mx-auto text-center">
                      <label>
                          <input onChange={uploadPoster} className="text-sm cursor-pointer w-36 hidden" type="file" accept='image/*' />
                          <div className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">Select</div>
                      </label>
                      <div className="title text-indigo-500 uppercase">or drop Poster here</div>
                  </div>
              </div>
            </div>
        </div>}
        {posterUploaded && <div className='h-14 p-10 rounded-md text-white font-bold bg-green-500 flex items-center justify-center w-2/3 lg:w-1/2'>Image uploaded successfully </div>}
        {uploading && <div className='flex-col gap-10 absolute top-0 left-0 flex justify-center items-center text-center bg-black opacity-80 h-full w-full text-white text-2xl z-10'>
            <span className="loader"></span>
            Uploading in progress <br/> please wait
        </div>}
        {!songsUploaded && <label className='hover:cursor-pointer w-2/3 lg:w-1/2 bg-indigo-600 text-white p-2 flex justify-center items-center rounded-md font-bold' htmlFor='songUpload'>
            Upload songs
            <input id='songUpload' name='songs' onChange={uploadSongs} type='file' accept='audio/*' style={{ display: 'none' }} multiple />
        </label>}
        {songsUploaded && <div className='hover:cursor-pointer w-2/3 lg:w-1/2 bg-green-600 text-white p-2 flex justify-center items-center rounded-md font-bold' htmlFor='songUpload'>
            Uploaded songs Successfully
        </div>}
        {songsUploaded && <div onClick={save} className='hover:cursor-pointer w-2/3 lg:w-1/2 bg-indigo-600 text-white p-2 flex justify-center items-center rounded-md font-bold' htmlFor='songUpload'>
            Save songs
        </div>}
      </div>
    </div>
  )
}

export default Upload