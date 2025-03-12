import React from "react";
import { Link } from "react-router-dom";
import "../src/App.css";
import Allroutes from "./Routes/Allroutes";
import Todo from "./todo";
// import { LoginCurve } from 'icons-react';

const App = () => {
  return (
    <div>
      <nav>
        <div className="container">
          <ul>
            <button className="navButton">
              <Link
                to={"/"}
                style={{ textDecoration: "none", color: "whitesmoke" }}
              >
                Register
              </Link>
            </button>

            <button className="navButton">
              <Link
                to={"/login"}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  color: "whitesmoke",
                }}
              >
                {" "}
                Login
              </Link>
            </button>
            {/* <Link to={'/logout'} style={{textDecoration:"none" , color:"#1F4529"}}>Logout</Link> */}
          </ul>
        </div>
      </nav>
      <div className="wrapper">
        <div className="left">
          <Allroutes />
        </div>
        {/* <div className="right">
          <Todo />
        </div> */}
      </div>
      <Link to={"/todo"}></Link>
    </div>
  );
};

export default App;
