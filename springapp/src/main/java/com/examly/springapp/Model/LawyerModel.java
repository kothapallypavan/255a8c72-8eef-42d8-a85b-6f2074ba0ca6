package com.examly.springapp.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class LawyerModel {

     @JsonProperty("email")
     private String email;

     @JsonProperty("password")
     private String password;

     @JsonProperty("name")
     private String name;

     @JsonProperty("specialist")
     private String specialist;

     @JsonProperty("experiance")
     private String experiance;


     public LawyerModel() {
     }
     public LawyerModel(String email,String password,String name,String specialist,String experiance){
         super();
         this.email=email;
         this.password=password;
         this.name=name;
         this.specialist=specialist;
         this.experiance=experiance;
         
     }
   public String getName() {
        return name;
   }
   public void setName(String username) {
        this.name = username;
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

   public String getSpec() {
        return specialist;
   }

   public void setSpec(String specialist) {
        this.specialist = specialist;
   }
   public String getExp(){
        return experiance;
   }
   public void setExp(String experiance){
       this.experiance=experiance;
    }
     
}
