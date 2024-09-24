package com.easteregg.ifsae.domain.user.type;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Grade {
    BRONZE(0), SILVER(1), GOLD(2);

    private final int value;
}
