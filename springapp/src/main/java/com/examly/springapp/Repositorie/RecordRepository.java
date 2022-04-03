package com.examly.springapp.Repositorie;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import com.examly.springapp.Model.Record;

@Repository
public interface RecordRepository extends JpaRepository <Record, Integer> {
    
    @Query("select u from Record u where client = ?1")
    public List<Record> findByUser_mail(String mail);

    @Query("select count(u)=1 from Record u where bookingid = ?1")
    public boolean ExistById(@Param("bookingid") String bookingid);

    @Query("update Record set report = ?1 where bookingid = ?2")
    public void updateReport(@Param("report") String report,@Param("bookingid") String bookingid);

    @Query("select u from Record u where bookingid = ?1")
    public Record findBybooking_id(String name);

}

