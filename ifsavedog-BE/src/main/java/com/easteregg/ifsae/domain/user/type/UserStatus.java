package com.easteregg.ifsae.domain.user.type;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum UserStatus {
    PENDING(0), ACTIVE(1), INACTIVE(2);

    private final int value;
}