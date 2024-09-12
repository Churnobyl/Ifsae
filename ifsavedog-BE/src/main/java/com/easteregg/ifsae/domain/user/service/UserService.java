package com.easteregg.ifsae.domain.user.service;

import com.easteregg.ifsae.domain.user.dto.SignupDto;

public interface UserService {
    boolean isEmailExisted(String email);
    boolean isNicknameExisted(String nickname);
    void saveNewUser(SignupDto.Request request);
}
