//package com.projectgroup.tumesa;
//
//
//import com.projectgroup.tumesa.controller.HelloControler;
//import org.junit.jupiter.api.Test;
//import org.junit.runner.RunWith;
//
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//
//
//import org.springframework.test.context.junit4.SpringRunner;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.web.servlet.MockMvc;
//
//import static org.hamcrest.Matchers.containsString;
//import org.springframework.boot.test.web.client.TestRestTemplate;
//import org.springframework.boot.web.server.LocalServerPort;
//import org.springframework.test.context.ContextConfiguration;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@RunWith(SpringRunner.class)
////@WebMvcTest(HelloControler.class)
////@ContextConfiguration(classes=TumesaApplication.class)
//@AutoConfigureMockMvc
//@SpringBootTest
//class TumesaApplicationTests {
//    @Autowired
//    private MockMvc mockMvc;
//    
//    @Test
//    public void shouldReturnText() throws Exception{
//        mockMvc.perform(get("/rest")).andDo(print()).andExpect(status().isOk()).andExpect(content().string("Dostępne restauracje"));
//    }
//
//}
////@RunWith(SpringRunner.class)
////@AutoConfigureMockMvc
////@SpringBootTest
////class restaurantControlerIntegrationTests{
//////    @Autowired
//////    private TestRestTemplate restTemplate;
//////    @LocalServerPort
//////    private int port;
////    @Autowired
////    private MockMvc mockMvc;
//////    private String getRootUrl(){
//////        return "http://localhost:" + port;
//////    }
////    @Test
////    public void shouldReturnTextProperly() throws Exception{
////        mockMvc.perform(get("/rest")).andDo(print()).andExpect(status().isOk()).andExpect(content().string("Dostępne restauracje"));
////    }
////}