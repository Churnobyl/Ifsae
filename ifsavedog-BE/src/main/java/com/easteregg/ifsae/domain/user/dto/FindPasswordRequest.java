package com.easteregg.ifsae.domain.user.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FindPasswordRequest {
    @NotNull
    private String email;
    @NotNull
    private String password;
}
