import React, { useState } from 'react'
import Cookies from 'universal-cookie';

import Home from "./home";
import Signup from './signup';
import Dash from './Dashboard';

const cookies = new Cookies();
function Main() {
     const auth = cookies.get("user");
     const cookie_s = cookies.get("signup");
     if(cookies.get("user")) return <Dash />
     else if(cookie_s){
          return <Signup />
     } 
     else{
          return <Home />
     }
}

export default Main