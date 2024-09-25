package com.easteregg.ifsae.domain.user.controller;

import com.easteregg.ifsae.domain.user.dto.EmailAuthRequest;
import com.easteregg.ifsae.domain.user.dto.FindPasswordRequest;
import com.easteregg.ifsae.domain.user.dto.SigninDto;
import com.easteregg.ifsae.domain.user.dto.SignupDto;
import com.easteregg.ifsae.domain.user.dto.VerifyEmailCodeRequest;
import com.easteregg.ifsae.domain.user.service.AuthService;
import com.easteregg.ifsae.global.dto.CommonSuccessResponse;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/signin")
    public ResponseEntity<SigninDto.Response> signin(@RequestBody SigninDto.Request request) {
        log.info("signin");
        return ResponseEntity.ok(authService.signin(request.getEmail(), request.getPassword()));
    }

    @PostMapping("/signup")
    public ResponseEntity<CommonSuccessResponse> signup(@RequestBody SignupDto.Request request) {
        log.info("signup");
        authService.signup(request);
        return ResponseEntity.ok(CommonSuccessResponse.of("회원가입에 성공했습니다."));
    }

    @PostMapping("/email-auth")
    public ResponseEntity<CommonSuccessResponse> sendEmailAuth(@RequestBody EmailAuthRequest request)
            throws MessagingException {
        log.info("[sendEmail] 이메일 인증 진행. userEmail : {} ", request.getEmail());
        authService.sendEmailAuth(request.getEmail());
        return ResponseEntity.ok(CommonSuccessResponse.of("이메일 인증 메일을 전송했습니다."));
    }

    @PostMapping("/verify-emailcode")
    public ResponseEntity<CommonSuccessResponse> verifyEmailCode(@RequestBody VerifyEmailCodeRequest request) {
        log.info("[verifyEmailCode] 이메일 코드 검증. email : {} ", request.getEmail());
        authService.verifyEmailCode(request);
        return ResponseEntity.ok(CommonSuccessResponse.of("이메일 인증에 성공했습니다."));
    }

    @PostMapping("/find-password")
    public ResponseEntity<CommonSuccessResponse> findPassword(@RequestBody FindPasswordRequest request) {
        log.info("[findPassword] 비밀번호 수정. userEmail : {} ", request.getEmail());
        authService.findPassword(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(CommonSuccessResponse.of("비밀번호 수정 완료. 새로운 비밀번호로 로그인해주세요."));
    }

}