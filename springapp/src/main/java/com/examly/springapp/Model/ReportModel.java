package com.examly.springapp.Model;

import java.util.Date;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ReportModel {
     
     @JsonProperty("reportId")
     private String reportId;

     private BookingModel appointmentDetail;
     private CaseRecordModel Case_RecordDetail;
     private Date date;

     @JsonProperty("report")
     private String report;
     
     private UserModel issuedBy;


     public ReportModel() {
     }
     public ReportModel(String reportId,BookingModel appointmentDetail,CaseRecordModel Case_RecordDetail,Date date,String report,UserModel issuedBy){
         super();
         this.reportId=reportId;
         this.appointmentDetail=appointmentDetail;
         this.Case_RecordDetail=Case_RecordDetail;
         this.date=date;
         this.report=report;
         this.issuedBy=issuedBy;
     }
     
}
