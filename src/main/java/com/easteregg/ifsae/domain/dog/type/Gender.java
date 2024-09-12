package com.easteregg.ifsae.domain.dog.type;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Gender {
    MALE(0), FEMALE(1), NEUTRAL(2);

    private final int value;
}
