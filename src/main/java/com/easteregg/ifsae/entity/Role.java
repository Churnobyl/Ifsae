package com.easteregg.ifsae.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    ADMIN(0), GENERAL_USER(1);

    private final int value;

    // TODO: 잘못된 값이 들어왔을때 Exception 처리 필요
    public static Role fromValue(int value) {
        for (Role role : Role.values()) {
            if (role.getValue() == value) {
                return role;
            }
        }
        throw new IllegalArgumentException("Invalid Role value: " + value);
    }
}
