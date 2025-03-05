const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

const connectDB = mongoose.connect(process.env.Mongo_URL)
.then(()=>console.log("Database Connected with server")
).catch(()=>console.log("Error With Connection"))

module.exports = connectDB
