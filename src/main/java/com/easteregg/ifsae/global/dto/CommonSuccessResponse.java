package com.easteregg.ifsae.global.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;

@Builder
@AllArgsConstructor
public class CommonSuccessResponse {
    private String message;

    public static CommonSuccessResponse of(String message) {
        return CommonSuccessResponse.builder()
                .message(message)
                .build();
    }
}
