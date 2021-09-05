/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.projectgroup.tumesa.models;

/**
 *
 * @author Lukasz
 */
public class ReservationToSave {
    private Integer restaurantId;
    private Integer tableId;
    private Long userId;
    private Long reservationStart;
    
    public Long getReservationStart(){
        return reservationStart;
    }
    public void setReservationStart(Long reservationStart){
        this.reservationStart = reservationStart;
    }
    
    public Integer getRestaurantId(){
        return restaurantId;
    }
    public void setRestaurantId(Integer id){
        this.restaurantId = id;
    }
    public Integer getTableId(){
        return tableId;
    }
    public void setTableId(Integer id){
        this.tableId = id;
    }
    public Long getUserId(){
        return userId;
    }
    public void setUserId(Long id){
        this.userId = id;
    }
}
    
