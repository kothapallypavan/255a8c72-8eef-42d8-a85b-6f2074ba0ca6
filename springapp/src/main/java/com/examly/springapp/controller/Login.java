package com.examly.springapp.controller;
import com.examly.springapp.Model.User;
import com.examly.springapp.Model.Record;
import com.examly.springapp.Repositorie.UserRepository;
import com.examly.springapp.Repositorie.RecordRepository;
import com.examly.springapp.server.Details;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


import java.io.IOException;
import java.util.*;

@RestController
@CrossOrigin(origins = "https://8081-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io")
public class Login{
    

    @Autowired
    public UserRepository userR;

    @Autowired
    public RecordRepository RR;
    
    @Autowired
    private Details details;



    @RequestMapping("/signup")
    public List<User> getDetails(){
        return details.getAll();
    }
    //signup POST
    @RequestMapping(method = RequestMethod.POST,value="/signup")
    public int addUser(@RequestBody User user) throws IOException{
        List<User>res_list = userR.findByUser_mail(user.getMail());
        List<User>res_list2 = userR.findByUser_name(user.getUser_name());
        if(res_list.size()>=1 || res_list2.size()>=1){            
            System.out.println("Username or mail already in use");
            return 1;
        }
        else{           
                System.out.println(res_list.size());
                System.out.println("Signed up");
                userR.save(user);
                System.out.println("Inserted");
                System.out.println(user);
                return 3;    
        }
        
    }

    //login POST
    @CrossOrigin(origins = "https://8080-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io")
    @RequestMapping(method = RequestMethod.POST,value="/")
    public String checkUser(@RequestBody User user){
        //details.checkU(user);
        if(user.getMail().equals("admin")){
            System.out.println("admin id");
            if(user.getPassword().equals("admin")){
                System.out.println("Admin pass");
            }
            return "5";
        }
        List<User>res_list = userR.findByUser_mail(user.getMail());
        System.out.println(user.getMail());
        if(res_list.size() <1){            
            System.out.println("User not found");
            return "1";
        }
        else{
            System.out.println(res_list.size());
            User result = res_list.get(0);
            if(result.getPassword().equals(user.getPassword())){
                if(result.getisLawyer().equals("yes")){
                    System.out.println("Lawyer Logged IN");
                    return result.getUser_name();    
                }
                System.out.println("Logged IN");
                return "3";
            }
            else{
                System.out.println("Wrong password");
                return "2";
            }
        }
    }
    
    //sample test case(returns array with lawyer usernames)
    @GetMapping("/Lawyer")
    public String[] getallLawyers(){
        List<User>r = userR.find_lawyers("yes");
        String[] a = new String [100];
        User rr = r.get(0);
        a[0]=rr.getUser_name();
        return a;
    }

    //Add caserecord
    @RequestMapping(method = RequestMethod.POST,value="/case")
    public void updateevent(@RequestBody Record ll){
        RR.save(ll);
    }

    //add booking POST
    @RequestMapping(method = RequestMethod.POST,value="/booking")
    public int bookLawyer(@RequestBody Record ll){
       List<Record>res = RR.findByUser_mail(ll.getclient());
       System.out.println(ll.getLawyer());
       System.out.println(ll.getDate());
       //Record r = res.get(0);
       for(int i=0;i<res.size();i++){
           Record r = res.get(i);
           System.out.println(r.getLawyer());
           if(r.getLawyer().equals(ll.getLawyer()) && r.getDate().equals(ll.getDate())){
               System.out.println("You have already booked!");
                return 1;
           }
       }
       Random r = new Random();
       while(true){
        String ss=String.valueOf(r.nextInt(100000000));  
            if(!RR.ExistById(ss)){
                ll.setBookingid(ss);
                break;  
            }
       }
       System.out.println("Booked");
       RR.save(ll);
       return 2; 
    }

    //return case records
    @GetMapping("/caserecord")
    public List<Record>showcase(){
        return RR.findAll();
    }

    //returns user details
    @GetMapping("/getclientdetails")
    public List<User>userdetails(){
        return userR.findAll();
    }

    //update report from lawyer
    @RequestMapping(method = RequestMethod.POST,value="/updatereport")
    public int updatereport(@RequestBody Record ll){
        Record old = RR.findBybooking_id(ll.getBookingid());
        int id_value = old.id();
        Record r = RR.findById(id_value).get();
        r.setReport(ll.getReport());
        RR.save(r);
        return 1;

    }

    //update action and event
    @RequestMapping(method = RequestMethod.POST,value="/updateactionevent")
    public int updateEA(@RequestBody Record ll){
        //System.out.println(ll.getBookingid());
        //System.out.println(ll.getReport());
        Record old = RR.findBybooking_id(ll.getBookingid());
        int id_value = old.id();
        Record r = RR.findById(id_value).get();
        r.setAction(ll.getActiontaken());
        r.setEvent(ll.getEventdetails());
        RR.save(r);
        return 1;

    }
    
    //Accept Appointment
    @RequestMapping(method = RequestMethod.POST,value="/accept")
    public int acceptApp(@RequestBody Record ll){
        //System.out.println(ll.getBookingid());
        //System.out.println(ll.getReport());
        Record old = RR.findBybooking_id(ll.getBookingid());
        int id_value = old.id();
        Record r = RR.findById(id_value).get();
        r.setConfirm();
        RR.save(r);
        return 2;

    }

    //Reject Appointment
    @RequestMapping(method = RequestMethod.POST,value="/reject")
    public int rejectApp(@RequestBody Record ll){
        Record old = RR.findBybooking_id(ll.getBookingid());
        int id_value = old.id();
        Record r = RR.findById(id_value).get();
        r.rejectConfirm();
        RR.save(r);
        return 2;

    }

    
    //Get lawyer id
    @RequestMapping(method = RequestMethod.POST,value="/getadminid")
    public int get_adminid(@RequestBody User u){
        //System.out.println(u.getMail());
        List<User>user = userR.findByUser_mail(u.getMail());
        User newuser = user.get(0);
        return newuser.get_id();
    }

    ///// LAWYER ENDPOINTS ////
    //Get Lawyers
    @GetMapping("/Admin/Lawyer")
    public List<User>lawyerdetails(){
        return userR.find_lawyers("yes");
    }
    //Get Lawyers
    @CrossOrigin(origins = "https://8080-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io")
    @GetMapping("/Admin/Lawyer/{id}")
    public @ResponseBody User get_singlelawyer(@PathVariable String id){
        int id_value = Integer.parseInt(id);
        User u = userR.findById(id_value).get();
        return u;
    }

    //Add Admin
    @RequestMapping(method = RequestMethod.POST,value="/Admin/Lawyer")
    public int addlawyer(@RequestBody User ll){
        System.out.println(ll.getSpec());
        userR.save(ll);
        return 1;

    }
     //update lawyer
    @PutMapping(path="/Admin/Lawyer/{id}")
    public @ResponseBody void update_lawyer(@RequestBody User user,@PathVariable String id){
        int id_value = Integer.parseInt(id);
        User u = userR.findById(id_value).get();
        u.setExp(user.getExp());
        u.setMail(user.getMail());
        u.setPassword(user.getPassword());
        u.setSpec(user.getSpec());
        u.setUser_name(user.getUser_name());
        userR.save(u);

    }

    //Delete Lawyer
    @DeleteMapping(path="/Admin/Lawyer/{id}")
    public @ResponseBody int delete_lawyer(@PathVariable String id){
        userR.deleteById(Integer.parseInt(id));
        return 1;
    }

    
}