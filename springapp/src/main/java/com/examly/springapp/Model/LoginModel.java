package com.examly.springapp.Model;

public class LoginModel {

     private String email;
     private String password;

     public LoginModel() {
     }
     public LoginModel(String mail,String password){
         super();
         this.email=mail;
         this.password=password;
     }
     public String getMail(){
         return email;
     }
     public String getPassword(){
         return password;
     }
     
}
