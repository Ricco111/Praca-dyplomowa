package com.projectgroup.tumesa.models;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.projectgroup.tumesa.models.Restaurant;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant,Integer> {
	//List<Restaurant> findAll();
        @Override
	Optional<Restaurant> findById(Integer restaurantId);
        Restaurant findRestaurantById(Integer tableId);
        @Query("FROM Restaurant r WHERE r.user.id = :userId")
        Optional<Restaurant> findRestaurantsByOwner(@Param("userId")Long userId);
}
