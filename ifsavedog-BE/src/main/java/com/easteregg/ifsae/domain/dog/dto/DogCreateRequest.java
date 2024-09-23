package com.easteregg.ifsae.domain.dog.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class DogCreateRequest {

    private String name;

    private int age;

    private String gender;

    private String dogStatus;

    private String species;

    private String info;

}
