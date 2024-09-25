package com.easteregg.ifsae.domain.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserProfileDto {

    private String housingType;
    private int birth;
    private String address;
    private String phoneNumber;
    private int familyCnt;
    private String curPets;
    private String petExperience;
    private boolean hasAllergy;
}