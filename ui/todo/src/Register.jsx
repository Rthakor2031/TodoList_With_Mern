import React, { useState } from "react";
import { data, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  // const notify = () => toast();
  const [formdata, setformdata] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleOnchange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const Data = await axios.post(
        "http://localhost:5005/user/register",
        formdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (Data.status === 201) {
        toast.success("Registration successful!");
      }
      setformdata({fullname:"" , email:"" , password:""});
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div className="containerForm">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullname"
            className="input-field"
            placeholder="Full Name"
            onChange={handleOnchange}
            value={formdata.fullname}
            required
          />
          <input
            type="email"
            name="email"
            className="input-field"
            placeholder="Email"
            onChange={handleOnchange}
            value={formdata.email}
            required
          />
          <input
            type="password"
            name="password"
            className="input-field"
            placeholder="Password"
            onChange={handleOnchange}
            value={formdata.password}
            required
          />
          <button type="submit" className="btn">
            REGISTER
          </button>
          <br />
          <br />
          <div>
            <span>
              Have an Account?{" "}
              <Link to="/login" style={{ textDecoration: "none" }}>
                Login Now
              </Link>
            </span>
          </div>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Register;
