/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.projectgroup.tumesa.controller;

/**
 *
 * @author eszug
 */
import com.projectgroup.tumesa.api.ReservationApi;
import com.projectgroup.tumesa.controller.UserController;
import com.projectgroup.tumesa.controller.RestaurantController;
import com.projectgroup.tumesa.controller.ReservationController;
import com.projectgroup.tumesa.models.Reservation;
import com.projectgroup.tumesa.models.ReservationRepository;
import com.projectgroup.tumesa.models.User;
import com.projectgroup.tumesa.models.UserRepository;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.projectgroup.tumesa.models.Restaurant;
import com.projectgroup.tumesa.models.RestaurantCreateToSave;
import com.projectgroup.tumesa.models.RestaurantRepository;
import com.projectgroup.tumesa.models.TableInRestaurantRepository;
import com.projectgroup.tumesa.models.UserRepository;
import com.sun.mail.iap.Response;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.MediaType;

@RestController
public class AdminController {

    
    private final static int PAGE_SIZE = 10;
    @Autowired
    private RestaurantRepository repository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private TableInRestaurantRepository tableRepository;

    @CrossOrigin
    @GetMapping(value = "/admin/restaurants", produces = MediaType.APPLICATION_JSON_VALUE)
    public Collection<Restaurant> restaurants() {
        List<Restaurant> restaurants = repository.findAll();
        if (restaurants != null) {
            return restaurants;
        } else {
            return null;
        }
    }
    
    @CrossOrigin
        @DeleteMapping("/admin/restaurant/{restaurantId}")
        public ResponseEntity<?> deleteRestaurant(@PathVariable Integer restaurantId){
            return repository.findById(restaurantId).map(restaurant ->{
                repository.delete(restaurant);
            return ResponseEntity.ok().build();
            }).orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id " + restaurantId));
        }

    @CrossOrigin
    @GetMapping(value = "/admin/users", produces = MediaType.APPLICATION_JSON_VALUE)
    public Collection<User> users() {
        List<User> users = userRepository.findAll();
        if (users != null) {
            return users;
        } else {
            return null;
        }
    }

    @CrossOrigin
    @GetMapping(value = "/admin/restaurant/{restaurantId}/reservations", produces = MediaType.APPLICATION_JSON_VALUE)
    public ReservationApi allRestaurantReservations(@PathVariable Integer restaurantId,
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
    @GetMapping(value = "/user/{userId}/reservations", produces = MediaType.APPLICATION_JSON_VALUE)
    public ReservationApi userReservations(@PathVariable Long userId,
            @RequestParam(name = "page", required = false) Integer page) {
        page = page == null ? 1 : page;
        int offset = (page - 1) * PAGE_SIZE;
        long count = reservationRepository.countByUserId(userId);
        int pageCount = (int) Math.ceil((double) count / PAGE_SIZE);
        List<Reservation> allByUserId = reservationRepository
                .findAllByUserId(userId, offset, PAGE_SIZE);
        return new ReservationApi(allByUserId, page, pageCount);
    }
    
    @CrossOrigin
    @DeleteMapping("/admin/restaurant/{restaurantId}/reservations/{reservationId}")
    public ResponseEntity<?> deleteReservation(@PathVariable Integer restaurantId,
                                                       @PathVariable Integer reservationId){
        if(!repository.existsById(restaurantId)){
                throw new ResourceNotFoundException("Restaurant not found");
            }
//        if(!tableRepository.existsById(tableId)){
//                throw new ResourceNotFoundException("table not found");
//            }
        //reservationRepository.getOne(reservationId).getTable().setActiv("true");
        Reservation resDel = reservationRepository.getOne(reservationId);
        resDel.getTable().setActiv("true");
        reservationRepository.delete(resDel);
        return ResponseEntity.ok().build();
    }
}
