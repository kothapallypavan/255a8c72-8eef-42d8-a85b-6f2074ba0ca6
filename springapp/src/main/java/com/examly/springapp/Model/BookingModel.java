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
     
     
}
