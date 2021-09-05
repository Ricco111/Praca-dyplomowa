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
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
/**
 *
 * @author Lukasz
 */
@Entity
public class TableInRestaurant {
    @Id // ??
    @GeneratedValue(strategy = GenerationType.AUTO) 
    private Integer id;
    //public Integer idRestaurant; 
    private Integer seatsNumber;
    private String activ;
    @ManyToOne()
    @JoinColumn(name = "restaurant_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)        
    private Restaurant restaurant;
    
//    @OneToMany (mappedBy = "table",cascade = CascadeType.ALL,fetch = FetchType.EAGER) 
//    Set<Reservation> reservation;
    public TableInRestaurant() {          
    }
    public void setRestaurant(Restaurant restaurant){
        this.restaurant = restaurant;
    }
//    public Restaurant getRestaurant(){
//         return this.restaurant;
//    }
    
    public void setActiv(String activ){
        this.activ = activ;
    }
    public String getActive(){
        return this.activ;
    }
    
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
/*this atribute is adding to this class while creating FK in 
    public Integer getIdRestaurant() {
        return idRestaurant;
    }

    public void setIdRestaurant(Integer id) {
        this.idRestaurant = id;
    }
*/

    public Integer getSeatsNumber() {
        return seatsNumber;
    }

    public void setSeatsNumber(Integer seatsNumber) {
        this.seatsNumber = seatsNumber;
    }

    @Override
    public String toString() {
        return "Table{" + "id=" + id + ", idRestaurant=" + restaurant.getId().shortValue() + ", seatsNumber=" + seatsNumber + '}';
    }
}
