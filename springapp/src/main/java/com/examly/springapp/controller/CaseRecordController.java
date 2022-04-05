package com.examly.springapp.controller;
import com.examly.springapp.Model.CaseRecordModel;
import com.examly.springapp.Model.Record;
import com.examly.springapp.Repositorie.UserRepository;
import com.examly.springapp.Repositorie.RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
    @CrossOrigin(origins = "https://8081-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io")
    @RequestMapping(method = RequestMethod.POST,value="/Lawyer/Case Record")
    public void addCaseRecord(@RequestBody CaseRecordModel ll){
        Record r = new Record();
        r.setAction(ll.getAction());
        r.setCaserecord(ll.getCaseID());
        r.setEvent(ll.getEvent());
        RR.save(r);
    } 

    //update case record
    @CrossOrigin(origins = "https://8081-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io")
    @PutMapping(path="/Lawyer/Case Record")
    public void updateCaseRecord(@RequestBody CaseRecordModel ll, @RequestParam(name = "CaseRecordID") String name){
        Record old = RR.findByCID(name);
        old.setAction(ll.getAction());
        RR.save(old);
    }
    
    //Delete Case Record
    @CrossOrigin(origins = "https://8081-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io")
    @DeleteMapping(path="/Lawyer/Case Record")
    public @ResponseBody void delete_case(@RequestParam("CaseRecordID") String itemid){
        Record old = RR.findByCID(itemid);
        RR.deleteById(old.id());
    }


    //update event and action
    @CrossOrigin(origins = "https://8081-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io")
    @PutMapping(path="/actionevent")
    public int updateAE(@RequestBody Record ll){
        Record old = RR.findBybooking_id(ll.getBookingid());
        old.setAction(ll.getActiontaken());
        old.setEvent(ll.getEventdetails());
        RR.save(old);
        return 1;
    }

    //view CaseRecord
    @CrossOrigin(origins = "https://8081-babeffbeddcfcbbecbcefddccbedbddd.examlyiopb.examly.io")
    @GetMapping("/Case Record/{id}")
    public @ResponseBody CaseRecordModel viewCaseRecord(@PathVariable String id){
        CaseRecordModel cd = new CaseRecordModel();
        Record r = RR.findBybooking_id(id);
        cd.setAction(r.getActiontaken());
        cd.setDate(r.getDate());
        cd.setEvent(r.getEventdetails());
        cd.setCaseID(r.getCaserecordid()); 
        return cd;
    }

    
}
  