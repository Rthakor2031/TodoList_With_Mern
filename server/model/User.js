const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname:{type:String , required:true},
    email:{type:String , unique:true , required:true},
    password:{type:String , required:true},
    createdAt: {
        type: Date,
        default: Date.now,
      }
})

const User = mongoose.model("user" , userSchema);

module.exports = User;