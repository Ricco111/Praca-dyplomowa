package com.projectgroup.tumesa;

import com.projectgroup.tumesa.models.RestaurantRepository;
import java.util.stream.Stream;

import org.springframework.boot.CommandLineRunner;
import com.projectgroup.tumesa.models.Restaurant;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;

public class RestaurantInitializer implements CommandLineRunner {
	private final RestaurantRepository repository;
	
	public RestaurantInitializer(RestaurantRepository repository) {
		this.repository = repository;
	}
	@Override
	public void run(String...strings) {
		Stream.of("Restaurant UG","Restaurant GDA","Restaurant").forEach(name ->
		repository.save(new Restaurant()));
	}
}
