package com.examly.springapp.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class UserModel {

     @JsonProperty("email")
     private String email;

     @JsonProperty("password")
     private String password;

     @JsonProperty("username")
     private String username;

     @JsonProperty("mobileNumber")
     private String mobileNumber;

     @JsonProperty("active")
     private boolean active;

     @JsonProperty("role")
     private String role="client";


     public UserModel() {
     }
     public UserModel(String email,String password,String username,String mobileNumber,boolean active,String role){
         super();
         this.email=email;
         this.password=password;
         this.username=username;
         this.mobileNumber=mobileNumber;
         this.active=active;
         this.role=role;
     }
   public String getUser_name() {
        return username;
   }
   public void setUser_name(String username) {
        this.username = username;
   }

   public String getPassword() {
        return password;
   }

   public void setPassword(String password) {
        this.password = password;
   }


   public String getMail() {
        return email;
   }

   public void setMail(String email) {
        this.email = email;
   }

   public String getNumber() {
        return mobileNumber;
   }

   public void setNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
   }
   public boolean getActive(){
        return active;
   }
   public String getRole(){
       return role;
    }
     
}
