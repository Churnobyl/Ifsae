package com.easteregg.ifsae.domain.user.type;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    ROLE_GENERAL_USER(0), ROLE_CENTER(1), ROLE_ADMIN(2);

    private final int value;

    public static Role fromValue(int value) {
        for (Role role : Role.values()) {
            if (role.getValue() == value) {
                return role;
            }
        }
        throw new IllegalArgumentException("잘못된 값입니다. : " + value);
    }

}
