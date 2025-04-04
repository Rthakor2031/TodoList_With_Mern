const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return res.status(401).json({ message: "All fields are required..." });
    }
    // check user alredy exist or not with the help of email.
    const isUser_Exist = await User.findOne({ email });
    if (isUser_Exist) {
      return res
        .status(403)
        .json({ message: "User Already exist with this email..." });
    }
    // for make it pass hash(secure) with the help of bcrypt before save document in db.
    const hasedpassword = await bcrypt.hash(password, 10);

    const userdata = new User({ fullname, email, password: hasedpassword });
    await userdata.save();

    return res.status(201).json({ message: "Account Created Successfully..." });
  } catch (error) {
    console.log(error);
  }
};


const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).json({ message: "All fields are required..." });
    }
    // check the user is already exist or not.
    const user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({ message: "This email also use for Login..." });
    }
    if(!user){
      return res.status(404).json({ message: "User Not Found..." });
    }
    // Compare passwords.
    const Compared_password = await bcrypt.compare(password, user.password);
    if (!Compared_password) {
      return res.status(401).json({ message: "Invalid Password..." });
    }
    // Generates Token while user login.
    const token = jwt.sign({ UserId: user._id }, process.env.SECRET_KEY, {expiresIn: "24h"});
    
    return res.status(200).cookie("token", token , {httpOnly:true}).json({ message: "Login Successful" , token});
  } catch (error) {
    console.log(error);
  }
};

module.exports = { Register, Login };
