package com.easteregg.ifsae.domain.user.service;

import com.easteregg.ifsae.domain.user.dto.SignupDto;
import com.easteregg.ifsae.domain.user.repository.UserRepository;
import com.easteregg.ifsae.domain.user.type.Role;
import com.easteregg.ifsae.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public boolean isEmailExisted(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public boolean isNicknameExisted(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    @Override
    public void saveNewUser(SignupDto.Request request) {

        User user = User.builder()
                        .email(request.getEmail())
                        .nickname(request.getNickname())
                        .password(passwordEncoder.encode(request.getPassword()))
                        .role(Role.fromValue(request.getRole()))
                        .build();

        userRepository.save(user);
    }
}
