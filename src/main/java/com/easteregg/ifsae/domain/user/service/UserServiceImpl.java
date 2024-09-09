package com.easteregg.ifsae.domain.user.service;

import com.easteregg.ifsae.domain.user.repository.UserRepository;
import com.easteregg.ifsae.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public boolean isEmailExisted(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public boolean isNicknameExisted(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    @Override
    public void saveUser(User user) {
        userRepository.save(user);
    }
}
