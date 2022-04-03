package com.examly.springapp.controller;
import com.examly.springapp.Model.Record;
import com.examly.springapp.Repositorie.RecordRepository;
import com.examly.springapp.Repositorie.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@CrossOrigin(origins = "https://8081-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io")
public class BookingController{
    
    @Autowired
    public RecordRepository RR;

    @Autowired
    public UserRepository userR;
    

    //Accept Booking
    @RequestMapping(method = RequestMethod.POST,value="/Lawyer/booking")
    public int acceptApp(@RequestBody Record ll){
        Record old = RR.findBybooking_id(ll.getBookingid());
        int id_value = old.id();
        Record r = RR.findById(id_value).get();
        r.setConfirm();
        RR.save(r);
        return 2;

    }

    //Delete Booking
    @DeleteMapping(path="/booking/{id}")
    public @ResponseBody int removeBooking(@PathVariable String id){
        RR.deleteById(Integer.parseInt(id));
        return 1;
    }


    //booking POST
    @RequestMapping(method = RequestMethod.POST,value="/booking")
    public int addBooking(@RequestBody Record ll){
       List<Record>res = RR.findByUser_mail(ll.getclient());
       for(int i=0;i<res.size();i++){
           Record r = res.get(i);
           System.out.println(r.getLawyer());
           if(r.getLawyer().equals(ll.getLawyer())){
               if(r.getDate()!=null){
                if(r.getDate().equals(ll.getDate())){
                System.out.println("You have already booked!");
                return 1;
                }
               }
               
           }
       }
       Random r = new Random();
       while(true){
        String ss=String.valueOf(r.nextInt(100000000));  
            if(!RR.ExistById(ss)){
                ll.setBookingid(ss);
                break;  
            }
       }
       System.out.println("Booked");
       RR.save(ll);
       return 2; 
    }



    //Remove booking
    @DeleteMapping(path="/Lawyer/booking/{id}")
    public @ResponseBody int removeBookingbylawyer(@PathVariable String id){
        RR.deleteById(Integer.parseInt(id));
        return 2;
    }
    
    //Get booking id
    @RequestMapping(method = RequestMethod.POST,value="/rejectid")
    public int rejectid(@RequestBody Record ll){
        Record old = RR.findBybooking_id(ll.getBookingid());
        int id_value = old.id();
        System.out.println(id_value);
        return id_value;

    }
}