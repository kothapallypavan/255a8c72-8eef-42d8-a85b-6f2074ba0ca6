package com.examly.springapp.Model;

import java.util.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class BookingModel {


    @JsonProperty("bookingid")
     private String bookingid;

     private UserModel clientDetail;
     
     @JsonProperty("lawfirmName")
     private String lawfirmName;
     
     private Date date;
     private Date time;

     @JsonProperty("bookingStatus")
     private boolean bookingStatus;

    


     public BookingModel() {
     }
     public BookingModel(String bookingid,UserModel clientDetail,String lawfirmName,Date date,Date time,boolean bookingStatus){
         super();
         this.bookingid=bookingid;
         this.clientDetail=clientDetail;
         this.lawfirmName=lawfirmName;
         this.date=date;
         this.time=time;
         this.bookingStatus = bookingStatus;
     }

     public String getBookingid() {
        return this.bookingid;
    }

    public void setBookingid(String bookingid) {
        this.bookingid = bookingid;
    }

    public UserModel getClientDetail() {
        return this.clientDetail;
    }

    public void setClientDetail(UserModel clientDetail) {
        this.clientDetail = clientDetail;
    }

    public String getLawfirmName() {
        return this.lawfirmName;
    }

    public void setLawfirmName(String lawfirmName) {
        this.lawfirmName = lawfirmName;
    }

    public Date getDate() {
        return this.date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Date getTime() {
        return this.time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public boolean isBookingStatus() {
        return this.bookingStatus;
    }

    public void setBookingStatus(boolean bookingStatus) {
        this.bookingStatus = bookingStatus;
    }
     
}
