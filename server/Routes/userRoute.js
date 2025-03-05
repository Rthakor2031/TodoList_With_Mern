const express = require('express');
const { Register, Login } = require('../Controller/usercontroller');
const userRoute = express.Router()

userRoute.post('/register' , Register)
userRoute.post('/login' , Login )


module.exports = userRoute