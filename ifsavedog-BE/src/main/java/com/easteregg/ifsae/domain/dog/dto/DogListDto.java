package com.easteregg.ifsae.domain.dog.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DogListDto {

    private long id;

    private String name;

    private String image;

    private long shelterId;

    private String shelterName;

}
