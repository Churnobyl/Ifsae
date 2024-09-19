package com.easteregg.ifsae.domain.dog.dto;

import com.easteregg.ifsae.domain.shelter.entity.Shelter;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DogListDto {

    private long id;

    private String name;

    private String image;

    private Shelter shelter;

}
