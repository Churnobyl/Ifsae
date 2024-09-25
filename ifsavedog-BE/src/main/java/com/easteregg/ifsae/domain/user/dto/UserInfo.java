package com.easteregg.ifsae.domain.user.dto;

import jakarta.annotation.Nullable;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserInfo {

    private Long id;
    private String email;
    private String nickname;
    @Nullable
    private String profileImgUrl;
    private String grade;
    private String role;
    @Nullable
    private UserProfileDto userProfile;
}
