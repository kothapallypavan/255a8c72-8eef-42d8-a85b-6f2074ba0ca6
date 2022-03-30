import './App.css';
import { useState } from "react";
import {useNavigate, UseNavigate} from "react-router-dom";
import axios from "axios";
import Home from "./home"
import { useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';
import Button from "react-bootstrap/Button";
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
  const cookie_s = cookies.get("signup");
    if(!cookie_s){
      return <Home />
    } 
  const handleChange = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
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
  navigate("/login");
  window.location.reload();
}
const signup_conf = async() =>{
  console.log(inputs);
    let sign_up_data = "1";
    if(Form.full_name==Form.password){
      sign_up_data = await axios.post("https://8080-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io/signup", {
        ...Form, full_name: Form.first_name + "-" + Form.second_name,
      });
      if(sign_up_data.data==3){
        cookies.remove('signup');
        window.location.reload();
       
      }
      else if(sign_up_data.data==1){
        set_unique(1);
      }
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
          <input type="email" name="mail" id="email"  placeholder="Enter email"  onChange={update_mail_Change} required></input><br></br>
          <input type="text" name="user_name" id="username" placeholder="Enter Username"  onChange={update_user_name_Change} required></input>
          <input type="text" name="number" id="mobileNumber" placeholder="Enter Mobilenumber"  onChange={update_number_Change} required></input>
          <input type="password" name="password" id="password" placeholder="Password"  onChange={update_password_Change} required></input>
          <input type="password" name="full_name" id="confirmPassword" placeholder="Confirm Password" onChange={update_password_Change} required></input>
        </div>
        {(unique === 1 && <p>User Name or email is already in use</p>)}
        {(unique === 2 && <p>Password doesnt match</p>)}
        {(unique === 3 && cookies.remove('signup'))}
        <div class='singup-link' id="signinLink">
         <p>Already a User?<a id="signinLink" onClick={hand}> Login</a>
         </p>
        </div>
        <Button style={{backgroundColor:"#398AB9",padding:"10px 10px"}}id="submitButton"  onClick={signup_conf}>submit</Button>
      </form>
    </div>

  </div>
  );
}

export default Signup;
