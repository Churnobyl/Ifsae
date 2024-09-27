package com.easteregg.ifsae;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

// 잎새 프로젝트
@SpringBootApplication
@EnableJpaAuditing
public class IfsaeApplication {

    public static void main(String[] args) {
        SpringApplication.run(IfsaeApplication.class, args);
    }

}
