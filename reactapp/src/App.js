import './components/App.css';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Home from "./components/home";
import Signup from "./components/signup";
import Main from "./components/main";
import Case from './components/caserecord';
import Lawyerhome from './components/lawyerhome';
import Caserecordlawyer from './components/caserecordlawyer';
import Lawerreport from './components/lawyerreport';
import Dash from './components/Dashboard';
import Clientreport from './components/clientreport';
import Admin from './components/admin';

function App() {
  return (
      <Router>
          <Routes>
            <Route exact path="/" element={<Main/>}></Route>
            <Route exact path="/login" element={<Main/>}></Route>
            <Route exact path="/signup" element={<Signup/>}></Route>
            <Route exact path="/home" element={<Dash/>}></Route>
            <Route exact path="/caserecord" element={<Case/>}></Route>
            <Route exact path="/lawyerhome" element={<Lawyerhome/>}></Route>
            <Route exact path="/caserecordlawyer" element={<Caserecordlawyer/>}></Route>
            <Route exact path="/lawyerreport" element={<Lawerreport/>}></Route>
            <Route exact path="/clientreport" element={<Clientreport/>}></Route>
            <Route exact path="/admin" element={<Admin/>}></Route>
          </Routes>
      </Router>      
  );
}

export default App;
