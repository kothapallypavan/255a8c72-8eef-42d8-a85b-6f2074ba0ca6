import { useState } from "react";
import './App.css';
import {useNavigate, UseNavigate} from "react-router-dom";
import axios from "axios";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function Dash() {  
    const constForm = (event) =>{
        cookies.remove("user");
        window.location.reload();
      }
      
      return (
    <div class="mainbody">
        <div class="header">
        <h1>LawHarbor</h1>
        </div>
        <div class="loginBox">
        <h1>
            Hello {cookies.get("user")}
            </h1>
        <form class="log-form" onSubmit={constForm}>
            <input type="submit" value="LOGOUT" id="loginButton" class="loginButton"></input>
        </form>

        </div>
    </div>
  );
}

export default Dash;
