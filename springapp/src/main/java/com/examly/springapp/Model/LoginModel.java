package com.examly.springapp.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class LoginModel {
    @JsonProperty("email")
     private String email;
     @JsonProperty("password")
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
