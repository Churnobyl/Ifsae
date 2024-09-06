package com.easteregg.ifsae.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum UserStatus {
    INACTIVE(0), ACTIVE(1), PENDING(2);

    private final int value;
}
