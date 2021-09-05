///*
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
//package com.projectgroup.tumesa;
//
//import com.projectgroup.tumesa.models.Reservation;
//import com.projectgroup.tumesa.models.ReservationToSave;
//import com.projectgroup.tumesa.models.Restaurant;
//import com.projectgroup.tumesa.models.TableInRestaurant;
//import com.projectgroup.tumesa.models.User;
//import com.projectgroup.tumesa.verificators.ReservationTimeVerificator;
//import java.util.ArrayList;
//import java.util.LinkedList;
//import java.util.List;
//import org.junit.After;
//import org.junit.AfterClass;
//import org.junit.Before;
//import org.junit.BeforeClass;
//import org.junit.Test;
//import static org.junit.Assert.*;
//import org.junit.runner.RunWith;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.junit4.SpringRunner;
//
///**
// *
// * @author Lukasz
// */
//@RunWith(SpringRunner.class)
//@AutoConfigureMockMvc
//@SpringBootTest(webEnvironment=SpringBootTest.WebEnvironment.RANDOM_PORT)
//public class TImeVerificatorTests {
//
//    
//    private Long timeReservation = Long.valueOf("1592172000000");
//    private Long timeNow = Long.valueOf("1591776000014");
//    
//    private List<ReservationToSave> testReservationList;
//    private List<TableInRestaurant> tableInRestaurantsList;
//    private ReservationTimeVerificator verificator;
//    private Reservation reservation;
//    private Restaurant restaurant; 
//    private TableInRestaurant tableInRestaurant;
//    private User user;
//    
//   
//    @Before
//    public void setUp() {
//        //Restaurant
//        this.restaurant = new Restaurant();
//        this.restaurant.setId(1);
//        
//        //TableInRestaurant
//        this.tableInRestaurantsList = new LinkedList<TableInRestaurant>();
//        this.tableInRestaurantsList.set(0,new TableInRestaurant(){{
//            setId(1);
//            setRestaurant(restaurant);        
//        }});
//        this.tableInRestaurantsList.set(1,new TableInRestaurant(){{
//            setId(2);
//            setRestaurant(restaurant);        
//        }});
//        
//        //User
//        //this.user
//    }
//    
//    @After
//    public void tearDown() {
//    }
//
//    // TODO add test methods here.
//    // The methods must be annotated with annotation @Test. For example:
//    //
//    // @Test
//    // public void hello() {}
//    @Test
//    public void testGetAnswerFromGettingListOfFutureReservationTrueIfNull(){
//        
//        //ReservationTimeVerificator reservationTimeVerificator = new ReservationTimeVerificator();
//        ReservationTimeVerificator.setVariable(timeReservation);
//        boolean answer = ReservationTimeVerificator.reservationTimeWithRestReservationToTest(testReservationList);
//        //boolean answer = ReservationTimeVerificator.checkIfReservationTimeCorrect(timeReservation,2,4,reservationRepository.findReservationFutureForRestaurantAndTable(2, 4, timeNow));
//        //reservationTimeVerificator.reservationTimeWithRestReservation(2, 4, time);
//        //reservationTimeVerificator.reservationTimeWithRestReservation(2,4,time);
//        //assertNotNull(answer);
//        //Long time2 = new Long(ReservationTimeVerificator.calendarTimeNow.get(Calendar.YEAR));
//        //Long year = new Long(ReservationTimeVerificator.reservationTimeStart.get(Calendar.YEAR));
//        assertEquals(false, answer);
//    }
//}
