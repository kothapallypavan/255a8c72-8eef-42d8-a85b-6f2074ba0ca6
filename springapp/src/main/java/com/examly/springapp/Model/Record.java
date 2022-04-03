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
@Table(name = "record")
public class Record {
     @Id
     @GeneratedValue(strategy=GenerationType.AUTO)
     private int id;
    
     private String clientuser;
     private String client;
     private String lawyer;
     private String date;
     private String slot;
     private String bookingid;
     private String eventdetails="NA";
     private String actiontaken="NA";
     private String isconfirmed="no";
     private String report="NA";

     @JsonProperty("CaseRecordID")
     private String CaseRecordID;

     public Record() {
     }
     public Record(int id,String client,String clientuser,String lawyer,String date,String slot,String bookingid,String eventdetails,String actiontaken,String isconfirmed,String report,String CaseRecordID){
         super();
         this.id=id;
         this.client = client;
         this.clientuser = clientuser;
         this.lawyer = lawyer;
         this.date = date;
         this.slot = slot;
         this.bookingid = bookingid;
         this.eventdetails = eventdetails;
         this.actiontaken = actiontaken;
         this.isconfirmed = isconfirmed;
         this.report = report;
         this.CaseRecordID = CaseRecordID;
     }
     public int id(){
         return id;
     }
     public String getclient() {
        return client;
    }
    public String getLawyer() {
        return lawyer;
    }
    public String getDate() {
        return date;
    }
    public String getSlot() {
        return slot;
    }
    public String getBookingid() {
        return bookingid;
    }
    public String getEventdetails() {
        return eventdetails;
    }
    public String getActiontaken() {
        return actiontaken;
    }
    public String getIsconfirmed() {
        return isconfirmed;
    }
    public String getReport() {
        return report;
    }
    public String getClientuser() {
        return clientuser;
    }
    public void setBookingid(String bookingid) {
        this.bookingid = bookingid;
    }
    public void setclientuser(String u){
        this.clientuser = u;
    }
    public void setReport(String u){
        this.report = u;
    }
    public void setAction(String u){
        this.actiontaken = u;
    }
    public void setEvent(String u){
        this.eventdetails = u;
    }
    public void setConfirm(){
        this.isconfirmed = "yes";
    }
    public void rejectConfirm(){
        this.isconfirmed="rejected";
    }
    public String getCaserecordid(){
        return CaseRecordID;
    }
    public void setCaserecord(String CaseRecordID){
        this.CaseRecordID = CaseRecordID;
    }
}
