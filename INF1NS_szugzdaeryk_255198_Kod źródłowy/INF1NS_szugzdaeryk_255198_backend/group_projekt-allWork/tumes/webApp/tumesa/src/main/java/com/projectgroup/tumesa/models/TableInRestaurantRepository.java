package com.projectgroup.tumesa.models;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface TableInRestaurantRepository extends JpaRepository<TableInRestaurant, Integer> {
	//@Query("SELECT id FROM table_in_restaurant t WHERE t.restaurant_id = :restNum")
	//List<Integer> findTablesId(@Param("restNum") Integer restNum);
	//Optional<TableInRestaurant> findByIdRestaurant(Integer idRestaurant);
	//List<TableInRestaurant> findByIdRestaurant(Integer idRestaurant);
        @Query("FROM TableInRestaurant table where table.restaurant.id = :Idrestaurant and table.activ = 'true'")
        List<TableInRestaurant> findAvailableTableListByTableId(@Param("Idrestaurant") Integer Idrestaurant);
	List<TableInRestaurant> findByRestaurantId(Integer restaurantId);
        Optional<TableInRestaurant> findByIdAndRestaurantId(Integer id, Integer restaurantId);
        @Query("FROM TableInRestaurant table where table.restaurant.id = :Idrestaurant and table.id = :Idtable and table.activ = 'true'")
        Optional<TableInRestaurant> findAvailableTableByTableIdAndRestaurantId(@Param("Idrestaurant") Integer Idrestaurant, @Param("Idtable") Integer Idtable);
        TableInRestaurant findTableById(Integer id);
        
}
