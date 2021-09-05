///*
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
//package com.projectgroup.tumesa;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import java.io.IOException;
//import javax.servlet.Filter;
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.ServletRequest;
//import javax.servlet.ServletResponse;
//import javax.servlet.http.HttpServletRequest;
//
///**
// *
// * @author eszug
// */
//public class JwtFilter implements javax.servlet.Filter {
//
//    @Override
//    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException{
//        HttpServletRequest httpServletRequest =(HttpServletRequest) servletRequest;
//        String header = httpServletRequest.getHeader("authorization");
//    
//        if(httpServletRequest == null || !header.startsWith("Bearer "))
//        {
//            throw new ServletException("Wrong or empty header");
//        }
//        else
//        {
//            try{
//            String token = header.substring(7);
//            Claims claims = Jwts.parser().setSigningKey("alibaba").parseClaimsJws(token).getBody();
//            servletRequest.setAttribute("claims", claims);
//            }
//            catch (Exception e)
//            {
//                throw new ServletException("Wrong key");
//            }
//        }
//        filterChain.doFilter(servletRequest, servletResponse);
//    }
//}
