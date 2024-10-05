package com.easteregg.ifsae.domain.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdateUserBasicInfoDto {

    private String nickname;
    private String role;
    private String grade;
    private String userStatus;
}
