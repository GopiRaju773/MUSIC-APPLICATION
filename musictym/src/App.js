import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Upload from './pages/Upload'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Movie from './pages/Movie'
import MusicBar from './components/MusicBar'
import Login from './components/Login'
import Signup from './components/Signup'
function App() {
  return (
    <BrowserRouter>
        <div className='bg-gradient-to-r from-green-400 to-blue-500 h-[100vh] overflow-y-scroll'>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/movie/:movieId' element={<Movie/>}>
              <Route path='song/:songId' element={<MusicBar/>}></Route>
            </Route>
            <Route path='/upload' element={<Upload/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/signup' element={<Signup/>}></Route>
          </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App