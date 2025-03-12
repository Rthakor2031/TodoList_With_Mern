import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../Register'
import Login from '../Login'
import Todo from '../todo'

const Allroutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Register/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/todo' element={<Todo/>}></Route>
        </Routes>
    </div>
  )
}

export default Allroutes