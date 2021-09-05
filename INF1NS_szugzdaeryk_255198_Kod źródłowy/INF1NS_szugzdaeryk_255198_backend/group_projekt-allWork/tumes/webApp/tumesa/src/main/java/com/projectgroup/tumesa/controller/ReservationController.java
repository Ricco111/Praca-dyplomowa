/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.projectgroup.tumesa.controller;

import com.projectgroup.tumesa.api.ReservationApi;
import com.projectgroup.tumesa.models.ReservationRepository;
import com.projectgroup.tumesa.models.RestaurantRepository;
import com.projectgroup.tumesa.models.TableInRestaurantRepository;
import com.projectgroup.tumesa.models.UserRepository;
import com.projectgroup.tumesa.models.Reservation;
import com.projectgroup.tumesa.models.Restaurant;
import com.projectgroup.tumesa.models.TableInRestaurant;
import com.projectgroup.tumesa.models.User;
import com.projectgroup.tumesa.models.ReservationToSave;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import net.minidev.json.JSONObject;
import org.hibernate.mapping.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.CacheControl;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.projectgroup.tumesa.verificators.ReservationTimeVerificator;

/**
 *
 * @author Lukasz
 */
@RestController
public class ReservationController {

    private final static int PAGE_SIZE = 10;

    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private RestaurantRepository restaurantRespository;
    @Autowired
    private TableInRestaurantRepository tableRepository;
    @Autowired
    private UserRepository userRepository;
    private ReservationTimeVerificator verifivationTime;
    
    @CrossOrigin
    @GetMapping(value = "/restaurant/{restaurantId}/reservation",produces = MediaType.APPLICATION_JSON_VALUE)
    public ReservationApi restaurantReservations(@PathVariable Integer restaurantId,
        @RequestParam(name = "page", required = false) Integer page) {
        page = page == null ? 1 : page;
        int offset = (page - 1) * PAGE_SIZE;
        long count = reservationRepository.countByRestaurantId(restaurantId);
        int pageCount = (int) Math.ceil((double) count / PAGE_SIZE);
        List<Reservation> allByRestaurantId = reservationRepository
            .findAllByRestaurantId(restaurantId, offset, PAGE_SIZE);
        return new ReservationApi(allByRestaurantId, page, pageCount);
    }

    @CrossOrigin
    @GetMapping(value = "/restaurant/{restaurantId}/table/{tableId}/reservation",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Reservation>> reservationsInRestaurant(@PathVariable(value = "restaurantId") Integer restaurantId,
                                                                      @PathVariable(value = "tableId") Integer tableId) {
        
        return ResponseEntity.ok().cacheControl(CacheControl.noCache()).body(reservationRepository.findAllByCurrentRestaurantAndTableListReservation(restaurantId,tableId));
        
    }
    @CrossOrigin
    @GetMapping("/restaurant/{id}/table/{tableId}/reservation/{idReservation}")
    public  Optional<Reservation> reservation(@PathVariable(value = "id") Integer id, 
                                              @PathVariable(value = "tableId") Integer tableId,
                                             @PathVariable(value = "idReservation") Integer idReservation) {
        Optional<Reservation> reservation = reservationRepository.findAllByCurrentRestaurantAndTableOneReservation(id,tableId,idReservation);
        
        return reservation;
       }
    @CrossOrigin
    @PostMapping("/restaurant/{restaurantId}/table/{tableId}/reservation")
        public Reservation createReservation(@Valid @RequestBody ReservationToSave reservation)
                                            {
            ReservationTimeVerificator.setVariable(reservation.getReservationStart());
            
            boolean checkIfReservationInReservationList = ReservationTimeVerificator.checkIfReservationNotInReservationList(
                                                          reservationRepository.findReservationFutureForRestaurantAndTable(
                                                          reservation.getRestaurantId(), reservation.getTableId()));
            boolean chechIfResrvationTimeIn30DaysFromNoweTime = ReservationTimeVerificator.chechIfResrvationTimeIn30DaysFromNoweTime(reservation.getReservationStart());
            if(checkIfReservationInReservationList == true){
                if(chechIfResrvationTimeIn30DaysFromNoweTime == true){
                Reservation reseravationToSave = new Reservation(); 
                reseravationToSave.setRestaurant(restaurantRespository.findRestaurantById(reservation.getRestaurantId()));
                reseravationToSave.setTable(tableRepository.findTableById(reservation.getTableId()));
                tableRepository.findTableById(reservation.getTableId()).setActiv("true");
                reseravationToSave.setUser(userRepository.findUserById(reservation.getUserId()));
                reseravationToSave.setReservationStart(reservation.getReservationStart());
                return reservationRepository.save(reseravationToSave);
                }
            }
            return null;
        }
    
    @CrossOrigin
    @DeleteMapping("/restaurant/{restaurantId}/table/{tableId}/reservation/{reservationId}")
    public ResponseEntity<?> deleteReservation(@PathVariable Integer restaurantId,
                                                       @PathVariable Integer tableId,
                                                       @PathVariable Integer reservationId){
        if(!restaurantRespository.existsById(restaurantId)){
                throw new ResourceNotFoundException("Restaurant not found");
            }
        if(!tableRepository.existsById(tableId)){
                throw new ResourceNotFoundException("table not found");
            }
        //reservationRepository.getOne(reservationId).getTable().setActiv("true");
        Reservation resDel = reservationRepository.getOne(reservationId);
        resDel.getTable().setActiv("true");
        reservationRepository.delete(resDel);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/reservation/{reservationId}")
    public ResponseEntity<?> deleteReservation2(@PathVariable Integer reservationId){
        // Sprawdzac czy istnieje i usunac,
        Reservation resDel = reservationRepository.getOne(reservationId);
        resDel.getTable().setActiv("true");
        reservationRepository.delete(resDel);
        return ResponseEntity.ok().build();
    }

   
}