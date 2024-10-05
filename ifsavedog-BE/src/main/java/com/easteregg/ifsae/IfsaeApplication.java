package com.easteregg.ifsae;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

// 잎새 프로젝트
@SpringBootApplication
@EnableJpaAuditing
@EnableElasticsearchRepositories(basePackages = "com.easteregg.ifsae.global.elasticsearch")
public class IfsaeApplication {

    public static void main(String[] args) {
        SpringApplication.run(IfsaeApplication.class, args);
    }

}
