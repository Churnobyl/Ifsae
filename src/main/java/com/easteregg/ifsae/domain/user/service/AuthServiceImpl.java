package com.easteregg.ifsae.domain.user.service;

import com.easteregg.ifsae.domain.user.dto.SignupDto.Request;
import com.easteregg.ifsae.entity.EmailSubject;
import com.easteregg.ifsae.global.email.EmailService;
import com.easteregg.ifsae.global.exception.ErrorCode;
import com.easteregg.ifsae.global.exception.type.UserException;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    private final EmailService emailService;

    @Override
    public void signup(Request request) {
        // 이메일 중복 체크
        if (userService.isEmailExisted(request.getEmail())) {
            throw new UserException(ErrorCode.DUPLICATE_EMAIL);
        }

        // 닉네임 중복 체크
        if (userService.isNicknameExisted(request.getNickname())) {
            throw new UserException(ErrorCode.DUPLICATE_NICKNAME);
        }

        userService.saveNewUser(request);
    }

    @Override
    public void sendEmailAuth(String userEmail) throws MessagingException {
        // 1. 이메일 중복 확인
        if (userService.isEmailExisted(userEmail)) {
            throw new UserException(ErrorCode.DUPLICATE_EMAIL);
        }

        // 2. 이메일 전송
        String authCode = emailService.sendEmail(userEmail, EmailSubject.EMAIL_AUTH);

        // 3. 이메일 인증 코드 저장
        emailService.saveAuthCode(userEmail, authCode);
    }


}
