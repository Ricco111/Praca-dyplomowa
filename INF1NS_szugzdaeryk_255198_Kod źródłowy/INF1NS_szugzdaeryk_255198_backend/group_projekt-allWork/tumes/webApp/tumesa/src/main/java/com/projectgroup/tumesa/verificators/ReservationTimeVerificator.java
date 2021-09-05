/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.projectgroup.tumesa.verificators;

import com.projectgroup.tumesa.models.ReservationToSave;
import java.time.ZonedDateTime;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.TimeZone;
import java.util.List;
import com.projectgroup.tumesa.models.ReservationRepository;
import com.projectgroup.tumesa.models.Reservation;
import java.util.LinkedList;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import org.springframework.beans.factory.annotation.Autowired;
/**
 *
 * @author Lukasz
 */
public class  ReservationTimeVerificator {
    
    public static Calendar calendarTimeNow = Calendar.getInstance();
    
    public static Calendar reservationTimeStart = Calendar.getInstance();
    @Autowired
    private ReservationRepository reservationRepository;
    
    private static Long nowYear ;
    private static Long nowMount;
    private static Long nowDay;
    private static Long reservationYear;
    private static Long reservationMounth;
    private static Long reservationDay;
    //private static Long rangeDays = TimeUnit.DAYS.toMillis(30);
    //public static Long time = Long.valueOf("1591699700000");
    
//    public ReservationTimeVerificator() {
//        
//       this.calendarTimeNow = Calendar.getInstance();
//       this.reservationTimeStart = Calendar.getInstance();
//       //this.reservationTimeStart.setTimeInMillis(reservationStart);
//       this.calendarTimeNow.setTimeInMillis(ZonedDateTime.now().toInstant().toEpochMilli());
//       this.nowYear = Long.valueOf(calendarTimeNow.get(Calendar.YEAR));
//       this.nowMount = Long.valueOf(calendarTimeNow.get(Calendar.MONTH));
//       this.nowDay = Long.valueOf(calendarTimeNow.get(Calendar.DAY_OF_MONTH));
//       
////       this.reservationTimeStart.setTimeInMillis(reservationTimeStart);
////       this.reservationYear = Long.valueOf(this.reservationTimeStart.get(Calendar.YEAR));
////       this.reservationMounth = Long.valueOf(this.reservationTimeStart.get(Calendar.MONTH));
////       this.reservationDay  = Long.valueOf(this.reservationTimeStart.get(Calendar.DAY_OF_MONTH));
////       
//       
//    }
//    
//    private void setReservationTimeStart(){
//        this.reservationTimeStart.setTimeInMillis(reservationTimeMilisec);
//    }
//    private Calendar getReservationTimeStart(){
//        return
//    }
//    public Long getReservationStart(){
//    return this.reservationTimeStart.getTimeInMillis();
//    }
    
    public static void setVariable(Long reservationTimeStart){
       ReservationTimeVerificator.calendarTimeNow.setTimeInMillis(ZonedDateTime.now().toInstant().toEpochMilli());
       ReservationTimeVerificator.nowYear = Long.valueOf(ReservationTimeVerificator.calendarTimeNow.get(Calendar.YEAR));
       ReservationTimeVerificator.nowMount = Long.valueOf(ReservationTimeVerificator.calendarTimeNow.get(Calendar.MONTH));
       ReservationTimeVerificator.nowDay = Long.valueOf(ReservationTimeVerificator.calendarTimeNow.get(Calendar.DAY_OF_MONTH));
       
       ReservationTimeVerificator.reservationTimeStart.setTimeInMillis(reservationTimeStart);
       ReservationTimeVerificator.reservationYear = Long.valueOf(ReservationTimeVerificator.reservationTimeStart.get(Calendar.YEAR));
       ReservationTimeVerificator.reservationMounth = Long.valueOf(ReservationTimeVerificator.reservationTimeStart.get(Calendar.MONTH));
       ReservationTimeVerificator.reservationDay  = Long.valueOf(ReservationTimeVerificator.reservationTimeStart.get(Calendar.DAY_OF_MONTH));
    }
//    public static boolean checkIfReservationTimeCorrect(Long reservationTimeStart, Integer restaurantId,Integer tableId,List<Reservation> reservationList){
//       
//       
//        boolean answer = true;
//        if (ReservationTimeVerificator.nowYear == ReservationTimeVerificator.reservationYear) {
//            if(ReservationTimeVerificator.nowMount == ReservationTimeVerificator.reservationMounth){
//                if(ReservationTimeVerificator.nowDay < ReservationTimeVerificator.reservationDay){
//                    answer = ReservationTimeVerificator.reservationTimeWithRestReservation(reservationList);
//                    
//                }
//                else{
//                    answer = false;
//                }
//            }
//            else {
//                answer = false;
//            }
//        }
//        return answer;        
//    }
    
    public static boolean checkIfReservationNotInReservationList(List<Reservation> reservationList){
        
        Calendar reservationTimeInReservationList = Calendar.getInstance();
        //boolean answer = true;
        for(Reservation reservation : reservationList){
            reservationTimeInReservationList.setTimeInMillis(reservation.getReservationStart());
            if(reservationTimeInReservationList.get(Calendar.DAY_OF_YEAR) == reservationTimeStart.get(Calendar.DAY_OF_YEAR)){
                return false;
            }
        }
        return true;
    }
    public static boolean chechIfResrvationTimeIn30DaysFromNoweTime(Long reservationTime){
        Long daysRangeForReservation = Long.valueOf("2592000000");
        if(reservationTime > (calendarTimeNow.getTimeInMillis()+ daysRangeForReservation) ){
            return false;
        }
        return true;        
    }
    
}
