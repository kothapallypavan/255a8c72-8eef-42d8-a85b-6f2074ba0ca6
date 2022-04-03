import { useState } from "react";
import './App.css';
import {useNavigate, UseNavigate} from "react-router-dom";
import axios from "axios";
import Cookies from 'universal-cookie';
import Admin from "./admin";
const cookies = new Cookies();


function Home() {  
      const navigate = useNavigate();
      const [email,setEmail] = useState("");
      const [password,setPassword] = useState("");
      const [unique,set_unique] = useState(-1);
      
      const update_mail_Change = (e) => {
        setEmail(e.target.value);
        set_unique(-1);
      }

      const update_password_Change = (e) => {
        setPassword(e.target.value);
        set_unique(-1);
      }

      const singuplink = (e) =>{
        cookies.set('signup',"1");
        navigate("/signup");
        window.location.reload();
      }
  
      const handleSubmit = async (event) => {
        event.preventDefault();
        let sign_up_data = "1";
        await axios.post("https://8080-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io/login",
        {
          "mail":email,
          "password":password
        }
          ).then(data => {
            if(data.data=="1"){
              set_unique(data.data);
            }
            else if(data.data=="2"){
              set_unique(data.data);
            }
            else if(data.data=="3"){
                console.log("reload");
                cookies.set('user', email);
                navigate("/home");
                window.location.reload();
            }
            else if(data.data=="5"){
              cookies.set("admin",email);
              navigate("/admin");
              window.location.reload();
            }
            else{
              console.log("LAWYER");
              cookies.set('lawyer', email);
              cookies.set('lawyername',data.data)
              
              navigate("/lawyerhome");
              window.location.reload();
            }
          });
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
          <input type="text" name="mail" id="email" placeholder="Enter email" onChange={update_mail_Change} required></input><br></br>
          <input type="password" name="password" id="password" placeholder="Enter password" onChange={update_password_Change} required></input><br></br>
        </div>
          {(unique === 2 && <p>Invalid Credentials</p>)}
        <div class='singup-link' id="signupLink">
          <p>New User? <a onClick={singuplink} id="signupLink">Sign Up</a>
          </p> 
        </div>
        <input type="submit" value="Login" id="loginButton" class="loginButton"></input>
      </form>

    </div>
  </div>
  );
}

export default Home;