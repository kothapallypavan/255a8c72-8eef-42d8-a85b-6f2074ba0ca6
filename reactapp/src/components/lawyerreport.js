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


const Lawerreport = () => {  
  
    const navigate = useNavigate();
    //access denied
    if(!cookies.get("lawyer")){
      navigate("/login");
    }
    const[recorddb,setrecorddb]=useState([])
    const[clientdb,setclientdb]=useState([])

    const[tempid,setTempid]=useState("");
    const[tempclientname,setClientname]=useState("");
    const[tempdate,setDate]=useState("");
    const[tempslot,setSlot]=useState("");


    //print cookies
    console.log(cookies);

    //getRecordDB
    useEffect(()=>{
      fetch("https://8080-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io/caserecord")
      .then(res=>res.json())
      .then((result)=>{
        setrecorddb(result);
      })
    },[])
    console.log("RecordDB",recorddb);

    //getclientDB
    useEffect(()=>{
      fetch("https://8080-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io/getclientdetails")
      .then(res=>res.json())
      .then((result)=>{
        setclientdb(result);
      })
    },[])
    console.log("ClientDB",clientdb);

    //popup
    const togglePopup = (e) => {
      setTempid(e.target.id);
      for(let i=0;i<recorddb.length;i++){
        if(recorddb[i].bookingid == e.target.id){
          setClientname(recorddb[i].clientuser);
          setDate(recorddb[i].date);
          setSlot(recorddb[i].slot);
        }
      }
      let c  = document.getElementById("hello");
      let d  = document.getElementById("hello2");
      d.style.float = "right";
      d.style.display = "block";
      c.style.width="65rem";
    
    }

    //submit form
    const handleSubmit = async (event) => {
      event.preventDefault();
      const userdata = {
        bookingid:tempid,
        report:document.getElementById("formtext").value
      };      
      console.log(userdata);
      await axios.post("https://8080-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io/updatereport",
      userdata,
        ).then(data => {
          if(data.data==1){
            alert("Report updated");
            let d  = document.getElementById("hello2");
            let c  = document.getElementById("hello");
            d.style.display = "none";
            c.style.width="100%";
          }
          else {
            alert("Error occured");
          }
        });
    }

    
  
    const closebutton = () => {
      let d  = document.getElementById("hello2");
      let c  = document.getElementById("hello");
      d.style.display = "none";
      c.style.width="100%";
    }

    //Nav Links
    const homelink = (e) => {
      navigate("/lawyerhome");
      window.location.reload();
    }
    const goback = (e) => {
      navigate("/caserecordlawyer");
      window.location.reload();
    }
    const reportlink = (e) => {
      navigate("/lawyerreport");
      window.location.reload();
    }
    const constForm = (event) =>{
      cookies.remove("lawyer");
      window.location.reload();
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
                  <Nav.Link onClick={homelink}>Home</Nav.Link>
                  <Nav.Link onClick={goback}>CaseRecord</Nav.Link>
                  <Nav.Link onClick={reportlink}>Report</Nav.Link>
                  <Nav.Link onClick={constForm}>Logout</Nav.Link>
                </Nav>
              </Navbar.Collapse>
          </Container>
        </Navbar>
        </div>
        
      <div id="hello" style={{textAlign:"center",float:"left",width:"100%",padding:"1rem"}}>
      {
                               
          recorddb.map(lawyer => (lawyer.lawyer==cookies.get("lawyername") && lawyer.isconfirmed=='yes' &&
              <Card onClick={togglePopup}  style={{ float:"left",width: '12rem',height:'16rem',margin:'20px 30px',border:'2px solid grey',textAlign:'center',borderRadius: '20%',cursor:"pointer"}}>
                <Card.Img id={lawyer.bookingid} variant="top" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" style={{width:'5rem',height:'5rem',margin:'0 auto',marginTop:'2rem' ,marginBottom:'0px'}}/>
                <Card.Body style={{borderRadius: '23%',overflow:"hidden"}}>
                  <Card.Title style={{marginTop:'0.2rem'}}>{lawyer.clientuser}</Card.Title>
                  <Card.Text >{lawyer.date}</Card.Text>  
                  <Card.Text >{lawyer.slot}</Card.Text>  
                </Card.Body>
              </Card>
        ))
      }
      </div>
      <div id="hello2" style={{display:"none"}}>
      <Card style={{ width: '25rem',height:'38rem',border:'2px solid grey',borderRadius: '4%',textAlign:'center',marginRight:'20px',marginTop:'20px'}}>
          <Card.Body style={{overflow:"hidden"}}>
            <Card.Title style={{marginLeft:"20px"}}>Add/Update Report<CloseButton aria-label="Hide" onClick={closebutton} style={{float:"right"}}/></Card.Title>
          <div>
            <Card.Img variant="top" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" style={{float:"left",width:'2rem',height:'2rem',margin:'0 auto',marginTop:'2rem' ,marginBottom:'0px'}}></Card.Img>
            <Card.Text style={{float:"left",marginTop:"35px",marginLeft:"10px"}}>{tempclientname}</Card.Text>
            <Card.Text style={{float:"right",marginTop:"35px",marginLeft:"10px"}}>{tempdate}</Card.Text>
          </div>
          <Card.Text style={{marginTop:"100px",marginBottom:"0px"}}>{tempslot}</Card.Text>
            <Form onSubmit={handleSubmit}>
            <Form.Control as="textarea" id="formtext" rows={12} style={{resize: "none",margin:"20px 0px",backgroundColor:"skyblue"}} placeholder="Enter the case details here" required/>
                      
              <Button type="submit">Submit</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
      
    </div>
  )
  
};

export default Lawerreport;