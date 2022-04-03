package com.examly.springapp.Model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CaseRecordModel {
    
    @JsonProperty("CaseRecordID")
     private String CaseRecordID;
     
     private UserModel userId;

     @JsonProperty("date")
     private String date;
     
     @JsonProperty("eventDetail")
     private String eventDetail;

     @JsonProperty("actionTaken")
     private String actionTaken;

     private UserModel issuedBy;


     public CaseRecordModel() {
     }
     public CaseRecordModel(String CaseRecordID,UserModel userId,String date,String eventDetail,String actionTaken,UserModel issuedBy){
         super();
         this.CaseRecordID=CaseRecordID;
         this.userId=userId;
         this.date=date;
         this.eventDetail=eventDetail;
         this.actionTaken=actionTaken;
         this.issuedBy=issuedBy;
     }
     public String getCaseID(){
         return CaseRecordID;
     }
     public UserModel getUserid(){
        return userId;
    }
    public String getDate(){
        return date;
    }
    public String getEvent(){
        return eventDetail;
    }
    public String getAction(){
        return actionTaken;
    }
    public UserModel getIssue(){
        return issuedBy;
    }
     
}
