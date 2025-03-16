package com.itvedant.model;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@ComponentScan(basePackages = {"com.itvedant"}) // Scan the entire package
@Import(SecurityConfig.class) // Explicitly import SecurityConfig if needed
public class BlogPostApplication {
    public static void main(String[] args) {
        SpringApplication.run(BlogPostApplication.class, args);
    }
}
