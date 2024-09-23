package com.easteregg.ifsae.domain.dog.type;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Gender {
    MALE(0), FEMALE(1), NEUTRAL(2);

    private final int value;

    // TODO: 잘못된 값이 들어왔을때 Exception 처리 필요
    public static Gender fromValue(int value) {
        for (Gender gender : Gender.values()) {
            if (gender.getValue() == value) {
                return gender;
            }
        }
        throw new IllegalArgumentException("Invalid DogGender value: " + value);
    }
}
