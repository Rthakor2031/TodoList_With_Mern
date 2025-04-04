import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate()
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    setlogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      var Data = await axios.post("http://localhost:5005/user/login", login, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (Data.status === 200) {
        toast.success(Data.data.message);
        setTimeout(() => {
          navigate("/todo");
        }, 1000);
      }      
      setlogin({ email: "", password: "" });
      
    } catch (error) {
      // console.log(error)
      // const {status} = error.response;
      const {status} = error;
      var {message} = error.response.data;
      // console.log(message)
        switch (status) {
          case 403:
            toast.error(message);
            break;
          case 404:
            toast.error(message && "You don't have an account, Please create an account before login👍");
            setTimeout(() => {
              navigate("/")
            },2500);
            break;
          case 401:
            toast.error(message)
            break;
          default:
            toast.error(message); 
        }
    }
  };
  
  
  return (
    <div style={{ textAlign: "center" }}>
      <div className="containerForm">
        <h2>Login</h2>
        <form action="" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            className="input-field"
            placeholder="Email"
            onChange={handlechange}
            name="email"
            value={login.email}
          />
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            onChange={handlechange}
            name="password"
            value={login.password}
          />
          <button type="submit" className="btn">
            LOGIN
          </button>
          <br />
          <br />
          <div>
            <span style={{ marginTop: "15px" }}>
              Don't have an account?{" "}
              <Link to={"/"} style={{ textDecoration: "none" }}>
                Register Now
              </Link>
            </span>
          </div>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Login;
