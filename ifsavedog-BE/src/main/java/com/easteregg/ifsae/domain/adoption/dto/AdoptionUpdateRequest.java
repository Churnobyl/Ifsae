package com.easteregg.ifsae.domain.adoption.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AdoptionUpdateRequest {

    private String adoptionPurpose;

    private String absencePlan;

}
