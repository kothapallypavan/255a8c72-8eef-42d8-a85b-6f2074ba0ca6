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
import { Table } from "react-bootstrap";
const cookies = new Cookies();


const Admin = () => {  
    let a =1;
   const navigate = useNavigate();
   
   const[name,setName]=useState("")
   const[password,setPassword]=useState("")
   const[experiance,setExperiance]=useState("")
   const[mail,setMail]=useState("")
   const[specialist,setSpecialist]=useState("")
   const[db,setDB]=useState([])
   const[tempid,Setempid] = useState("")
   const[search,Setsearch]= useState("")

   //set update values
   const[updatename,Setupdatename]=useState("")
   const[updatepassword,Setupdatepassword]=useState("")
   const[updateemail,Setupdateemail]=useState("")
   const[updateexp,Setupdateexp]=useState("")
   const[updatespec,Setupdatespec]=useState("")

   if(!cookies.get("admin")){
        navigate("/login");
        window.location.reload();
  }
  const homelink = () =>{
    navigate("/admin");
    window.location.reload();
  }

  const searchFeild = () =>{
    Setsearch(document.getElementById("searchBox").value);
  }

  const logout = () =>{
    cookies.remove("admin");
    navigate("/login");
    window.location.reload();
  }
  const showpopup = () =>{
    var a = document.getElementById("popupcard");
    var b = document.getElementById("popupcard2");
    a.style.display = "block";
    b.style.display = "none";
  }
  const showpopup2 = (e) =>{
    Setempid(e.target.id);
    
    for(var i=0;i<db.length;i++){
      if(e.target.id==db[i].mail){
          setName(db[i].user_name);
          setPassword(db[i].password);
          setExperiance(db[i].exp);
          setMail(db[i].mail);
          setSpecialist(db[i].specialist);
          break;
      }
    }
    var a = document.getElementById("popupcard");
    var b = document.getElementById("popupcard2");
    a.style.display = "none";
    b.style.display = "block";
}
  const closebutton =() =>{
    var a = document.getElementById("popupcard");
    var b = document.getElementById("popupcard2");
    a.style.display = "none";
    b.style.display = "none";
  }

  //getclientDB
  useEffect(()=>{
    fetch("https://8080-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io/Admin/Lawyer")
    .then(res=>res.json())
    .then((result)=>{
      setDB(result);
    })
  },[])
  console.log("DB ",db);
  
  //Add Lawyer
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userdata = {
        user_name:document.getElementById("enterName").value,
        mail:document.getElementById("enterMail").value,
        password:document.getElementById("enterPassword").value,
        name:document.getElementById("enterName").value,
        experiance:document.getElementById("enterExperiance").value,
        specialist:document.getElementById("enterSpecialist").value
    };
    console.log(userdata);
    await axios.post("https://8080-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io/Admin/Lawyer",
    userdata,
      ).then(data => {
        if(data.data==1){
          window.location.reload();
        }
      });
  }

  //Update Lawyer
  const handlesub = async (e)=>{
    e.preventDefault();
    var url="https://8080-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io/getadminid";
    const user_data = {
      mail:mail
    }
    let intid = await axios.post(url,
        user_data
    )
    //////////////////////
    let org_id = intid.data;
    let old_url ="https://8080-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io/Admin/Lawyer/";
    let text = org_id.toString();
    var newurl = old_url.concat(text);
    const userdata={
      mail:updateemail,
      user_name:updatename,
      password:updatepassword,
      exp:updateexp,
      specialist:updatespec

    }
    const rr = await axios.put(newurl,
    userdata,
      );
    if(rr.data==1){
      window.location.reload();
    }

  }

  //Delete Lawyer
  const deletesub = async (e)=>{
    e.preventDefault();
    var url="https://8080-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io/getadminid";
    const user_data = {
      mail:e.target.id
    }
    let intid = await axios.post(url,
        user_data
    )
    let old_url ="https://8080-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io/Admin/Lawyer/";
    let text = intid.data.toString();
    var newurl = old_url.concat(text);
    const userdata={
      mail:mail
    }
    const rr = await axios.delete(newurl,
    userdata,
      );
    window.location.reload();

  }

  
  
  const update_name = (e)=>{
    Setupdatename(e.target.value);
  }
  const update_email = (e)=>{
    Setupdateemail(e.target.value);
  }
  const update_pass = (e)=>{
    Setupdatepassword(e.target.value);
  }
  const update_spec = (e)=>{
    Setupdatespec(e.target.value);
  }
  const update_exp = (e)=>{
    Setupdateexp(e.target.value);
  }
  return(
    <div>
        <div>
        <Navbar style={{ backgroundColor:'skyblue'}} bg="skyblue" expand="lg">
        <Container>
          <h2>LawHarbor</h2>            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
     
              </Nav>
            <Nav style={{float:"right"}}>
       <Nav.Link onClick={homelink} style={{fontSize:"20px",color:"black"}}>Home</Nav.Link>
                  <Nav.Link onClick={logout} style={{fontSize:"20px",color:"black"}}>Logout</Nav.Link>
                </Nav>
              </Navbar.Collapse>
          </Container>
        </Navbar>
        </div>

        <div >
        <Form.Control onChange={searchFeild} id="searchBox" as="textarea" rows={1} style={{ float:"left",border:"1px solid black",marginLeft:"10%",width:"50%",marginTop:"20px",resize: "none",marginBottom:"20px"}} placeholder="Type here to search"/>
        <Button id="searchButton" onClick={searchFeild} style={{marginTop:"20px",marginLeft:"20px"}}>Search</Button>
        <Button id="addButton" onClick={showpopup} style={{marginTop:"20px",marginLeft:"20px"}}>ADD</Button>
        </div>

        <div style={{width:"70%",float:"left",marginTop:"30px"}}>
        <Table striped bordered hover>
                    <thead>
                        <tr style={{border:"2px solid black",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                        <th style={{textAlign:"center"}}>S No </th>
                        <th style={{textAlign:"center"}}>Name</th>
                        <th style={{textAlign:"center"}}>Role</th>
                        <th style={{textAlign:"center"}}>Options</th>
                        </tr>
                    </thead>   
        
        {
            
            db.map(lawyer => ( lawyer.user_name.includes(search)  &&
              <tr>
                <td style={{textAlign:"center",padding:"20px"}}>{a}</td>
                <td style={{textAlign:"center"}}>{lawyer.user_name}</td>
                <td style={{textAlign:"center"}}>{lawyer.mail}</td>
                <td style={{textAlign:"center"}}>      
                    <Button style={{marginLeft:"20px",backgroundColor:"blue"}} onClick={showpopup2} id={lawyer.mail}>Edit</Button>
                    <Button style={{marginLeft:"20px",backgroundColor:"red"}} onClick={deletesub} id={lawyer.mail}>Delete</Button></td>
              </tr>
                
        
            ))
        }
        </Table>
            
        </div>

        <div>
        <div id="popupcard" style={{display:"none",float:"right"}}>
        <Card style={{ backgroundColor:"lightgrey",width: '25rem',height:'32rem',border:'2px solid grey',borderRadius: '4%',textAlign:'center',marginRight:'20px',marginTop:'20px'}}>
            <Card.Body style={{overflow:"hidden"}}>
                <Card.Title style={{marginLeft:"20px"}}>ADD/Edit Details<CloseButton aria-label="Hide"  onClick={closebutton} style={{float:"right"}}/></Card.Title>

                <Form >
                <Form.Control as="textarea" id="enterName" rows={1} style={{padding:"15px",resize: "none",margin:"20px 0px"}} placeholder="Enter name" required/>
                <Form.Control as="textarea" id="enterMail" rows={1} style={{padding:"15px",resize: "none",margin:"20px 0px"}} placeholder="Enter email" required/>
                <Form.Control as="textarea" id="enterPassword" rows={1} style={{padding:"15px",resize: "none",margin:"20px 0px"}} placeholder="Enter Password" required/>
                <Form.Control as="textarea" id="enterExperiance" rows={1} style={{padding:"15px",resize: "none",margin:"20px 0px"}} placeholder="Enter Experiance" required/>
                <Form.Control as="textarea" id="enterSpecialist" rows={1} style={{padding:"15px",resize: "none",margin:"20px 0px"}} placeholder="Enter Specialist" required/>
                <Button id="updateButton" onClick={handleSubmit}>Update</Button>
                </Form>
            </Card.Body>
            </Card>
      </div>
      <div id="popupcard2" style={{display:"none",float:"right"}}>
        <Card style={{ backgroundColor:"lightgrey",width: '25rem',height:'32rem',border:'2px solid grey',borderRadius: '4%',textAlign:'center',marginRight:'20px',marginTop:'20px'}}>
            <Card.Body style={{overflow:"hidden"}}>
                <Card.Title style={{marginLeft:"20px"}}>ADD/Edit Details<CloseButton aria-label="Hide"  onClick={closebutton} style={{float:"right"}}/></Card.Title>
                <Form >
                <Form.Control as="textarea" onChange={update_name} placeholder={name} id="enterName" rows={1} style={{padding:"15px",resize: "none",margin:"20px 0px"}} required/>
                <Form.Control as="textarea" onChange={update_email} placeholder={mail} id="enterMail" rows={1} style={{padding:"15px",resize: "none",margin:"20px 0px"}} required/>
                <Form.Control as="textarea" onChange={update_pass} placeholder={password} id="enterPassword" rows={1} style={{padding:"15px",resize: "none",margin:"20px 0px"}}  required/>
                <Form.Control as="textarea" onChange={update_exp} placeholder={experiance} id="enterExperiance" rows={1} style={{padding:"15px",resize: "none",margin:"20px 0px"}}  required/>
                <Form.Control as="textarea" onChange={update_spec} placeholder={specialist} id="enterSpecialist" rows={1} style={{padding:"15px",resize: "none",margin:"20px 0px"}}  required/>
                <Button id="updateButton" onClick={handlesub}>Update</Button>
                </Form>
            </Card.Body>
            </Card>
      </div>
        </div>
    </div>
  )
  
};

export default Admin;