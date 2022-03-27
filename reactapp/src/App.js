import './components/App.css';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Home from "./components/home";
import Signup from "./components/signup";
import Main from "./components/main";

function App() {
  return (
      <Router>
          <Routes>
            <Route exact path="/" element={<Main/>}></Route>
            <Route exact path="/login" element={<Home/>}></Route>
          </Routes>
      </Router>      
  );
}

export default App;
