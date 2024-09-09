package com.easteregg.ifsae.global.email;

import jakarta.mail.MessagingException;

public interface EmailService {
    String sendEmail(String email, EmailSubject subject) throws MessagingException;
    String generateRandomCode();
    void saveAuthCode(String email, String code);
}
