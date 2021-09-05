/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.projectgroup.tumesa.models;
import java.util.Date;
import java.util.Set;
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
public class Reservation {
    @Id // ??
    @GeneratedValue(strategy = GenerationType.AUTO) 
    private Integer id;
    private Long reservationStart;
    //private String dateFrom;
    //private String dateTo;
    //private String creationTime;
    @ManyToOne()
    @JoinColumn(name = "restaurant_id")        
    private Restaurant restaurant;  
    @ManyToOne() 
    @JoinColumn(name = "user_id")        
    private User user;
    @ManyToOne()
    @JoinColumn(name = "table_id")
    private TableInRestaurant table;
    public Reservation(){};
    public Reservation(Restaurant restaurant, User userId, TableInRestaurant tableId ){
        this.restaurant = restaurant;
        this.user = userId;
        this.table = tableId;
    };
//    public Restaurant getRestaurant(){
//        return this.restaurant;
//    }
//    public void setRestaurant(Restaurant restaurant){
//        this.restaurant = restaurant;
//    }
//    public User getUser(){
//        return this.user;
//    }
//    public void setUser(User user) {
//        this.user = user;
//    }
//    public TableInRestaurant getTableInRestaurant(){
//        return this.table;
//    }
//    public void setTable(TableInRestaurant table){
//        this.tabl e = table;
//    }

           
    
    
    public void setTable(TableInRestaurant table){
        this.table = table;
    }
    public TableInRestaurant getTable(){
         return this.table;
    }
    public void setUser(User user){
        this.user = user;
    }
    public User getUser(){
         return this.user;
    }
    public void setRestaurant(Restaurant restaurant){
        this.restaurant = restaurant;
    }
    public Restaurant getRestaurant(){
         return this.restaurant;
    }
    
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    public Long getReservationStart(){
        return reservationStart;
    }
    public void setReservationStart(Long reservationStart){
        this.reservationStart = reservationStart;
    }

//    public String getDateFrom() {
//        return dateFrom;
//    }
//
//    public void setDateFrom(String dateFrom) {
//        this.dateFrom = dateFrom;
//    }
//
//    public String getDateTo() {
//        return dateTo;
//    }
//
//    public void setDateTo(String dateTo) {
//        this.dateTo = dateTo;
//    }
//
//    public String getCreationTime() {
//        return creationTime;
//    }
//
//    public void setCreationTime(String creationTime) {
//        this.creationTime = creationTime;
//    }
//
//    @Override
//    public String toString() {
//        return "Reservation{" +
//            "id=" + id +
//            ", dateFrom='" + dateFrom + '\'' +
//            ", dateTo='" + dateTo + '\'' +
//            ", creationTime='" + creationTime + '\'' +
//            ", restaurant=" + restaurant +
//            ", user=" + user +
//            ", table=" + table +
//            '}';
//    }
}
