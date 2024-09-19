package com.easteregg.ifsae.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class VerifyEmailCodeRequest {

    private String email;
    private String code;
}
