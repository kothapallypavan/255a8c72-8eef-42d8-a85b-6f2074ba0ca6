import React from "react";
import {useNavigate, UseNavigate, useSearchParams} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import CloseButton from "react-bootstrap/CloseButton";
import Cookies from 'universal-cookie';
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const cookies = new Cookies();


const details = {
  mail:'',
  lawyer: '',
  date: '',
  slot: '',
  client:''
}


const Home2 = () => {  
  

    const[lawyers,setLawyers]=useState([])
    const[tempname,setTempname]=useState("")
    const[tempyear,setTempyear]=useState("")
    const[cl,setCl]=useState("")
    const [Forms, setForms] = useState(details);
    const[templ,setTempl]=useState("");
    const[clientdb,setclientdb]=useState([])

    //getclientDB
    useEffect(()=>{
      fetch("https://8080-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io/getclientdetails")
      .then(res=>res.json())
      .then((result)=>{
        setclientdb(result);
      })
    },[])

    var client_username;
    console.log("ClientDB",clientdb);
    for(let i=0;i<clientdb.length;i++){
      if(cookies.get("user")==clientdb[i].mail){
        console.log("FOUND",clientdb[i].user_name);
        client_username = clientdb[i].user_name;
        break;
      }
    }

    //FORM submit
    const handleSubmit = async (event) => {
      var mail =  Forms.mail;
      var lawyer =  tempname;
      var date =  Forms.date;
      var slot = Forms.slot;
      var client = cookies.get("user");
      var clientuser = client_username;

      const userdata = {
        mail,
        lawyer,
        date,
        slot,
        client,
        clientuser
      };

      event.preventDefault();
      console.log(userdata);
      let sign_up_data = 0;
      await axios.post("https://8080-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io/booking",
      userdata,
        ).then(data => {
          if(data.data==1){
            alert("Already slot Booked");
          }
          else if(data.data==2){
            let d  = document.getElementById("hello2");
        d.style.display = "none";
            alert("Booked");
          }
        });
    }

    useEffect(()=>{
      fetch("https://8080-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io/Admin/Lawyer")
      .then(res=>res.json())
      .then((result)=>{
        setLawyers(result);
      })
    },[])
    console.log("lawyers",lawyers)
    console.log(cookies);
    const navigate = useNavigate();

    if(!cookies.get("user")){
      navigate("/login");
    }
    const constForm = (event) =>{
      cookies.remove("user");
      window.location.reload();
    }

  const togglePopup = (e) => {
    setForms({ ...Forms, [e.name]: e.target.value });
    setTempname(e.target.id);
    setTempyear(e.target.name);

    let c  = document.getElementById("hello");
    let d  = document.getElementById("hello2");
    d.style.float = "right";
    d.style.display = "block";
    c.style.width="65rem";
    
  }
  
  const closebutton = () => {
    let d  = document.getElementById("hello2");
    let c  = document.getElementById("hello");
    d.style.display = "none";
    c.style.width="100%";
  }
  const updateChange = (e) => {
    if(document.getElementById("dateid") && document.getElementById("formid")){
      var a =document.getElementById("dateid");
      var b =document.getElementById("formid");
      Forms.date = a.value;
      Forms.slot = b.value;
      setForms({ ...Forms, [e.target.name]: e.target.value });
      console.log(Forms);
    };
    
    
  }
  const updateName = (e) => {
    Forms.name=e.target.id;
    Forms.mail="";
    console.log(Forms);
  }
  const goback = (e) => {
    navigate("/caserecord");
    window.location.reload();
  }
  const homelink = (e) => {
    navigate("/home");
    window.location.reload();
  }
  const reportlink = (e) =>{
    navigate("/clientreport");
    window.location.reload();
  }
  return(
    <div>
        <div>
        <Navbar style={{ backgroundColor:'skyblue'}} bg="skyblue" expand="lg">
        <Container>
          <h2>LawHarbor</h2>            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto" style={{marginLeft:"53rem"}}>
                  <Nav.Link onClick={homelink} id="homeButton">Home</Nav.Link>
                  <Nav.Link onClick={goback} id="caseRecordButton">CaseRecord</Nav.Link>
                  <Nav.Link onClick={reportlink} id="reportButton">Report</Nav.Link>
                  <Nav.Link onClick={constForm} id="logoutButton">Logout</Nav.Link>
                </Nav>
              </Navbar.Collapse>
          </Container>
        </Navbar>
        </div>

        <div id="userHome">
          <div id="hello" style={{textAlign:"center",float:"left",width:"100%",padding:"1rem"}}>
      {
                               
        lawyers.map(lawyer => (
          <Card onClick={togglePopup} id="grid1"  style={{ float:"left",width: '12rem',height:'15rem',margin:'20px 30px',border:'2px solid grey',textAlign:'center',borderRadius: '20%',cursor:"pointer"}}>
          <Card.Img onClick={updateName} id={lawyer.user_name} name={lawyer.exp} value={lawyer.name} variant="top" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" style={{width:'5rem',height:'5rem',margin:'0 auto',marginTop:'2rem' ,marginBottom:'0px'}}/>
          <div style={{width:'10px',height:"10px",backgroundColor:"yellow",borderRadius:'50%',position:"absolute",left:'78%',top:'6%'}}></div>
          <Card.Body style={{borderRadius: '23%',overflow:"hidden"}}>
            <Card.Title style={{marginTop:'0.2rem'}}>{lawyer.user_name}</Card.Title>
            <Card.Text >{lawyer.exp}</Card.Text>  
            <Card.Text >{lawyer.spec}</Card.Text>  
          </Card.Body>
        </Card>
        ))
      }
          </div>
          <div id="hello2" style={{display:"none"}}>
          <Card style={{ width: '25rem',height:'38rem',border:'2px solid grey',borderRadius: '4%',textAlign:'center',marginRight:'20px',marginTop:'20px'}}>
              <Card.Body style={{overflow:"hidden"}}>
                <Card.Title style={{marginLeft:"20px"}}>Add Appointment<CloseButton aria-label="Hide" onClick={closebutton} style={{float:"right"}}/></Card.Title>
                <Card.Img variant="top" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" style={{width:'5rem',height:'5rem',margin:'0 auto',marginTop:'2rem' ,marginBottom:'0px'}}/>
                <Card.Title style={{marginTop:'80px',fontSize:'20px'}}>{tempyear}</Card.Title>
                <Card.Title style={{marginTop:'0px',fontSize:'20px'}}>{tempname}</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <input onChange={updateChange} id="selectDate" type="date" name="date"></input>
                  <Form.Select name="slot" id="selectSlot" onChange={updateChange}>
                    <option>9am-11am</option>
                    <option>11am-1pm</option>
                    <option>1pm-3pm</option>
                    <option>3pm-5pm</option>
                    <option>5pm-7pm</option>
                    <option>7pm-9pm</option>
                  </Form.Select>
                  <Button type="submit" id="submitButton">Submit</Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
  )
  
};

export default Home2;