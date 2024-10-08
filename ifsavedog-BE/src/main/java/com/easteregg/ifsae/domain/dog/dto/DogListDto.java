package com.easteregg.ifsae.domain.dog.dto;

import com.easteregg.ifsae.domain.dog.type.Gender;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DogListDto {
    private long id;

    private String name;

    private int age;

    private Gender gender;

    private String image;

    private String species;
}