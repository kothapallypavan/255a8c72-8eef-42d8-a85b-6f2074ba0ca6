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
    
    public String getReportId() {
        return this.reportId;
    }

    public void setReportId(String reportId) {
        this.reportId = reportId;
    }

    public BookingModel getAppointmentDetail() {
        return this.appointmentDetail;
    }

    public void setAppointmentDetail(BookingModel appointmentDetail) {
        this.appointmentDetail = appointmentDetail;
    }

    public CaseRecordModel getCase_RecordDetail() {
        return this.Case_RecordDetail;
    }

    public void setCase_RecordDetail(CaseRecordModel Case_RecordDetail) {
        this.Case_RecordDetail = Case_RecordDetail;
    }

    public Date getDate() {
        return this.date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getReport() {
        return this.report;
    }

    public void setReport(String report) {
        this.report = report;
    }

    public UserModel getIssuedBy() {
        return this.issuedBy;
    }

    public void setIssuedBy(UserModel issuedBy) {
        this.issuedBy = issuedBy;
    }


     
     
}
