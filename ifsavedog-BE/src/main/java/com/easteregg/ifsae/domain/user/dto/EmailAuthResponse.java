package com.easteregg.ifsae.domain.user.dto;

import com.easteregg.ifsae.global.dto.CommonSuccessResponse;
import lombok.Builder;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
public class EmailAuthResponse extends CommonSuccessResponse {

    public static EmailAuthResponse of(String message) {
        return EmailAuthResponse.builder()
                                .message(message)
                                .build();
    }

}
