import './App.css';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Home from "./home";
import Signup from "./signup";

function App() {
  return (
      <Router>
          <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route exact path="/signup" element={<Signup/>}></Route>
          </Routes>
      </Router>      
  );
}

export default App;
