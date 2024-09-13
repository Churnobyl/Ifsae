package com.easteregg.ifsae.domain.dog.dto;

import com.easteregg.ifsae.domain.dog.type.DogStatus;
import com.easteregg.ifsae.domain.dog.type.Gender;
import com.easteregg.ifsae.domain.shelter.entity.Shelter;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DogDetailDto {

    private String name;

    private int age;

    private Gender gender;

    private DogStatus dogStatus;

    private String species;

    private String info;

    private String image;

    private Shelter shelter;

}
