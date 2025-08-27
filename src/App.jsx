import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserFetch from './components/UserFetch'
import UserCard from './components/UserCard'
import { Button } from "flowbite-react";
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <>
      <UserFetch />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserFetch />} />
        <Route path= "/user/:id" element={<UserDetail />}/>
      </Routes>
      
      </BrowserRouter>

     
    </>
  )
}

export default App
