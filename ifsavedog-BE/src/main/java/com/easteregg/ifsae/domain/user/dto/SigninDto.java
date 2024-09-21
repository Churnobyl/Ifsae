package com.easteregg.ifsae.domain.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Getter;

public class SigninDto {

    @Getter
    @Builder
    public static class Request {

        @NotEmpty
        @Email
        private String email;

        @NotEmpty
        private String password;
    }

    @Getter
    @Builder
    public static class Response {
        private Long id;
        private String accessToken;
        private String email;
        private String nickname;
        private String role;
        private String profileImgUrl;
        private String userStatus;
        private String grade;
    }

}
