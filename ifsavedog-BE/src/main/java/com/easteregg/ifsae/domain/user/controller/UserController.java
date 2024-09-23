package com.easteregg.ifsae.domain.user.controller;

import com.easteregg.ifsae.domain.user.dto.UserInfo;
import com.easteregg.ifsae.domain.user.entity.User;
import com.easteregg.ifsae.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<UserInfo> getUserInfo(@AuthenticationPrincipal User user) {
        log.info("user info: {}", user.getNickname());
        return ResponseEntity.ok(userService.getUserInfo(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserInfo> getUserInfoById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserInfo(userService.getUserById(id)));
    }

}
