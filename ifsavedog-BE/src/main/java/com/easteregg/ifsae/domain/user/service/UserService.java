package com.easteregg.ifsae.domain.user.service;

import com.easteregg.ifsae.domain.user.dto.SignupDto;
import com.easteregg.ifsae.domain.user.dto.UserInfo;
import com.easteregg.ifsae.domain.user.entity.User;

public interface UserService {

    boolean isEmailExisted(String email);

    boolean isNicknameExisted(String nickname);

    void saveNewUser(SignupDto.Request request);

    User getUserByEmail(String userEmail);

    UserInfo getUserInfo(User user);

    User getUserById(Long id);
}
