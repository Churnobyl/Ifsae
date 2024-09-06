package com.easteregg.ifsae.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum DogStatus {
    NOT_ADOPTED(0), ADOPTED(1);

    private final int value;

    // TODO: 잘못된 값이 들어왔을때 Exception 처리 필요
    public static DogStatus fromValue(int value) {
        for (DogStatus dogStatus : DogStatus.values()) {
            if (dogStatus.getValue() == value) {
                return dogStatus;
            }
        }
        throw new IllegalArgumentException("Invalid Role value: " + value);
    }
}