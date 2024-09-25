package com.easteregg.ifsae.domain.user.service;

import com.easteregg.ifsae.domain.user.dto.SigninDto.Response;
import com.easteregg.ifsae.domain.user.dto.SignupDto;
import com.easteregg.ifsae.domain.user.dto.VerifyEmailCodeRequest;
import jakarta.mail.MessagingException;

public interface AuthService {

    void signup(SignupDto.Request request);

    void sendEmailAuth(String userEmail) throws MessagingException;

    void verifyEmailCode(VerifyEmailCodeRequest request);

    Response signin(String email, String password);

    void findPassword(String email, String password);
}
