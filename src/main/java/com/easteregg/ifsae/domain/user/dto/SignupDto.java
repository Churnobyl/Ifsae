package com.easteregg.ifsae.domain.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;

public class SignupDto {

    @Getter
    @Builder
    public static class Request {

        @NotEmpty
        @Email
        private String email;

        @NotEmpty
        private String password;

        @NotEmpty
        @Size(min = 2, max = 10)
        private String nickname;

        @NotEmpty
        @Min(0)
        @Max(1)
        private int role;
    }

}
