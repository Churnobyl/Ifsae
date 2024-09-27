package com.easteregg.ifsae.global.config;

import com.easteregg.ifsae.global.security.CustomAccessDeniedHandler;
import com.easteregg.ifsae.global.security.CustomAuthenticationEntryPoint;
import com.easteregg.ifsae.global.security.JwtAuthenticationFilter;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final ObjectMapper objectMapper;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // cors 에러
        http.cors(AbstractHttpConfigurer::disable);

        // 권한 설정
        http.authorizeHttpRequests((authorize) -> authorize
                .requestMatchers("/h2-console/**", "/api/auth/**", "/swagger-ui/**").permitAll()
                .anyRequest().authenticated());

        // ! 모든 경로에 대한 권한 해제코드 : 테스트시 사용!!
        http.csrf(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .headers(headers -> headers.frameOptions().disable());

        // TODO : 인증 구현 끝나면 주석 해제 후 사용
//        // token인증 없이 테스트하고 싶을때 아래 코드 주석처리
//        http.authorizeHttpRequests((authorize) -> authorize
//                .requestMatchers("/api/auth/**", "/swagger-ui/**").permitAll()
//                .anyRequest().authenticated());

        // exceptionHandler
        http.exceptionHandling(exceptionHandling -> exceptionHandling
                .authenticationEntryPoint(new CustomAuthenticationEntryPoint(objectMapper))
                .accessDeniedHandler(new CustomAccessDeniedHandler())
        );

        // jwt filter
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}