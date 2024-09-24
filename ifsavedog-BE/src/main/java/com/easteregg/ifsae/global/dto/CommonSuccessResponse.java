package com.easteregg.ifsae.global.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@AllArgsConstructor
@Getter
public class CommonSuccessResponse {
    private String message;

    public static CommonSuccessResponse of(String message) {
        return CommonSuccessResponse.builder()
                .message(message)
                .build();
    }
}
