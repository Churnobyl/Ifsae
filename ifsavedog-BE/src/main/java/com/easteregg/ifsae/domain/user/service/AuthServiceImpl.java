package com.easteregg.ifsae.domain.user.service;

import com.easteregg.ifsae.domain.user.dto.SigninDto;
import com.easteregg.ifsae.domain.user.dto.SigninDto.Response;
import com.easteregg.ifsae.domain.user.dto.SignupDto.Request;
import com.easteregg.ifsae.domain.user.dto.VerifyEmailCodeRequest;
import com.easteregg.ifsae.domain.user.entity.User;
import com.easteregg.ifsae.global.email.EmailService;
import com.easteregg.ifsae.global.email.EmailSubject;
import com.easteregg.ifsae.global.exception.ErrorCode;
import com.easteregg.ifsae.global.exception.type.EmailAuthException;
import com.easteregg.ifsae.global.exception.type.UserException;
import com.easteregg.ifsae.global.security.JwtTokenProvider;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

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

    @Override
    public void verifyEmailCode(VerifyEmailCodeRequest request) {
        if (!emailService.isCorrectEmailAuthCode(request.getEmail(), request.getCode())) {
            throw new EmailAuthException(ErrorCode.INVALID_EMAIL_AUTH_CODE);
        }
    }

    @Override
    public Response signin(String email, String password) {
        User user = userService.getUserByEmail(email);

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new UserException(ErrorCode.INVALID_PASSWORD);
        }

        List<String> roles = user.getUserRoles();

        String accessToken = jwtTokenProvider.createAccessToken(user.getEmail(), roles);
        String refreshToken = jwtTokenProvider.createRefreshToken(user.getEmail(), roles);

        jwtTokenProvider.saveAuthToken(accessToken, refreshToken);

        return SigninDto.Response.builder()
                                 .id(user.getId())
                                 .accessToken(accessToken)
                                 .email(user.getEmail())
                                 .nickname(user.getNickname())
                                 .role(user.getRole().name())
                                 .profileImgUrl(user.getProfileImgUrl())
                                 .userStatus(user.getUserStatus().name())
                                 .grade(user.getGrade().name())
                                 .build();
    }


}
