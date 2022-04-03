package com.examly.springapp.Model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@Table(name = "user_details")
public class User {
     @Id
     @GeneratedValue(strategy=GenerationType.AUTO)
     private int id;
     
     @JsonProperty("user_name")
     private String user_name;
     private String mail;

     @JsonProperty("name")
     private String name;
     
     private String number;
     private String password;
     private String is_lawyer="no";
     private String exp;

     @JsonProperty("specialist")
     private String specialist;


     public User() {
     }
     public User(String user_name,String password,String name,String mail,String number,String is_lawyer,String specialist,String exp){
         super();
         this.user_name = user_name;
         this.password = password;
         this.name = name;
         this.mail = mail;
         this.number = number;
         this.is_lawyer = is_lawyer;
         this.exp = exp;
         this.specialist = specialist;
     }
     
     public int get_id(){
          return id;
     }
     public String getUser_name() {
          return user_name;
     }
     public void setUser_name(String user_name) {
          this.user_name = user_name;
     }

     public String getPassword() {
          return password;
     }

     public void setPassword(String password) {
          this.password = password;
     }

     public String getFull_name() {
          return name;
     }

     public void setFull_name(String name) {
          this.name = name;
     }

     public String getMail() {
          return mail;
     }

     public void setMail(String mail) {
          this.mail = mail;
     }

     public String getNumber() {
          return number;
     }

     public void setNumber(String number) {
          this.number = number;
     }
     public String getisLawyer(){
          return is_lawyer;
     }
     public void setisLawyer(String is_lawyer){
          this.is_lawyer = is_lawyer;
     }
     public String getExp(){
          return exp;
     }
     public void setExp(String exp){
          this.exp = exp;
     }
     public String getSpec(){
          return specialist;
     }
     public void setSpec(String specialist){
          this.specialist = specialist;
     }

     
}
