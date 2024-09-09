package com.easteregg.ifsae.domain.user.service;

import com.easteregg.ifsae.domain.user.dto.SignupDto.Request;
import com.easteregg.ifsae.entity.Role;
import com.easteregg.ifsae.entity.User;
import com.easteregg.ifsae.global.exception.ErrorCode;
import com.easteregg.ifsae.global.exception.type.UserException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

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

        User newUser = User.builder()
                           .email(request.getEmail())
                           .nickname(request.getNickname())
                           .password(passwordEncoder.encode(request.getPassword()))
                           .role(Role.fromValue(request.getRole()))
                           .build();

        userService.saveUser(newUser);
    }


}
