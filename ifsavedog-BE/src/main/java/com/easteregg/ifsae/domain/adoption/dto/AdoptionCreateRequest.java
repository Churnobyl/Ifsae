package com.easteregg.ifsae.domain.adoption.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AdoptionCreateRequest {

    private long dogId;

    private long shelterId;

    private String adoptionPurpose;

    private String absencePlan;
}