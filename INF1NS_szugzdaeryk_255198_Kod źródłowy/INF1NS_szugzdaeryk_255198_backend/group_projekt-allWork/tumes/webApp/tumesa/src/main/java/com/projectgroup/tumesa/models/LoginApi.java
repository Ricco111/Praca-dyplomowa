//
//package com.projectgroup.tumesa.models;
//
//
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import static java.lang.System.currentTimeMillis;
//import static java.time.Instant.now;
//import java.util.Date;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
///**
// *
// * @author eszug
// */
//@RestController
//public class LoginApi {
//    
//    
//    
//    @PostMapping("/login")
//    public String login(@RequestBody User user){
//        
//        long now = System.currentTimeMillis();
//        return Jwts.builder()
//                .setSubject(user.getLogin())
//                .claim("roles","user")
//                .setIssuedAt(new Date(now))
//                .setExpiration(new Date(now + 900000))
//                .signWith(SignatureAlgorithm.HS512, user.getPassword())
//                .compact();
//    }
//    
//}
