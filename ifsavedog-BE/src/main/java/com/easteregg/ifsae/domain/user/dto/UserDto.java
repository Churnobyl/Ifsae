package com.easteregg.ifsae.domain.user.dto;

import com.easteregg.ifsae.domain.user.type.Grade;
import com.easteregg.ifsae.domain.user.type.Role;
import com.easteregg.ifsae.domain.user.type.UserStatus;
import lombok.*;
import lombok.experimental.SuperBuilder;

public class UserDto {

    @Getter
    @Builder
    public static class Request {
        private Long id;
        private String password;
        private String nickname;
        private String profileImgUrl;
    }

    @Getter
    @SuperBuilder
    public static class Response {
        private Long id;
        private String email;
        private String nickname;
        private Role role;
        private String profileImgUrl;
        private Grade grade;
        private UserStatus userStatus;
    }

    @Getter
    @SuperBuilder
    public static class DetailResponse extends Response {
        private UserProfileDto userProfileDto;
    }
}
