package com.easteregg.ifsae.domain.user.service;

import com.easteregg.ifsae.domain.user.dto.SignupDto;
import jakarta.mail.MessagingException;

public interface AuthService {

    void signup(SignupDto.Request request);

    void sendEmailAuth(String userEmail) throws MessagingException;
}
