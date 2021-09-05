package com.projectgroup.tumesa.controller;

//import com.projectgroup.tumesa.models.Restaurant;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projectgroup.tumesa.models.Restaurant;

@RestController
public class HelloControler {
   
	@RequestMapping("/")
	public String warnign() {
		return "Tutaj główne menu";
	}
	@RequestMapping("/rest")
	public String hello() {
            
            return "Dostępne restauracje";
	}
	
	
}

