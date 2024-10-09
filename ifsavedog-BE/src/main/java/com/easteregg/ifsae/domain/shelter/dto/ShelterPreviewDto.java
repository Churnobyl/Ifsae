package com.easteregg.ifsae.domain.shelter.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ShelterPreviewDto {

    private Long id;

    private String name;

    private String profileImgUrl;
}
