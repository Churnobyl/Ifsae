package com.easteregg.ifsae.domain.user.service;

import com.easteregg.ifsae.domain.user.dto.SignupDto;

public interface AuthService {

    void signup(SignupDto.Request request);
}
