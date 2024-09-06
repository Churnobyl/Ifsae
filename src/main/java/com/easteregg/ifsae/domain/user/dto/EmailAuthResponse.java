package com.easteregg.ifsae.domain.user.dto;

import com.easteregg.ifsae.global.dto.CommonSuccessResponse;
import lombok.Builder;
import lombok.Getter;

@Getter
public class EmailAuthResponse extends CommonSuccessResponse {

    @Builder
    public EmailAuthResponse(String message) {
        super(message);
    }

    public static EmailAuthResponse of(String message) {
        return EmailAuthResponse.builder()
                                .message(message)
                                .build();
    }

}
