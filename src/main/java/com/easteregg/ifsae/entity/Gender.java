package com.easteregg.ifsae.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Gender {
    MALE(0), FEMALE(1), NEUTRAL(2);

    private final int value;
}
