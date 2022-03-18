import './App.css';
import { useState } from "react";
import {useNavigate, UseNavigate} from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [inputs,setInputs] = useState("");
  
  const handleChange = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
  }

  return (
    <div class="mainbody">
    <div class="header">
      <h1>LawHarbor</h1>
    </div>
    <div class="loginBox" id="loginBox">
      <h1>
        Sign Up
        </h1>
      <form class="log-form" onSubmit={handleSubmit}>
        <div class="login-content">
          </div>
        <div class='singup-link'>
        <p>Already a User?<a onClick={() => {
              navigate("/");
          }}> Login</a>
          </p>
        </div>
        <input type="submit" value="Submit" id="submitButton" class="loginButton"></input>
      </form>
    </div>

  </div>
  );
}

export default Signup;
