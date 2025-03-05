import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../Register'
import Login from '../Login'

const Allroutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Register/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
        </Routes>
    </div>
  )
}

export default Allroutes