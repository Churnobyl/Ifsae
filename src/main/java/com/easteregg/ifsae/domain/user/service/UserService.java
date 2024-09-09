package com.easteregg.ifsae.domain.user.service;

import com.easteregg.ifsae.entity.User;

public interface UserService {
    boolean isEmailExisted(String email);
    boolean isNicknameExisted(String nickname);
    void saveUser(User user);
}
