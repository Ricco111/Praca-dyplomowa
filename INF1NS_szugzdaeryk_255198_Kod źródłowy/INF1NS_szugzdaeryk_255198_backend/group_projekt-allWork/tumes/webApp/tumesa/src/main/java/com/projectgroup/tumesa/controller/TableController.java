package com.projectgroup.tumesa.controller;

import com.projectgroup.tumesa.models.RestaurantRepository;
import java.util.Collection;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.projectgroup.tumesa.models.TableInRestaurant;
import com.projectgroup.tumesa.models.TableInRestaurantToSave;
import com.projectgroup.tumesa.models.TableInRestaurantRepository;
import com.projectgroup.tumesa.models.RestaurantRepository;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class TableController {
        @Autowired
	private TableInRestaurantRepository repositoryTable;
	@Autowired
        private RestaurantRepository repositoryRestaurant;
        
	@CrossOrigin
	@GetMapping("/restaurant/{restaurantId}/table")
	public List<TableInRestaurant> getTables(@PathVariable Integer restaurantId){
            return repositoryTable.findAvailableTableListByTableId(restaurantId);
	}
        @CrossOrigin
        @GetMapping("/restaurant/{restaurantId}/table/{tableId}")
        public Optional<TableInRestaurant> getOneTableById(@PathVariable Integer restaurantId,
                                                            @PathVariable Integer tableId){
            return repositoryTable.findAvailableTableByTableIdAndRestaurantId(restaurantId, tableId);
        }
        
        @CrossOrigin
        @PostMapping("/restaurant/{restaurantId}/table")
        public Optional<TableInRestaurant> createTable(@PathVariable Integer restaurantId,
                                            @Valid @RequestBody TableInRestaurantToSave tableInRestaurant){
            
            return repositoryRestaurant.findById(restaurantId)
                    .map(restaurant -> {
                        TableInRestaurant tableToSave = new TableInRestaurant();
                        tableToSave.setSeatsNumber(tableInRestaurant.getSeatsNumber());
                        tableToSave.setActiv(tableInRestaurant.getActiv());
                        tableToSave.setRestaurant(repositoryRestaurant.findRestaurantById(restaurantId));
                        
                        return repositoryTable.save(tableToSave);
                    });
        }
        
        @CrossOrigin
        @PutMapping("/restaurant/{restaurantId}/table/{tableId}")
        public Optional<TableInRestaurant> updateTable(@PathVariable Integer restaurantId,
                                             @PathVariable Integer tableId,
                                             @Valid @RequestBody TableInRestaurant tableRequest){
            if(!repositoryRestaurant.existsById(restaurantId)){
                throw new ResourceNotFoundException("Restaurant not find");
            }
            return repositoryTable.findById(tableId)
                    .map(table -> {
                    table.setId(tableRequest.getId());
                    table.setSeatsNumber(tableRequest.getSeatsNumber());
                    return repositoryTable.save(table);
                    });
        }
        @CrossOrigin
        @DeleteMapping("/restaurant/{restaurantId}/table/{tableId}")
        public ResponseEntity<?> deleteTable(@PathVariable Integer restaurantId,
                                             @PathVariable Integer tableId){
            if(!repositoryRestaurant.existsById(restaurantId)){
                throw new ResourceNotFoundException("Restaurant not found");
            }
            repositoryTable.deleteById(tableId);
            return ResponseEntity.ok().build();
        }
                                             
	
}
