package com.easteregg.ifsae.domain.shelter.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ShelterCreateRequest {

    private String name;

    private String address;

    private String phone;

    private String content;

    private boolean canBeDonated;

}
