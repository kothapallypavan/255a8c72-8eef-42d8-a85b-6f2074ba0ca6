package com.examly.springapp.controller;
import com.examly.springapp.Model.LawyerModel;
import com.examly.springapp.Model.User;
import com.examly.springapp.Repositorie.UserRepository;
import com.examly.springapp.Repositorie.RecordRepository;
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

import java.util.*;

@RestController
@CrossOrigin(origins = "https://8081-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io")
public class AdminController{
    

    @Autowired
    public UserRepository userR;

    @Autowired
    public RecordRepository RR;

    
    //Array of Lawyers
    @GetMapping("/Admin/Lawyer")
    public List<User>lawyerdetails(){
        return userR.find_lawyers("yes");
    }

    //Return lawyer by id
    @CrossOrigin(origins = "https://8080-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io")
    @GetMapping("/Admin/Lawyer/{id}")
    public @ResponseBody User get_singlelawyer(@PathVariable String id){
        int id_value = Integer.parseInt(id);
        User u = userR.findById(id_value).get();
        return u;
    }

    //Lawyer created
    @RequestMapping(method = RequestMethod.POST,value="/Admin/Lawyer")
    public int addlawyer(@RequestBody LawyerModel ll){
        User u = new User();
        u.setisLawyer("yes");
        u.setFull_name(ll.getName());
        u.setPassword(ll.getPassword());
        u.setMail(ll.getMail());
        u.setExp(ll.getExp());
        u.setSpec(ll.getSpec());
        u.setUser_name(ll.getName());
        userR.save(u);
        return 1;

    }

    //Lawyer updated
    @PutMapping(path="/Admin/Lawyer/{id}")
    public int update_lawyer(@RequestBody LawyerModel ll,@PathVariable String id){
        int id_value = Integer.parseInt(id);
        User u = userR.findById(id_value).get();
        u.setisLawyer("yes");
        u.setFull_name(ll.getName());
        u.setPassword(ll.getPassword());
        u.setMail(ll.getMail());
        u.setExp(ll.getExp());
        u.setSpec(ll.getSpec());
        u.setUser_name(ll.getName());
        userR.save(u);
        userR.save(u);
        return 1;
    }

    //Lawyer deleted
    @DeleteMapping(path="/Admin/Lawyer/{id}")
    public @ResponseBody int delete_lawyer(@PathVariable String id){
        userR.deleteById(Integer.parseInt(id));
        return 1;
    }

    //Find private id;
    @RequestMapping(method = RequestMethod.POST,value="/getadminid")
    public int get_adminid(@RequestBody User u){
        List<User>user = userR.findByUser_mail(u.getMail());
        User newuser = user.get(0);
        return newuser.get_id();
    }   
    
}