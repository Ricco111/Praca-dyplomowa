///*
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
//package com.projectgroup.tumesa;
//
//import com.projectgroup.tumesa.models.Restaurant;
//import com.projectgroup.tumesa.models.Reservation;
//import com.projectgroup.tumesa.models.TableInRestaurant;
//import com.projectgroup.tumesa.models.User;
//
//import com.projectgroup.tumesa.verificators.ReservationTimeVerificator;
//
//import java.util.LinkedList;
//import java.util.List;
//import static org.hibernate.id.SequenceMismatchStrategy.LOG;
//
//import org.junit.jupiter.api.Test;
//import org.junit.After;
//import static org.junit.Assert.assertEquals;
//import org.junit.Before;
//import org.junit.BeforeClass;
//import org.junit.runner.RunWith;
//import org.junit.runners.JUnit4;
//
///**
// *
// * @author Lukasz
// */
//@RunWith(JUnit4.class)
//public class ReservationTests {
//    private final Long timeReservationDouble = Long.valueOf("1592172000000");
//    private final Long timeReservationNotDouble = Long.valueOf("1592888698617");
//    private final Long timeReservationMoreThan30Days = Long.valueOf("1594894835264");
//    public List<Reservation> testReservationList;
//    private Reservation testReservation1;
//    private Reservation testReservation2;
//    private Reservation testReservation3;
//    private Restaurant restaurant; 
//    private TableInRestaurant tableInRestaurant1;
//    private TableInRestaurant tableInRestaurant2;
//    
//    
//    public void setUp() {
//       
//        testReservationList = new LinkedList<Reservation>();
//        testReservation1 = new Reservation(); 
//        testReservation2 = new Reservation();
//        testReservation3 = new Reservation();
//        //Restaurant
//        this.restaurant = new Restaurant();
//        this.restaurant.setId(1);
//        //TableInRestaurant
//        this.tableInRestaurant1 = new TableInRestaurant();
//        this.tableInRestaurant2 = new TableInRestaurant();
//        tableInRestaurant1.setId(1);
//        tableInRestaurant1.setRestaurant(restaurant);
//        tableInRestaurant2.setId(2);
//        tableInRestaurant2.setRestaurant(restaurant);
//        testReservation1.setId(1);
//        testReservation1.setReservationStart(Long.valueOf("1592172000000"));
//        testReservation1.setRestaurant(restaurant);
//        testReservation1.setTable(tableInRestaurant1);
//        testReservation2.setId(2);
//        testReservation2.setReservationStart(Long.valueOf("1592535600000"));
//        testReservation2.setRestaurant(restaurant);
//        testReservation2.setTable(tableInRestaurant2);
//        testReservation3.setId(1);
//        testReservation3.setReservationStart(Long.valueOf("1591962400000"));
//        testReservation3.setRestaurant(restaurant);
//        testReservation3.setTable(tableInRestaurant1);
//        testReservationList.add(testReservation1);
//        testReservationList.add(testReservation2);
//        testReservationList.add(testReservation3);
//    }
//    
////    @Test
////    public void testCheckIfReservationTimeStartInReservationListCorrectIfReturnFalse(){
////        setUp();
////        ReservationTimeVerificator.setVariable(timeReservationDouble);
////        Boolean answer = ReservationTimeVerificator.checkIfReservationNotInReservationList(testReservationList);
////        assertEquals(false, answer);
////    }
////    @Test
////    public void testCheckIfReservationTimeStartInReservationListCorrectIfReturnTrue(){
////        setUp();
////        ReservationTimeVerificator.setVariable(timeReservationNotDouble);
////        Boolean answer = ReservationTimeVerificator.checkIfReservationNotInReservationList(testReservationList);
////        assertEquals(true, answer);
////    }
//    @Test
//    public void testChechIfGivenReservationTimeInRAngeOf30DaysCorrectIfReturnTrue(){
//        setUp();
//        Boolean answer = ReservationTimeVerificator.chechIfResrvationTimeIn30DaysFromNoweTime(timeReservationNotDouble);
//        assertEquals(true,answer );
//    }
//    @Test
//    public void testChechIfGivenReservationTimeInRAngeOf30DaysCorrectIfReturnFalse(){
//        setUp();
//        Boolean answer = ReservationTimeVerificator.chechIfResrvationTimeIn30DaysFromNoweTime(timeReservationMoreThan30Days);
//        assertEquals(false,answer);
//    }
//}
