package com.projectgroup.tumesa.controller;

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
import com.projectgroup.tumesa.models.UserRepository;
import com.sun.mail.iap.Response;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.MediaType;

@RestController
public class RestaurantController {
	@Autowired
	private RestaurantRepository repository;
        @Autowired
        private UserRepository userRepository;
	@CrossOrigin
	@GetMapping(value = "/restaurant",produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<Restaurant> restaurants() {
		List<Restaurant> restaurants = repository.findAll();
		if (restaurants != null) {
			return restaurants;
		} else {
			return null;
		}
	}
        
        @CrossOrigin
        @PostMapping("/restaurant")
        public Restaurant createRestaurant(@Valid @RequestBody RestaurantCreateToSave restaurant){
            Restaurant restaurantToSave = new Restaurant();
            restaurantToSave.setName(restaurant.getName());
            restaurantToSave.setRegon(restaurant.getRegon());
            restaurantToSave.setNip(restaurant.getNip());
            restaurantToSave.setCity(restaurant.getCity());
            restaurantToSave.setStreet(restaurant.getStreet());
            restaurantToSave.setBuildingNumber(restaurant.getBuildingNumber());
            restaurantToSave.setFlatNumber(restaurant.getFlatNumber());
            restaurantToSave.setUser(userRepository.findUserById(restaurant.getUserId()));
            return repository.save(restaurantToSave);
            
        }
        @CrossOrigin
	@GetMapping("/restaurant/{restaurantId}")
	ResponseEntity<?> getGroup(@PathVariable Integer restaurantId){ 
		
		Optional<Restaurant> restaurant = repository.findById(restaurantId);
		return restaurant.map(response -> ResponseEntity.ok().body(response)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	
	}
        @CrossOrigin
        @PutMapping("/restaurant/{restaurantId}")
        public Restaurant updateRestaurant(@PathVariable Integer restaurantId, @Valid @RequestBody Restaurant restaurantRequest){
            
            return repository.findById(restaurantId)
                    .map(restaurant ->{
                        restaurant.setName(restaurantRequest.getName());
                        restaurant.setRegon(restaurantRequest.getRegon());
                        restaurant.setNip(restaurantRequest.getNip());
                        restaurant.setStreet(restaurantRequest.getStreet());
                        restaurant.setBuildingNumber(restaurantRequest.getBuildingNumber());
                        restaurant.setFlatNumber(restaurantRequest.getFlatNumber());
                        return repository.save(restaurant);
                    }).orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id " + restaurantId));
        }
        @CrossOrigin
        @DeleteMapping("/restaurant/{restaurantId}")
        public ResponseEntity<?> deleteRestaurant(@PathVariable Integer restaurantId){
            return repository.findById(restaurantId).map(restaurant ->{
                repository.delete(restaurant);
            return ResponseEntity.ok().build();
            }).orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id " + restaurantId));
        }
}
