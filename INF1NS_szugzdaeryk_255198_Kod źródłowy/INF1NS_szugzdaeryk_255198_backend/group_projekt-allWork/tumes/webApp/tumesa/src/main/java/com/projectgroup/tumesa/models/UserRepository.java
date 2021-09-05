package com.projectgroup.tumesa.models;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.projectgroup.tumesa.models.User;
import java.util.List;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Repository
//@EnableJpaRepositories
public interface UserRepository extends JpaRepository<User, Integer> {

    User findUserById(Long userId);
    
    User findUserByLogin(String Login);

    Optional<User> findByEmail(String email);
    
    //??? czy optional nadpisuje inne metody ?
    //czy nie sypie tu nula
    Optional<User> findById(Long userId);

    Optional<User> findByLoginOrEmail(String login, String email);

    List<User> findByIdIn(List<Long> userIds);

    Optional<User> findByLogin(String login);
    
    Optional<User> findByFirstName(String firstName);
    
    Optional<User> findByLastName(String lastName);
    
    Optional<User> findByPhone(String phone);
    
    

    Boolean existsByLogin(String login);

    Boolean existsByEmail(String email);
}
