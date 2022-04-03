package com.examly.springapp.controller;
import com.examly.springapp.Model.User;
import com.examly.springapp.Repositorie.UserRepository;
import com.examly.springapp.server.Details;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.*;

@RestController
@CrossOrigin(origins = "https://8081-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io")
public class SignupController{

    @Autowired
    public UserRepository userR;
    
    @Autowired
    private Details details;

    @RequestMapping("/signup")
    public List<User> getDetails(){
        return details.getAll();
    }

    //signup POST
    @RequestMapping(method = RequestMethod.POST,value="/signup")
    public boolean saveUser(@RequestBody User user) throws IOException{
        List<User>res_list = userR.findByUser_mail(user.getMail());
        List<User>res_list2 = userR.findByUser_name(user.getUser_name());
        if(res_list.size()>=1 || res_list2.size()>=1){            
            return false;
        }
        else{           
                userR.save(user);
                return true;    
        }
        
    }

}