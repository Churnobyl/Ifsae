package com.easteregg.ifsae.domain.adoption.dto;

import com.easteregg.ifsae.domain.dog.entity.Dog;
import com.easteregg.ifsae.domain.user.entity.User;

public class AdoptionDetailDto {

    private Long id;

    private User user;

    private Dog dog;

    private String adoptionPurpose;

    private String absencePlan;

    private boolean isChecked;
}
