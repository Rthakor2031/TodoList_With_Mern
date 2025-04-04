const express = require("express")
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require("./database")
const userRoute = require("./Routes/userRoute")
const todoRoute = require("./Routes/todoRoute")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.json())
const cors = require('cors')
app.use(cors({
    origin: 'http://localhost:5173', // ✅ Remove trailing slash
    credentials: true, // ✅ Allow cookies/auth headers
    methods: ["GET", "POST", "PUT", "DELETE"], // ✅ Define allowed HTTP methods
  }));
app.use("/user", userRoute)
app.use("/todo" , todoRoute)






app.listen(process.env.PORT , async ()=>{
    try {
        await connectDB
        console.log(`Server Running on Port ${process.env.PORT || 3005}`)
    } catch (error) {
        console.log(error)
    }
})