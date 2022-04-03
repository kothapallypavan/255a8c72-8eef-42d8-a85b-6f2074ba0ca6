import { useState } from "react";
import './App.css';
import {useNavigate, UseNavigate} from "react-router-dom";
import axios from "axios";
import Cookies from 'universal-cookie';
import Admin from "./admin";
const cookies = new Cookies();


const details = {
  mail: '',
  password: '',
}

function Home() {  
      const navigate = useNavigate();
      //navigate("/login");
      //window.location.reload();
      if(window.location.href=="https://8081-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io"){
        navigate("/login");
        window.location.reload();
      }
      const [Sign_up, setSign_up] = useState(false);
      const [confirm_correct, set_confirm_correct] = useState(true);
      const [Form, setForm] = useState(details);
      const [unique, set_unique] = useState(-1);
      const [invalid, set_invalid] = useState(0);
      const toggle_mode = () => {
      setSign_up((prevSign_up) => !prevSign_up);
    }


  
  const [inputs,setInputs] = useState("");
  
  const handleChange = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }
  
  const handleSubmit = async (event) => {
    var mail =  Form.mail;
    var password = Form.password;
    const userdata = {
      mail,
      password,
    };
    console.log(userdata);
    event.preventDefault();
    console.log(inputs);
    let sign_up_data = "1";
    await axios.post("https://8080-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io/login",
    userdata,
      ).then(data => {
        if(data.data=="1"){
          set_unique(data.data);
        }
        else if(data.data=="2"){
          set_unique(data.data);
        }
        else if(data.data=="3"){
            console.log("reload");
            cookies.set('user', Form.mail);
            navigate("/home");
            window.location.reload();
        }
        else if(data.data=="5"){
          cookies.set("admin",Form.mail);
          navigate("/admin");
          window.location.reload();
        }
        else{
          console.log("LAWYER");
          cookies.set('lawyer', Form.mail);
          cookies.set('lawyername',data.data)
          
          navigate("/lawyerhome");
          window.location.reload();
        }
      });
  }

  const updateChange = (e) => {
    setForm({ ...Form, [e.target.name]: e.target.value });
  }

  const update_mail_Change = (e) => {
    updateChange(e);
    if (unique === 2)
        set_unique(-1);
}
const update_password_Change = (e) => {
  updateChange(e);
  set_confirm_correct(true);
  if (invalid === 2)
       set_invalid(0);
}
const hand = (e) =>{
  cookies.set('signup',"1");
  navigate("/signup");
  window.location.reload();
}

  return (
    <div class="mainbody">
    <div class="header">
      <h1>LawHarbor</h1>
    </div>
    <div class="loginBox" id="loginBox">
      <h1>
        Login
        </h1>
      <form class="log-form" onSubmit={handleSubmit}>
        <div class="login-content">
          <input type="text" name="mail" id="email" placeholder="Enter email"value={inputs.email} onChange={update_mail_Change} required></input><br></br>
          <input type="password" name="password" id="password" placeholder="Enter password"value={inputs.password} onChange={update_password_Change} required></input><br></br>
        </div>
          {(unique === 1 && <p>Mail does not exist</p>)}
          {(unique === 2 && <p>Wrong password</p>)}
        <div class='singup-link' id="signupLink">
          <p>New User? <a onClick={hand} id="signupLink">Sign Up</a>
          </p> 
        </div>
        <input type="submit" value="Login" id="loginButton" class="loginButton"></input>
      </form>

    </div>
  </div>
  );
}

export default Home;
