package com.projectgroup.tumesa;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import javax.servlet.Filter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
//import com.projectgroup.tumesa.models.Reservation;
//import com.projectgroup.tumesa.models.Restaurant;

//import com.projectgroup.tumesa.models.TableInRestaurant;
//import com.projectgroup.tumesa.models.Client;
//import lombok.RequiredArgsConstructor;
//import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;
import javax.annotation.PostConstruct;
import java.util.TimeZone;

@SpringBootApplication
@EntityScan(basePackageClasses = { 
		TumesaApplication.class,
		Jsr310JpaConverters.class 
})
public class TumesaApplication {
    
    
    @PostConstruct
	void init() {
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
	}

    public static void main(String[] args) {        
        SpringApplication.run(TumesaApplication.class, args);
    }
      
    
//    @Bean
//    public FilterRegistrationBean filterRegistrationBean() {
//        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
//        filterRegistrationBean.setFilter(new JwtFilter());
//        filterRegistrationBean.setUrlPatterns(Collections.singleton("/rest"));
//        return filterRegistrationBean;
//    }
//
//    @Bean
//    public FilterRegistrationBean filterRegistrationBean1() {
//        FilterRegistrationBean filterRegistrationBean1 = new FilterRegistrationBean();
//        filterRegistrationBean1.setFilter(new JwtFilter());
//        filterRegistrationBean1.setUrlPatterns(Collections.singleton("/restaurant"));
//        return filterRegistrationBean1;
//    }
//
//    @Bean
//    public FilterRegistrationBean filterRegistrationBean2() {
//        FilterRegistrationBean filterRegistrationBean2 = new FilterRegistrationBean();
//        filterRegistrationBean2.setFilter(new JwtFilter());
//        filterRegistrationBean2.setUrlPatterns(Collections.singleton("/restaurant/{restaurantId}/reservation"));
//        return filterRegistrationBean2;
//    }
//
//    @Bean
//    public FilterRegistrationBean filterRegistrationBean3() {
//        FilterRegistrationBean filterRegistrationBean3 = new FilterRegistrationBean();
//        filterRegistrationBean3.setFilter(new JwtFilter());
//        filterRegistrationBean3.setUrlPatterns(Collections.singleton("/restaurant/{restaurantId}/table/{tableId}/reservation"));
//        return filterRegistrationBean3;
//    }
//
//    @Bean
//    public FilterRegistrationBean filterRegistrationBean4() {
//        FilterRegistrationBean filterRegistrationBean4 = new FilterRegistrationBean();
//        filterRegistrationBean4.setFilter(new JwtFilter());
//        filterRegistrationBean4.setUrlPatterns(Collections.singleton("/restaurant/{id}/table/{tableId}/reservation/{idReservation}"));
//        return filterRegistrationBean4;
//    }
//
//    @Bean
//    public FilterRegistrationBean filterRegistrationBean5() {
//        FilterRegistrationBean filterRegistrationBean5 = new FilterRegistrationBean();
//        filterRegistrationBean5.setFilter(new JwtFilter());
//        filterRegistrationBean5.setUrlPatterns(Collections.singleton("/restaurant/{restaurantId}/table/{tableId}/reservation/"));
//        return filterRegistrationBean5;
//    }
//
//    @Bean
//    public FilterRegistrationBean filterRegistrationBean6() {
//        FilterRegistrationBean filterRegistrationBean6 = new FilterRegistrationBean();
//        filterRegistrationBean6.setFilter(new JwtFilter());
//        filterRegistrationBean6.setUrlPatterns(Collections.singleton("/restaurant/{restaurantId}/table/{tableId}/reservation/{reservationId}"));
//        return filterRegistrationBean6;
//    }
//
//    @Bean
//    public FilterRegistrationBean filterRegistrationBean7() {
//        FilterRegistrationBean filterRegistrationBean7 = new FilterRegistrationBean();
//        filterRegistrationBean7.setFilter(new JwtFilter());
//        filterRegistrationBean7.setUrlPatterns(Collections.singleton("/restaurant/{restaurantId}"));
//        return filterRegistrationBean7;
//    }
//
//    @Bean
//    public FilterRegistrationBean filterRegistrationBean8() {
//        FilterRegistrationBean filterRegistrationBean8 = new FilterRegistrationBean();
//        filterRegistrationBean8.setFilter(new JwtFilter());
//        filterRegistrationBean8.setUrlPatterns(Collections.singleton("/restaurant/{restaurantId}/table"));
//        return filterRegistrationBean8;
//    }
//
//    @Bean
//    public FilterRegistrationBean filterRegistrationBean9() {
//        FilterRegistrationBean filterRegistrationBean9 = new FilterRegistrationBean();
//        filterRegistrationBean9.setFilter(new JwtFilter());
//        filterRegistrationBean9.setUrlPatterns(Collections.singleton("/restaurant/{restaurantId}/table/{tableId}"));
//        return filterRegistrationBean9;
//    }
//
//    @Bean
//    public FilterRegistrationBean filterRegistrationBean10() {
//        FilterRegistrationBean filterRegistrationBean10 = new FilterRegistrationBean();
//        filterRegistrationBean10.setFilter(new JwtFilter());
//        filterRegistrationBean10.setUrlPatterns(Collections.singleton("/user/{userId}/reservation"));
//        return filterRegistrationBean10;
//    }
//
//    @Bean
//    public FilterRegistrationBean filterRegistrationBean11() {
//        FilterRegistrationBean filterRegistrationBean11 = new FilterRegistrationBean();
//        filterRegistrationBean11.setFilter(new JwtFilter());
//        filterRegistrationBean11.setUrlPatterns(Collections.singleton("/user/{userId}"));
//        return filterRegistrationBean11;
//    }
//
//    @Bean
//    public FilterRegistrationBean filterRegistrationBean12() {
//        FilterRegistrationBean filterRegistrationBean12 = new FilterRegistrationBean();
//        filterRegistrationBean12.setFilter(new JwtFilter());
//        filterRegistrationBean12.setUrlPatterns(Collections.singleton("/user"));
//        return filterRegistrationBean12;
//    }

    
//      @Bean
//        public FilterRegistrationBean filterRegistrationBean() {
//        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
//        filterRegistrationBean.setFilter(new JwtFilter());
//        List<String> urls = new ArrayList<String>();
//        urls.add("/rest");
//        urls.add("/restaurant");
//        urls.add("/restaurant/{restaurantId}/reservation");
//        urls.add("/restaurant/{restaurantId}/table/{tableId}/reservation");
//        urls.add("/restaurant/{id}/table/{tableId}/reservation/{idReservation}");
//        urls.add("/restaurant/{restaurantId}/table/{tableId}/reservation/");
//        urls.add("/restaurant/{restaurantId}/table/{tableId}/reservation/{reservationId}");
//        urls.add("/restaurant/{restaurantId}");
//        urls.add("/restaurant/{restaurantId}/table");
//        urls.add("/restaurant/{restaurantId}/table/{tableId}");
//        urls.add("/user/{userId}/reservation");
//        urls.add("/user/{userId}");
//        urls.add("/user");
//        filterRegistrationBean.setUrlPatterns(urls);
//        return filterRegistrationBean;
//    }

