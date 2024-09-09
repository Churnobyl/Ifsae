package com.easteregg.ifsae.domain.user.controller;

import com.easteregg.ifsae.domain.user.dto.EmailAuthResponse;
import com.easteregg.ifsae.domain.user.dto.SignupDto;
import com.easteregg.ifsae.domain.user.service.AuthService;
import com.easteregg.ifsae.global.dto.CommonSuccessResponse;
import com.easteregg.ifsae.global.email.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    private final AuthService authService;
    private final EmailService emailService;

    @PostMapping("/signin")
    public void signin() {
        log.info("signin");
    }

    @PostMapping("/signup")
    public ResponseEntity<CommonSuccessResponse> signup(@RequestBody SignupDto.Request request) {
        log.info("signup");
        authService.signup(request);
        return ResponseEntity.ok(CommonSuccessResponse.of("회원가입에 성공했습니다."));
    }

    // TODO : 이메일 인증 로직 구현 필요
    @GetMapping("/email-auth/{email}")
    public ResponseEntity<EmailAuthResponse> sendEmailAuth(@PathVariable String email) {
        log.debug("[sendEmail] 이메일 인증 진행. userEmail : {} ", email);
        return ResponseEntity.ok(EmailAuthResponse.of(emailService.sendEmailAuth(email)));
    }


}
