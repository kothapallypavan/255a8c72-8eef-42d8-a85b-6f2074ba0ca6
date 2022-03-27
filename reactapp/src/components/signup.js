import './App.css';
import { useState } from "react";
import {useNavigate, UseNavigate} from "react-router-dom";
import axios from "axios";
import Home from "./home"
import { useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';

const cookies = new Cookies();


const details = {
  user_name: '',
  password: '',
  mail: '',
  number: '',
  full_name: '',
}

function Signup() {
  
  const [Sign_up, setSign_up] = useState(false);
     const [confirm_correct, set_confirm_correct] = useState(true);
     const [Form, setForm] = useState(details);
     const [unique, set_unique] = useState(-1);
     const [invalid, set_invalid] = useState(0);
    const toggle_mode = () => {
      setSign_up((prevSign_up) => !prevSign_up);
  }
  const navigate = useNavigate();
  const [inputs,setInputs] = useState("");
  
  const handleChange = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputs);
    let sign_up_data = "1";
    if(Form.full_name==Form.password){
      sign_up_data = await axios.post("http://localhost:1245/signup", {
        ...Form, full_name: Form.first_name + "-" + Form.second_name,
      });
      set_unique(sign_up_data.data);
      console.log(sign_up_data.data);
    }
    else{
      set_unique(2);
    }    
  }

const updateChange = (e) => {
    setForm({ ...Form, [e.target.name]: e.target.value });
}
const update_password_Change = (e) => {
    updateChange(e);
    set_confirm_correct(true);
    if (invalid === 2)
         set_invalid(0);
}
const update_user_name_Change = (e) => {
    updateChange(e);
    set_invalid(0);
    if (unique === 1)
         set_unique(-1);
}
const update_mail_Change = (e) => {
    updateChange(e);
    if (unique === 2)
         set_unique(-1);
}
const update_number_Change = (e) => {
    updateChange(e);
    if (unique === 3)
         set_unique(-1);
}
const hand = (e) =>{
  cookies.remove('signup');
  window.location.reload();
}
const signup_conf = () =>{
  if(unique==3){
    cookies.remove('signup');
    alert("Registered successfully");
    window.location.reload();
  }    
}
  return (
    //start of the return part
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
          <input type="email" name="mail" id="email"  placeholder="Enter email"  onChange={update_mail_Change} required></input><br></br>
          <input type="text" name="user_name" id="username" placeholder="Enter Username"  onChange={update_user_name_Change} required></input>
          <input type="text" name="number" id="mobileNumber" placeholder="Enter Mobilenumber"  onChange={update_number_Change} required></input>
          <input type="password" name="password" id="password" placeholder="Password"  onChange={update_password_Change} required></input>
          <input type="password" name="full_name" id="confirmPassword" placeholder="Confirm Password" onChange={update_password_Change} required></input>
        </div>
        {(unique === 1 && <p>User Name or email is already in use</p>)}
        {(unique === 2 && <p>Password doesnt match</p>)}
        {(unique === 3 && cookies.remove('signup'))}
        <div class='singup-link'>
        <p>Already a User?<a onClick={hand}> Login</a>
          </p>
        </div>
        <input type="submit" value="Submit" id="submitButton" class="loginButton"  onClick={signup_conf}></input>
      </form>
    </div>

  </div>
  );
}

export default Signup;
