package com.easteregg.ifsae.domain.dog.dto;

import com.easteregg.ifsae.domain.dog.type.DogStatus;
import com.easteregg.ifsae.domain.dog.type.Gender;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DogDetailDto {
    private long id;

    private String name;

    private int age;

    private Gender gender;

    private DogStatus dogStatus;

    private String species;

    private String info;

    private String image;

    private long shelterId;

    private String shelterName;

    private int followerCnt;
}