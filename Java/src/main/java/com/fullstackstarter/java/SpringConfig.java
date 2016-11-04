package com.fullstackstarter.java;

import java.util.EnumSet;
import javax.servlet.DispatcherType;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.fullstackstarter.java.example.auth.MyAuthenticationFilter;

@Configuration
@EnableConfigurationProperties
public class SpringConfig {

    @Bean
    public FilterRegistrationBean shallowEtagHeaderFilter() {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(myAuthenticationFilter());
        registration.addUrlPatterns("/api/private/*");
        registration.setName("myAuthenticationFilter");
        registration.setOrder(1);
        return registration;
    }

    @Bean
    public MyAuthenticationFilter myAuthenticationFilter(){
        return new MyAuthenticationFilter();
    }
}
