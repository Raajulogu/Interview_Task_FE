import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import asserts from "../assert";
import GoogleIcon from '@mui/icons-material/Google';

let api_url=asserts.api_url

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name,setName] = useState("");
    const navigate=useNavigate();
  
   
    async function handleSignUp() {
        console.log("Completed")
      if(!email || !password){
        alert("Please enter a valid value");
        return 0;
      } let user={email,password,name}
      try {
        let response = await axios.post(
          `${api_url}/user/signup`,
          user
        );
        console.log(response)
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } catch {
        alert("Invalid Credentials");
      }
    }
    return (
      <div className="container">
        <div className="row">
          <div className="log-box">
            <div className="log-form">
              <h1>Hey there!</h1>
              <label for="name">Name</label>
              <input
                id="name"
                type="string"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Please Enter your name"
                className="input-box"
              />
              <label for="email">Email</label>
              <input
                id="email"
                type="string"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Please Enter your Email"
                className="input-box"
              />
              <label for="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a new password"
                className="input-box"
              />
              <div className="forgot-box">
                <div>
                  <input id="radio" type="radio" />
                  <label for="radio">Remember me</label>
                </div>
                <button className="forgot-btn">Forgot Password</button>
              </div>
              <button className="btn log-btn" onClick={()=>handleSignUp()}>
                SignUp
              </button>
              <button className="btn google-btn"><GoogleIcon/>SignUp With Google</button>
              <div className="content">
                <p>
                  Already have an account ? <a href="/login">Log In</a>
                </p>
              </div>
            </div>
          </div>
  
          <div className="company-det">
            <h1>Migrate Data like a breeze</h1>
            <p>High performance data pipelines built in a minute</p>
            <img
              src="https://www.serverbasket.com/wp-content/uploads/2018/05/vps-server-price-india.png"
              alt="database"
            />
          </div>
        </div>
      </div>
    );
  };

export default Signup