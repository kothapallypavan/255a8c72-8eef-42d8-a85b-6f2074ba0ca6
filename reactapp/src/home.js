import { useState } from "react";
import './App.css';
import {useNavigate, UseNavigate} from "react-router-dom";

function Home() {
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
    <div class="loginBox">
      <h1>
        Login
        </h1>
      <form class="log-form" onSubmit={handleSubmit}>
        <div class="login-content">
          <input type="email" name="email" id="email" placeholder="Enter email"value={inputs.email} onChange={handleChange}></input><br></br>
          <input type="password" name="password" id="password" placeholder="Enter password"value={inputs.password} onChange={handleChange}></input><br></br>
        </div>
        <div class='singup-link'>
          <p>New User? <a id="signupLink" onClick={() => {
              navigate("/signup");
          }}>Sign Up</a>
          </p> 
        </div>
        <input type="submit" value="Login" id="loginButton" class="loginButton"></input>
      </form>

    </div>
  </div>
  );
}

export default Home;
