package com.examly.springapp.controller;
import com.examly.springapp.Model.User;
import com.examly.springapp.Model.Record;
import com.examly.springapp.Repositorie.UserRepository;
import com.examly.springapp.Repositorie.RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@CrossOrigin(origins = "https://8081-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io")
public class LoginController{
    

    @Autowired
    public UserRepository userR;

    @Autowired
    public RecordRepository RR;

    //login POST
    @CrossOrigin(origins = "https://8080-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io")
    @RequestMapping(method = RequestMethod.POST,value="/login")
    public String checkUser(@RequestBody User user){
        if(user.getMail().equals("admin")){
            System.out.println("admin id");
            if(user.getPassword().equals("admin")){
                System.out.println("Admin pass");
                return "5";
            }
            return "2";
        }
        List<User>res_list = userR.findByUser_mail(user.getMail());
        System.out.println(user.getMail());
        if(res_list.size() <1){            
            System.out.println("User not found");
            return "2";
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
    
    //lawyer GET
    @GetMapping("/Lawyer")
    public List<User>getallLawyers(){
        return userR.find_lawyers("yes");
    }
    
    @RequestMapping(method = RequestMethod.POST,value="/case")
    public void updateevent(@RequestBody Record ll){
        RR.save(ll);
    }


    @GetMapping("/caserecord")
    public List<Record>showcase(){
        return RR.findAll();
    }

    @GetMapping("/getclientdetails")
    public List<User>userdetails(){
        return userR.findAll();
    }
 
    
}