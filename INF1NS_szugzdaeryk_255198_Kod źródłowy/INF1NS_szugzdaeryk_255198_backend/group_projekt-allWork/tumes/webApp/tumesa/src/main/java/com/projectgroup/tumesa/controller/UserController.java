package com.projectgroup.tumesa.controller;

import com.projectgroup.tumesa.api.ReservationApi;
import com.projectgroup.tumesa.models.CurrentUser;
import com.projectgroup.tumesa.models.Reservation;
import com.projectgroup.tumesa.models.ReservationRepository;
import com.projectgroup.tumesa.models.ResourceNotFoundException;
import com.projectgroup.tumesa.models.Restaurant;
import com.projectgroup.tumesa.models.RestaurantRepository;
import com.projectgroup.tumesa.models.User;
import com.projectgroup.tumesa.models.UserPrincipal;
import com.projectgroup.tumesa.models.UserRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import payload.UserProfile;
import payload.UserSummary;

@RestController
public class UserController {

    private final static int PAGE_SIZE = 10;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired RestaurantRepository restaurantRepository;
    
    
    
    
    
    
    
    //Dodane funkcje usera
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getFirstName());
        return userSummary;
    }

//    @GetMapping("/user/checkUsernameAvailability")
//    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
//        Boolean isAvailable = !userRepository.existsByUsername(username);
//        return new UserIdentityAvailability(isAvailable);
//    }
//    @GetMapping("/user/checkEmailAvailability")
//    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
//        Boolean isAvailable = !userRepository.existsByEmail(email);
//        return new UserIdentityAvailability(isAvailable);
//    }
    @CrossOrigin
    @GetMapping(value = "/user/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public UserProfile getUserProfile(@PathVariable Long userId) {
        User user = userRepository.findUserById(userId);
        //.orElseThrow(() -> new ResourceNotFoundException("User", "username", id ));

        UserProfile userProfile = new UserProfile(user.getId(), user.getFirstName(), user.getLastName(), user.getPhone(), user.getEmail(), user.getRolesByNames());

        return userProfile;
    }

//    @GetMapping("/user/{login}")
//    public UserProfile getUserProfile(@PathVariable String login) {
//        User user = userRepository.findUserByLogin(login);
//        //.orElseThrow(() -> new ResourceNotFoundException("User", "username", id ));
//
//        UserProfile userProfile = new UserProfile(user.getId(), user.getFirstName(), user.getLastName(), user.getPhone(), user.getEmail());
//
//        return userProfile;
//    }

    // koniec z 29.05

    
    @CrossOrigin
    @GetMapping(value = "/user/{userId}/reservation", produces = MediaType.APPLICATION_JSON_VALUE)
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
    @GetMapping(value = "/user/{userId}/restaurants")
    public Optional<Restaurant> userRestaurant(@PathVariable Long userId){
        Optional<Restaurant> userRestaurants = restaurantRepository.findRestaurantsByOwner(userId);
        return userRestaurants;
    }
//    @CrossOrigin
//    @GetMapping(value = "/user/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
//    public User getUser(@PathVariable Long userId) {
//        //User user = new User();
//
//        User userById = userRepository.findUserById(userId);
////    if (userById != null) {
////      return userById;
////    } else {
////      throw new RuntimeException("no user");
////    }
//        return userById;
//    }

//    @CrossOrigin
//    @PostMapping(value = "/user", produces = MediaType.APPLICATION_JSON_VALUE)
//    public User addUser(@RequestBody User userRequest) {
//        return userRepository.save(userRequest);
//    }

    @CrossOrigin
    @PatchMapping(value = "/user/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public User updateUser(@PathVariable Long userId, @RequestBody User userRequest) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (userRequest.getEmail() != null) {
                user.setEmail(userRequest.getEmail());
            }
            if (userRequest.getFirstName() != null) {
                user.setFirstName(userRequest.getFirstName());
            }
            if (userRequest.getLastName() != null) {
                user.setLastName(userRequest.getLastName());
            }
            if (userRequest.getPhone() != null) {
                user.setPhone(userRequest.getPhone());
            }
            if (userRequest.getPassword() != null) {
                user.setPassword(userRequest.getPassword());
            }
            return userRepository.save(user);
        } else {
            throw new RuntimeException("no user");
        }
    }

}
