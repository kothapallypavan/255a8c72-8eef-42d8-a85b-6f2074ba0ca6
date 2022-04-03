package com.examly.springapp.Repositorie;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

import com.examly.springapp.Model.User;

@Repository
public interface UserRepository extends JpaRepository <User, Integer> {
    
    @Query("SELECT count(u)=1 FROM User u WHERE user_name = :username")
    public boolean ExistByName(@Param("username") String user_name);

    @Query("select count(u)=1 from User u where mail = ?1")
    public boolean ExistByMail(@Param("mail") String mail);

    @Query("select count(u)=1 from User u where number = ?1")
    public boolean ExistByNumber(@Param("number") String number);

    @Query("select u from User u where user_name = ?1")
    public List<User> findByUser_name(String user_name);

    @Query("select u from User u where mail = ?1")
    public List<User> findByUser_mail(String mail);

    @Query("select u from User u where is_lawyer = ?1")
    public List<User> find_lawyers(String mail);
}

