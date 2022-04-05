package com.examly.springapp.Model;
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
    public String getEvent(){
        return eventDetail;
    }
    public String getAction(){
        return actionTaken;
    }
    public UserModel getIssue(){
        return issuedBy;
    }

    public void setCaseRecordID(String CaseRecordID) {
        this.CaseRecordID = CaseRecordID;
    }

    public void setUserId(UserModel userId) {
        this.userId = userId;
    }


    public String getDate() {
        return this.date;
    }

    public void setDate(String date) {
        this.date = date;
    }


    public void setEventDetail(String eventDetail) {
        this.eventDetail = eventDetail;
    }

    public void setActionTaken(String actionTaken) {
        this.actionTaken = actionTaken;
    }
    public void setIssuedBy(UserModel issuedBy) {
        this.issuedBy = issuedBy;
    }
}
