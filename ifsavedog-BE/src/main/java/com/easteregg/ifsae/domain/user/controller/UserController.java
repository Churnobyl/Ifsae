package com.easteregg.ifsae.domain.user.controller;

import com.easteregg.ifsae.domain.user.dto.UpdateUserBasicInfoDto;
import com.easteregg.ifsae.domain.user.dto.UserInfo;
import com.easteregg.ifsae.domain.user.dto.UserProfileDto;
import com.easteregg.ifsae.domain.user.entity.User;
import com.easteregg.ifsae.domain.user.service.UserService;
import com.easteregg.ifsae.global.dto.CommonSuccessResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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

    /**
     * 기본 정보 수정 (내 정보 수정). 닉네임, 역할, 등급, 상태 수정 가능
     */
    @PutMapping("/basic")
    public ResponseEntity<CommonSuccessResponse> updateUserBasicInfo(@AuthenticationPrincipal User user,
                                                                     @RequestBody UpdateUserBasicInfoDto updateUserBasicInfoDto) {
        userService.updateUserBasicInfo(updateUserBasicInfoDto, user);
        return ResponseEntity.ok(CommonSuccessResponse.of("회원정보 수정에 성공했습니다."));
    }

    /**
     * 추가 정보 수정. UserProfile에 있는 정보 수정
     */
    @PutMapping("/profile")
    public ResponseEntity<CommonSuccessResponse> updateUserProfile(@AuthenticationPrincipal User user,
                                                                   @RequestBody UserProfileDto userProfileDto) {
        userService.updateUserProfileInfo(userProfileDto, user);
        return ResponseEntity.ok(CommonSuccessResponse.of("회원정보 수정에 성공했습니다."));
    }

    /**
     * 프로필 사진 수정
     */
    @PutMapping("/profile-img")
    public ResponseEntity<String> updateUserProfileImg(@AuthenticationPrincipal User user,
                                                                      @RequestParam MultipartFile profileImg)
            throws IOException {

        return ResponseEntity.ok(userService.updateUserProfileImg(user, profileImg));
    }

    @GetMapping("/my-shelter")
    public ResponseEntity<?> getMyShelter(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(userService.getMyShelter(user.getId()));
    }
}
