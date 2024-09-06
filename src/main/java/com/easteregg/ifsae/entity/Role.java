package com.easteregg.ifsae.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    ADMIN(0), GENERAL_USER(1);

    private final int value;
}
