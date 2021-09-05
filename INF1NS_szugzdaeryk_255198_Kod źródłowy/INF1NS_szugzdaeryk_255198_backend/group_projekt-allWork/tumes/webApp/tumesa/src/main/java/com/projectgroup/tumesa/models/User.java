/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.projectgroup.tumesa.models;

import com.projectgroup.tumesa.models.DateAudit;
import org.hibernate.annotations.NaturalId;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

//import javax.persistence.CascadeType;
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.JoinColumn;
//import javax.persistence.JoinTable;
//import javax.persistence.ManyToMany;
//import javax.persistence.OneToMany;
//import javax.persistence.Table;
//import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
//import org.springframework.context.annotation.Role;

/**
 *
 * @author eszug
 */
@Entity

public class User extends DateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "firstname")
    @NotNull
    private String firstName;

    @Column(name = "lastname")
    @NotNull
    private String lastName;

    @NaturalId
    @Column(name = "email")
    @NotNull
    @Email
    private String email;

    @Column(name = "phone")
    @NotNull
    private String phone;

    @Column(name = "login")
    @NotNull
    private String login;

    @Column(name = "password")
    @NotNull
    private String password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();
    //relacja wiele do wielu
    //user_role jest złączeniem(pobiera user_id i role_id w jedno

//    @OneToMany (mappedBy = "user",cascade = CascadeType.ALL) 
//            Set<Reservation> reservations;
    public User() {
    }

    public User(String firstName, String lastName, String email, String phone, String login, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.login = login;
        this.password = password;
    }
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    //MA NIEBYĆ DOPISUJE NIEPOTRZEBNE DANE
//    public Set<Reservation> getReservations() {
//        return reservations;
//    }
//
//    public void setReservations(Set<Reservation> reservations) {
//        this.reservations = reservations;
//    }
    public Set<Role> getRoles() {
        return roles;
    }
    
    public Set<String> getRolesByNames() {
        Set<String> rolesTable = new HashSet<>();
        roles.forEach(role -> rolesTable.add(role.getName().toString()));
        return rolesTable;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

//    @Override
//    public String toString() {
//        return "User{" + "id=" + id
//                + ", firstname=" + firstName
//                + ", lastname=" + lastName
//                + ", email=" + email
//                + ", phone=" + phone;
//    }
}
