package com.easteregg.ifsae.domain.user.service;

import com.easteregg.ifsae.domain.user.dto.SignupDto.Request;
import com.easteregg.ifsae.domain.user.repository.UserRepository;
import com.easteregg.ifsae.entity.Role;
import com.easteregg.ifsae.entity.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // TODO : 회원가입 중 발생할 수 있는  Exception 처리 필요
    @Override
    public void signup(Request request) {
        // 이메일 중복 체크
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("이미 가입된 이메일입니다.");
        }

        // 닉네임 중복 체크
        if (userRepository.existsByNickname(request.getNickname())) {
            throw new IllegalArgumentException("이미 사용중인 닉네임입니다.");
        }

        User newUser = User.builder()
                           .email(request.getEmail())
                           .nickname(request.getNickname())
                           .password(passwordEncoder.encode(request.getPassword()))
                           .role(Role.fromValue(request.getRole()))
                           .build();

        userRepository.save(newUser);
    }

    // TODO : 이메일 인증 로직 구현 필요, Exception 처리 필요
    @Override
    public String emailAuth(String email) {
        if(userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("이미 가입된 이메일입니다.");
        }

        // 이메일 인증 로직 구현

        return "";
    }

}
