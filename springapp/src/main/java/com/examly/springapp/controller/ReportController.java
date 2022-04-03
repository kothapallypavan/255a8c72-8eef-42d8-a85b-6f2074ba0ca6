package com.examly.springapp.controller;
import com.examly.springapp.Model.Record;
import com.examly.springapp.Repositorie.UserRepository;
import com.examly.springapp.Repositorie.RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "https://8081-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io")
public class ReportController{
    

    @Autowired
    public UserRepository userR;

    @Autowired
    public RecordRepository RR;

    //update report 
    @RequestMapping(method = RequestMethod.POST,value="/updatereport")
    public int updatereport(@RequestBody Record ll){
        Record old = RR.findBybooking_id(ll.getBookingid());
        int id_value = old.id();
        Record r = RR.findById(id_value).get();
        r.setReport(ll.getReport());
        RR.save(r);
        return 1;

    }
    

     
    
    
}