 //to jet to   
//    @Bean
//        public FilterRegistrationBean filterRegistrationBean() {
//        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
//        filterRegistrationBean.setFilter(new JwtFilter());
//        List<String> urls = new ArrayList<String>();
//        urls.add("/rest");
//        urls.add("/restaurant/*");
//        urls.add("/user/*");
//        
//        filterRegistrationBean.setUrlPatterns(urls);
//        return filterRegistrationBean;
//    }
    
//       filterRegistrationBean.setUrlPatterns(Collections.singleton("/rest"));
//        filterRegistrationBean.setUrlPatterns(Collections.singleton("/restaurant"));
//        filterRegistrationBean.setUrlPatterns(Collections.singleton("/restaurant/{restaurantId}/reservation"));
//        filterRegistrationBean.setUrlPatterns(Collections.singleton("/restaurant/{restaurantId}/table/{tableId}/reservation"));
//        filterRegistrationBean.setUrlPatterns(Collections.singleton("/restaurant/{id}/table/{tableId}/reservation/{idReservation}"));
//        filterRegistrationBean.setUrlPatterns(Collections.singleton("/restaurant/{restaurantId}/table/{tableId}/reservation/"));
//        filterRegistrationBean.setUrlPatterns(Collections.singleton("/restaurant/{restaurantId}/table/{tableId}/reservation/{reservationId}"));
//        filterRegistrationBean.setUrlPatterns(Collections.singleton("/restaurant/{restaurantId}"));
//        filterRegistrationBean.setUrlPatterns(Collections.singleton("/restaurant/{restaurantId}/table"));
//        filterRegistrationBean.setUrlPatterns(Collections.singleton("/restaurant/{restaurantId}/table/{tableId}"));
//        filterRegistrationBean.setUrlPatterns(Collections.singleton("/user/{userId}/reservation"));
//        filterRegistrationBean.setUrlPatterns(Collections.singleton("/user/{userId}"));
//        filterRegistrationBean.setUrlPatterns(Collections.singleton("/user"));
//        return filterRegistrationBean;
    
    
//    @Bean
//    public FilterRegistrationBean filterRegistrationBean() {
//        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
//        filterRegistrationBean.setFilter(new JwtFilter());
//        filterRegistrationBean.setUrlPatterns(Collections.singleton("/rest"));
//        return filterRegistrationBean;
//    }
//
//    @Bean(name="filterRegistrationBean1")
//    public FilterRegistrationBean filterRegistrationBean() {
//        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
//        filterRegistrationBean.setFilter(new JwtFilter());
//        filterRegistrationBean.setUrlPatterns(Collections.singleton("/restaurant"));
//        return filterRegistrationBean;
//    }
//
//    @Bean(name="filterRegistrationBean2")
//    public FilterRegistrationBean filterRegistrationBean2() {
//        FilterRegistrationBean filterRegistrationBean2 = new FilterRegistrationBean();
//        filterRegistrationBean2.setFilter(new JwtFilter());
//        filterRegistrationBean2.setUrlPatterns(Collections.singleton("/restaurant/{restaurantId}/reservation"));
//        return filterRegistrationBean2;
//    }
//
//    @Bean(name="filterRegistrationBean3")
//    public FilterRegistrationBean filterRegistrationBean3() {
//        FilterRegistrationBean filterRegistrationBean3 = new FilterRegistrationBean();
//        filterRegistrationBean3.setFilter(new JwtFilter());
//        filterRegistrationBean3.setUrlPatterns(Collections.singleton("/restaurant/{restaurantId}/table/{tableId}/reservation"));
//        return filterRegistrationBean3;
//    }
//
//    @Bean(name="filterRegistrationBean4")
//    public FilterRegistrationBean filterRegistrationBean4() {
//        FilterRegistrationBean filterRegistrationBean4 = new FilterRegistrationBean();
//        filterRegistrationBean4.setFilter(new JwtFilter());
//        filterRegistrationBean4.setUrlPatterns(Collections.singleton("/restaurant/{id}/table/{tableId}/reservation/{idReservation}"));
//        return filterRegistrationBean4;
//    }
//
//    @Bean(name="filterRegistrationBean5")
//    public FilterRegistrationBean filterRegistrationBean5() {
//        FilterRegistrationBean filterRegistrationBean5 = new FilterRegistrationBean();
//        filterRegistrationBean5.setFilter(new JwtFilter());
//        filterRegistrationBean5.setUrlPatterns(Collections.singleton("/restaurant/{restaurantId}/table/{tableId}/reservation/"));
//        return filterRegistrationBean5;
//    }
//
//    @Bean(name="filterRegistrationBean6")
//    public FilterRegistrationBean filterRegistrationBean6() {
//        FilterRegistrationBean filterRegistrationBean6 = new FilterRegistrationBean();
//        filterRegistrationBean6.setFilter(new JwtFilter());
//        filterRegistrationBean6.setUrlPatterns(Collections.singleton("/restaurant/{restaurantId}/table/{tableId}/reservation/{reservationId}"));
//        return filterRegistrationBean6;
//    }
//
//    @Bean(name="filterRegistrationBean7")
//    public FilterRegistrationBean filterRegistrationBean7() {
//        FilterRegistrationBean filterRegistrationBean7 = new FilterRegistrationBean();
//        filterRegistrationBean7.setFilter(new JwtFilter());
//        filterRegistrationBean7.setUrlPatterns(Collections.singleton("/restaurant/{restaurantId}"));
//        return filterRegistrationBean7;
//    }
//
//    @Bean(name="filterRegistrationBean8")
//    public FilterRegistrationBean filterRegistrationBean8() {
//        FilterRegistrationBean filterRegistrationBean8 = new FilterRegistrationBean();
//        filterRegistrationBean8.setFilter(new JwtFilter());
//        filterRegistrationBean8.setUrlPatterns(Collections.singleton("/restaurant/{restaurantId}/table"));
//        return filterRegistrationBean8;
//    }
//
//    @Bean(name="filterRegistrationBean9")
//    public FilterRegistrationBean filterRegistrationBean9() {
//        FilterRegistrationBean filterRegistrationBean9 = new FilterRegistrationBean();
//        filterRegistrationBean9.setFilter(new JwtFilter());
//        filterRegistrationBean9.setUrlPatterns(Collections.singleton("/restaurant/{restaurantId}/table/{tableId}"));
//        return filterRegistrationBean9;
//    }
//
//    @Bean(name="filterRegistrationBean10")
//    public FilterRegistrationBean filterRegistrationBean10() {
//        FilterRegistrationBean filterRegistrationBean10 = new FilterRegistrationBean();
//        filterRegistrationBean10.setFilter(new JwtFilter());
//        filterRegistrationBean10.setUrlPatterns(Collections.singleton("/user/{userId}/reservation"));
//        return filterRegistrationBean10;
//    }
//
//    @Bean(name="filterRegistrationBean11")
//    public FilterRegistrationBean filterRegistrationBean11() {
//        FilterRegistrationBean filterRegistrationBean11 = new FilterRegistrationBean();
//        filterRegistrationBean11.setFilter(new JwtFilter());
//        filterRegistrationBean11.setUrlPatterns(Collections.singleton("/user/{userId}"));
//        return filterRegistrationBean11;
//    }
//
//    @Bean(name="filterRegistrationBean12")
//    public FilterRegistrationBean filterRegistrationBean12() {
//        FilterRegistrationBean filterRegistrationBean12 = new FilterRegistrationBean();
//        filterRegistrationBean12.setFilter(new JwtFilter());
//        filterRegistrationBean12.setUrlPatterns(Collections.singleton("/user"));
//        return filterRegistrationBean12;
//    }
}
