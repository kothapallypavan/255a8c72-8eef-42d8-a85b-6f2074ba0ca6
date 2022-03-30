package com.examly.springapp.server;
import com.examly.springapp.Model.User;
import com.examly.springapp.Repositorie.UserRepository;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Details {

    @Autowired
    private UserRepository userR;

    private String user_name;
     private String mail;
     private String personal_id;

     public Details() {

     }

     public Details(String a, String b, String c) {
        this.user_name = a;
        this.mail = b;
        this.personal_id = c;
     }
     
    public void saveUser(User user){
        userR.save(user);
    }

    public List<User> getallusers(){
        return userR.findAll();
    }
    public List<User>users = new ArrayList<>(Arrays.asList(
            new User("pavan9100","9100","pavan","pavan@gmail.com","9100200188","no","","")
    ));
    public void addTopic(User user){
        users.add(user);
    }
    public void checkU(User user){
        System.out.println("LOGGED IN");
    }
    public List<User> getAll(){
        return users;
    };
    public String getUser_name(){
        return user_name;
    }
    public String getMail() {
        return mail;
    }
    public Details validate(User details) {
        /*
         * ! if not valid return null
         * Validate and get the personal id
         * this.username=NULL; username Not match or password not match
         */
        user_name = details.getUser_name();
        personal_id = "3452356235";
        mail = "qwe@gamil.com";
        // System.out.println("------");
        return new Details(user_name, mail, personal_id);
   }
}
