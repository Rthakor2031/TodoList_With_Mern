const express = require('express')
const { Create_Todo, GetAll_Todo, Update_Todo, Delete_Todo } = require('../Controller/todoController')
const isAuth = require('../Middleware/isAuth')

const todoRoute = express.Router()

todoRoute.post('/create',isAuth, Create_Todo)
todoRoute.get('/' , GetAll_Todo)
todoRoute.put('/update/:todoId' , Update_Todo)
todoRoute.delete('/delete/:todoId' , Delete_Todo)

module.exports = todoRoute