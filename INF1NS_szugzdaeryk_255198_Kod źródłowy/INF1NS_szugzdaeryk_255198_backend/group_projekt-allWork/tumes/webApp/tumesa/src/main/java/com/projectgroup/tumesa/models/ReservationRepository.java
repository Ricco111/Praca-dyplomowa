/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.projectgroup.tumesa.models;

import java.util.List;
import java.util.Optional;
import javax.persistence.TypedQuery;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Lukasz
 */
@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer>{
    
    @Query(value = "Select r.* from reservation r where r.restaurant_id = :idrestaurant limit :offset, :limit", nativeQuery = true)
    List<Reservation> findAllByRestaurantId(@Param("idrestaurant") Integer idrestaurant, @Param("offset") Integer offset, @Param("limit") Integer limit);

    @Query("SELECT COUNT(r) FROM Reservation r WHERE r.restaurant.id = :idrestaurant")
    Long countByRestaurantId(@Param("idrestaurant") Integer idrestaurant);

    @Query(value = "Select r.* from reservation r where r.user_id = :iduser limit :offset, :limit", nativeQuery = true)
    List<Reservation> findAllByUserId(@Param("iduser") Long iduser, @Param("offset") Integer offset, @Param("limit") Integer limit);

    @Query("SELECT COUNT(r) FROM Reservation r WHERE r.user.id = :iduser")
    Long countByUserId(@Param("iduser") Long iduser);


    //List<Reservation> findAll();
    List<Reservation> findByRestaurantId(Integer id);
    //@Query("SELECT id,  restaurant_id, client_id, table_id\n FROM Reservation where restaurant_id = 1")
    //Optional<Reservation> QueryfindById();
    @Query("FROM Reservation r where r.restaurant.id = :Idrestaurant and r.table.id = :Idtable")
   List<Reservation> findAllByCurrentRestaurantAndTableListReservation(@Param("Idrestaurant") Integer Idrestaurant,@Param("Idtable") Integer Idtable);
   @Query("FROM Reservation r where r.restaurant.id = :Idrestaurant and r.id = :Idreservation and r.table.id = :Idtable")
   Optional<Reservation> findAllByCurrentRestaurantAndTableOneReservation(@Param("Idrestaurant") Integer Idrestaurant, @Param("Idreservation") Integer Idreservation,@Param("Idtable") Integer Idtable);
   @Query("FROM Reservation r where r.restaurant.id = :Idrestaurant and r.table.id = :Idtable ")
   List<Reservation> findReservationFutureForRestaurantAndTable(@Param("Idrestaurant") Integer Idrestaurant, @Param("Idtable") Integer Idtable);
    public Optional<Reservation> findAllById(int i);
}
