import { useState } from "react";
import './App.css';
import {useNavigate, UseNavigate} from "react-router-dom";
import axios from "axios";
import Cookies from 'universal-cookie';
const cookies = new Cookies();


const details = {
  mail: '',
  password: '',
}

function Home() {  

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
    await axios.post("http://localhost:1245/",
    userdata,
      ).then(data => {
        if(data.data==1){
          set_unique(data.data);
        }
        else if(data.data==2){
          set_unique(data.data);
        }
        else if(data.data==3){
            console.log("reload");
            cookies.set('user', Form.mail);
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
  window.location.reload();
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
          <input type="email" name="mail" id="email" placeholder="Enter email"value={inputs.email} onChange={update_mail_Change} required></input><br></br>
          <input type="password" name="password" id="password" placeholder="Enter password"value={inputs.password} onChange={update_password_Change} required></input><br></br>
        </div>
        {(unique === 1 && <p>Mail does not exist</p>)}
        {(unique === 2 && <p>Wrong password</p>)}
        <div class='singup-link'>
          <p>New User? <a onClick={hand}>Sign Up</a>
          </p> 
        </div>
        <input type="submit" value="Login" id="loginButton" class="loginButton"></input>
      </form>

    </div>
  </div>
  );
}

export default Home;
