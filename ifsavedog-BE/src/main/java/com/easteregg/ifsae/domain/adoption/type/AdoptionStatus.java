package com.easteregg.ifsae.domain.adoption.type;

import com.easteregg.ifsae.domain.dog.type.DogStatus;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum AdoptionStatus {
    WAITING(0), ACCEPTED(1), REJECTED(2);

    private final int value;

    public static AdoptionStatus fromValue(int value) {
        for (AdoptionStatus adoptionStatus : AdoptionStatus.values()) {
            if (adoptionStatus.getValue() == value) {
                return adoptionStatus;
            }
        }

        throw new IllegalArgumentException("Invalid AdoptionStatus value: " + value);
    }
}
