package com.easteregg.ifsae.domain.shelter.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ShelterDetailDto {

    private Long id;

    private String profileImgUrl;

    private String name;

    private String address;

    private String phone;

    private String content;

    private boolean canBeDonated;

}
