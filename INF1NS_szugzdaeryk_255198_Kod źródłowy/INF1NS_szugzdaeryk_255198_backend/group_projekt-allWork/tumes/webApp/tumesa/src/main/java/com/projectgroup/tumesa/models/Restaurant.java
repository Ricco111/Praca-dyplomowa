/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.projectgroup.tumesa.models;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
/**
 *
 * @author Lukasz
 */
@Entity
public class Restaurant {
    @Id 
    @GeneratedValue(strategy = GenerationType.AUTO) 
    private Integer id;
    
    private String name;
    private String regon;
    private String nip;
    private String city;
    private String street;
    private String buildingNumber;
    private String flatNumber;
    
    @ManyToOne()
    @JoinColumn(name = "user_id")
    private User user;

    //    @OneToMany (mappedBy = "restaurant",cascade = CascadeType.ALL)
//            Set<TableInRestaurant> table;
//    
//    @OneToMany (mappedBy = "restaurant",cascade = CascadeType.ALL) 
//            Set<Reservation> reservations;
    public Restaurant() {           
    }
    
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRegon() {
        return regon;
    }

    public void setRegon(String regon) {
        this.regon = regon;
    }

    public String getNip() {
        return nip;
    }

    public void setNip(String nip) {
        this.nip = nip;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getBuildingNumber() {
        return buildingNumber;
    }

    public void setBuildingNumber(String buildingNumber) {
        this.buildingNumber = buildingNumber;
    }

    public String getFlatNumber() {
        return flatNumber;
    }

    public void setFlatNumber(String flatNumber) {
        this.flatNumber = flatNumber;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
   

    @Override
    public String toString() {
        return "Restaurant{" + "id=" + id + 
                ", name=" + name + 
                ", regon=" + regon + 
                ", nip=" + nip + 
                ", street=" + street + 
                ", buildingNumber=" + buildingNumber +
                ", flatNumber=" + flatNumber +
                ", user=" + user + '}';
    }
}
