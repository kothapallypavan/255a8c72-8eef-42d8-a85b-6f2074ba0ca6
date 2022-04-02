import React from "react";
import {useNavigate, UseNavigate, useSearchParams} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import CloseButton from "react-bootstrap/CloseButton";
import Cookies from 'universal-cookie';
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const cookies = new Cookies();


const details = {
    bookingid:'',
    client:'',date:'',eventdetails:'',lawyer:'',report:'',slot:''
}


const Case = () => {  
    const navigate = useNavigate();
    const[lawyers,setLawyers]=useState([])
    const[tempname,setTempname]=useState("")
    const[templawyer,setTemplawyer]=useState("")
    const[tempyear,setTempyear]=useState("")
    const[tempid,setTempid]=useState("")
    const [Forms, setForms] = useState(details);
    const[templ,setTempl]=useState("");

    //GET
    useEffect(()=>{
      fetch("https://8080-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io/caserecord")
      .then(res=>res.json())
      .then((result)=>{
        setLawyers(result);
        setForms(result);
      })
    },[])

    //Restricted
    if(!cookies.get("user")){
      navigate("/login");
    }

    //logout
    const constForm = (event) =>{
      cookies.remove("user");
      window.location.reload();
    }

    //Table data
    const tid = (e) =>{
        setForms({ ...Forms, 'bookingid': e.target.id});
        setTempname(e.target.id);
        setTempid(e.target.id);
        setTempyear(e.target.className);
        setTemplawyer(e.target.title);
        var a = document.getElementById("table_id");
        let d  = document.getElementById("pop_card");
        d.style.display="block";
        a.style.width="1000px";
        a.style.float="left";
    }

    //closepopup
    const closebutton = () => {
        let d  = document.getElementById("pop_card");
        let c  = document.getElementById("table_id");
        d.style.display = "none";
        c.style.width="100%";
    }

    //submit form
    const handleSubmit = async (event) => {  
        event.preventDefault();
        const userdata = {
            bookingid:tempid,
            actiontaken:document.getElementById("actionid").value,
            eventdetails:document.getElementById("eventid").value

        };
        await axios.put("https://8080-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io/actionevent",
        userdata,
            ).then(data => {
            if(data.data==1){
                let d  = document.getElementById("pop_card");
                let c  = document.getElementById("table_id");
                d.style.display = "none";
                c.style.width="100%";
                window.location.reload();
            }
            else {
                console.log("ERROR!");
            }
            });
    }
    
    //Home button
    const homeredirect = () => {
        navigate("/home");
        window.location.reload();
    }
    const caselink = () => {
        navigate("/caserecord");
        window.location.reload();
    }
    const recordlink = () => {
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
                <Navbar.Collapse id="basic-navbar-nav"><Nav className="me-auto">
     
     </Nav>
   <Nav style={{float:"right"}}>
                    <Nav.Link onClick={homeredirect}>Home</Nav.Link>
                    <Nav.Link onClick={caselink}>CaseRecord</Nav.Link>
                    <Nav.Link onClick={recordlink}>Report</Nav.Link>
                    <Nav.Link onClick={constForm}>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            </div>
            <div id="hello" style={{textAlign:"center",float:"left",width:"100%",padding:"1rem"}}>
                    <Table striped bordered hover id="table_id">
                    <thead>
                        <tr>
                        <th>Booking ID </th>
                        <th>Lawyer</th>
                        <th>Date</th>
                        </tr>
                    </thead>   
                    <tbody>    
                        {
                            lawyers.map(law => (
                                (law.client==cookies.get("user") &&
                                <tr onClick={tid} class={law.date} title={law.lawyer} style={{cursor:"pointer"}}>
                                    <td id={law.bookingid} class={law.date} title={law.lawyer}>{law.bookingid}</td>
                                    <td id={law.bookingid} class={law.date} title={law.lawyer}>{law.lawyer}</td>
                                    <td id={law.bookingid} class={law.date} title={law.lawyer}>{law.date}</td>
                                </tr>                           
                            ))
                            )
                        }     
                    </tbody>
                    </Table>
                    <Card id="pop_card" style={{ display:"none",float:"right",width: '25rem',height:'38rem',border:'2px solid grey',borderRadius: '4%',textAlign:'center',marginRight:'20px',marginTop:'20px'}}>
                        <Card.Body style={{overflow:"hidden"}}>
                            <Card.Title style={{marginLeft:"20px"}}>Case Record<CloseButton onClick={closebutton} aria-label="Hide" style={{float:"right"}}/></Card.Title>
                            <p style={{float:"left"}} id="lawyername">{templawyer}</p>
                            <p style={{float:"right"}}>{tempyear}</p>
                            <Form style={{marginTop:"50px"}} onSubmit={handleSubmit}>
                                <p style={{float:"left",marginTop:"20px"}}>Event Detail:</p>
                                <br></br>
                                <Form.Control id="eventid" as="textarea" rows={8} style={{resize: "none"}}/>
                                <p style={{float:"left",marginTop:"20px"}}>Action Taken:</p>
                                <br></br>
                                <Form.Control id="actionid" as="textarea" rows={4} style={{resize: "none",marginBottom:"20px"}}/>
                                <Button type="submit">SUBMIT</Button>
                            </Form>
                        </Card.Body>
            </Card>
        </div>
        </div>
    )
  
};

export default Case;