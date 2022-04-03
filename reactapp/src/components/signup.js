import './App.css';
import { useState } from "react";
import {useNavigate, UseNavigate} from "react-router-dom";
import axios from "axios";
import Home from "./home"
import { useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';
import Button from "react-bootstrap/Button";
const cookies = new Cookies();

function Signup() {
     const navigate = useNavigate();

     const [email,setEmail]=useState("")
     const [username,setUsername]=useState("")
     const [mobileNumber,setMobile]=useState("")
     const [password,setPassword]=useState("")
     const [confirmPassword,setConfirm]=useState("")
     const [unique, set_unique] = useState(-1);

    const  mail_change = (e) => {
      setEmail(e.target.value);
      set_unique(-1);
      console.log(e.target.value);
    }
    const username_Change = (e) => {
      setUsername(e.target.value);
      set_unique(-1);
      console.log(e.target.value);
    }
    const mobile_change = (e) => {
      setMobile(e.target.value);
      set_unique(-1);
      console.log(e.target.value);
    }
    const password_change = (e) => {
      setPassword(e.target.value);
      set_unique(-1);
      console.log(e.target.value);
    }
    const confirm_change = (e) => {
      setConfirm(e.target.value);
      set_unique(-1);
      console.log(e.target.value);
    }
    
    const cookie_s = cookies.get("signup");
   

    const loginclick = (e) =>{
      cookies.remove('signup');
      navigate("/login");
      
    }

    const signup_submit = async() =>{
        let sign_up_data = "1";
        if(password==confirmPassword){
          sign_up_data = await axios.post("https://8080-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io/signup", 
            {
              'mail':email,
              'password':password,
              'user_name':username,
              'number':mobileNumber
            }
          );
          if(String(sign_up_data.data)=="false"){
            set_unique(1);
          }
          else{
            cookies.remove("signup");
            navigate("/login");
            window.location.reload();
          }
        }
        else{
          set_unique(2);
        }
    }


  return (
    <div class="mainbody">
    <div class="header">
      <h1>LawHarbor</h1>
    </div>
    <div class="loginBox">
      <h1>
        Sign Up
        </h1>
      <form class="log-form">
        <div class="login-content">
          <input type="email" name="mail" id="email"  placeholder="Enter email"  onChange={mail_change} required></input><br></br>
          <input type="text" name="user_name" id="username" placeholder="Enter Username"  onChange={username_Change} required></input>
          <input type="text" name="number" id="mobileNumber" placeholder="Enter Mobilenumber"  onChange={mobile_change} required></input>
          <input type="password" name="password" id="password" placeholder="Password"  onChange={password_change} required></input>
          <input type="password" name="full_name" id="confirmPassword" placeholder="Confirm Password" onChange={confirm_change} required></input>
        </div>
        {(unique === 1 && <p>User Name or email is already in use</p>)}
        {(unique === 2 && <p>Password doesnt match</p>)}
        {(unique === 3 && cookies.remove('signup'))}
        <div class='singup-link' id="signinLink">
         <p>Already a User?<a id="signinLink" onClick={loginclick}> Login</a>
         </p>
        </div>
        <Button onClick={signup_submit}>SUBMIT</Button>
      </form>
    </div>

  </div>
  );
}

export default Signup;
