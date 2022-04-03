package com.examly.springapp.controller;
import com.examly.springapp.Model.CaseRecordModel;
import com.examly.springapp.Model.Record;
import com.examly.springapp.Repositorie.UserRepository;
import com.examly.springapp.Repositorie.RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "https://8081-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io")
public class CaseRecordController{
    

    @Autowired
    public UserRepository userR;

    @Autowired
    public RecordRepository RR;

    //Add case record
    @RequestMapping(method = RequestMethod.POST,value="/Lawyer/Case Record")
    public int addcaserecord(@RequestBody CaseRecordModel ll){
        Record r = new Record();
        r.setAction(ll.getAction());
        r.setCaserecord(ll.getCaseID());
        r.setEvent(ll.getEvent());
        RR.save(r);
        return 1;

    } 

    //update case record
    @PutMapping(path="/Lawyer/Case Record")
    public int updaterecord(@RequestBody CaseRecordModel ll){
        Record old = RR.findByCID(ll.getCaseID());
        old.setAction(ll.getAction());
        old.setEvent(ll.getEvent());
        RR.save(old);
        return 1;
    }

    //Delete Case Record
    @DeleteMapping(path="/Lawyer/Case Record")
    public @ResponseBody int delete_case(@RequestBody CaseRecordModel ll){
        Record old = RR.findByCID(ll.getCaseID());
        RR.deleteById(old.id());
        return 1;
    }

    //update event and action
    @PutMapping(path="/actionevent")
    public int updateAE(@RequestBody Record ll){
        Record old = RR.findBybooking_id(ll.getBookingid());
        old.setAction(ll.getActiontaken());
        old.setEvent(ll.getEventdetails());
        RR.save(old);
        return 1;
    }
    
}
  