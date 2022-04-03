import React from "react";
import {useNavigate, UseNavigate, useSearchParams} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
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


const Lawyerhome = () => {  
  

    const[lawyers,setLawyers]=useState([])
    const[tempname,setTempname]=useState("")
    const[tempid,setTempid]=useState("")
    const[tempyear,setTempyear]=useState("")
    const [Forms, setForms] = useState(details);

    

    useEffect(()=>{
      fetch("https://8080-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io/caserecord")
      .then(res=>res.json())
      .then((result)=>{
        setLawyers(result);
      })
    },[])
    
    console.log("lawyer:",lawyers);
    const navigate = useNavigate();

    if(!cookies.get("lawyer")){
      navigate("/login");
    }

    const constForm = (event) =>{
      cookies.remove("user");
      cookies.remove("lawyer");
      window.location.reload();
    }

  const togglePopup = (e) => {
    setForms({ ...Forms, [e.name]: e.target.value });
    setTempname(e.target.id);
    setTempyear(e.target.name);
    setTempid(e.target.value);
    console.log(tempid);
    let c  = document.getElementById("hello");
    let d  = document.getElementById("hello2");
    d.style.float = "right";
    d.style.display = "block";
    c.style.width="65rem";
    
  }
  
  const updateName = (e) => {
    Forms.name=e.target.id;
    Forms.mail="";
    console.log(Forms);
  }
  const goback = (e) => {
    navigate("/caserecordlawyer");
    window.location.reload();
  }
  const homeredirect = (e) =>{
    navigate("/lawyerhome");
    window.location.reload();
  }
  const caseredirect = (e) =>{
    navigate("/lawyerreport");
    window.location.reload();
  }
  const accept = async(e) =>{
    e.preventDefault();
    const userdata = {
      bookingid:e.target.id
    };
      await axios.post("https://8080-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io/Lawyer/booking",
      userdata,
        ).then(data => {
          if(data.data==1){
            console.log("Error");
          }
          else if(data.data==2){
            alert("Done");
            window.location.reload();
          }
        });
  }
  const reject = async(e) =>{
    e.preventDefault();
    const userdata = {
      bookingid:e.target.id
    };
    let reject_id = 0;
    reject_id = await axios.post("https://8080-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io/rejectid",
                userdata,
                );
    let url = "https://8080-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io/Lawyer/booking/"+String(reject_id.data)
    await axios.delete(url
          ).then(data => {
              if(data.data==1){
                  console.log("Error");
                }
                else if(data.data==2){
                    window.location.reload();
                }
           });
  }

  return(
    <div>
        <div>
        <Navbar style={{ backgroundColor:'skyblue'}} bg="skyblue" expand="lg">
        <Container>
          <h2>LawHarbor</h2>            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav"><Nav className="me-auto">
     
        </Nav>
        <Nav style={{float:"right"}}>
                  <Nav.Link onClick={homeredirect}>Home</Nav.Link>
                  <Nav.Link onClick={goback}>CaseRecord</Nav.Link>
                  <Nav.Link onClick={caseredirect}>Report</Nav.Link>
                  <Nav.Link onClick={constForm}>Logout</Nav.Link>
                </Nav>
              </Navbar.Collapse>
          </Container>
        </Navbar>
        </div>
        
      <div id="hello" style={{textAlign:"center",float:"left",width:"1050px",padding:"1rem"}}>
      {
                               
        lawyers.map(lawyer => (
        (lawyer.lawyer == cookies.get("lawyername") && lawyer.isconfirmed=="yes" && 
            <Card onClick={togglePopup}  style={{ float:"left",width: '12rem',height:'15rem',margin:'20px 30px',border:'2px solid grey',textAlign:'center',borderRadius: '20%',cursor:"pointer"}}>
            <Card.Img onClick={updateName} id={lawyer.name} name={lawyer.exp} value={lawyer.bookingid} variant="top" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" style={{width:'5rem',height:'5rem',margin:'0 auto',marginTop:'2rem' ,marginBottom:'0px'}}/>
            <Card.Body style={{borderRadius: '23%',overflow:"hidden"}}>
                <Card.Text >{lawyer.clientuser}</Card.Text>
                <Card.Text >{lawyer.date}</Card.Text>  
                <Card.Text >{lawyer.slot}</Card.Text>  
            </Card.Body>
            </Card>
        ))
        )
      }
      </div>
      <div id="hello2" style={{maxHeight: "600px",overflowY: "auto",textAlign:"center",width:"460px",height:"600px",border:"2px solid black",float:"right",marginRight:"20px",marginTop:"20px",borderRadius:"15px"}}>
      <h4 style={{marginBottom:"30px",marginTop:"20px"}}>Appointment List</h4>  
      {
        lawyers.map(lawyer => (
          (lawyer.lawyer == cookies.get("lawyername") && lawyer.isconfirmed=="no" && 
          
          <div style={{height:"100px",backgroundColor:"lightblue",marginBottom:"20px",width:"420px",marginLeft:"20px"}}>
            <p style={{float:"left",marginLeft:"10px",marginTop:"10px"}}>{lawyer.clientuser}</p>
            <p style={{float:"left",marginLeft:"30px",marginTop:"10px"}}>{lawyer.date}</p>
            <p style={{float:"left",marginLeft:"30px",marginTop:"10px"}}>{lawyer.slot}</p>
            <Button id={lawyer.bookingid} style={{backgroundColor:"green",marginTop:"6px"}} onClick={accept}>Accept</Button>
            <Button id={lawyer.bookingid} style={{backgroundColor:"red",marginTop:"6px",marginLeft:"5px"}} onClick={reject}>Reject</Button>
            </div>
          ))
        )
      }          
      </div>
      
    </div>
  )
  
};

export default Lawyerhome;