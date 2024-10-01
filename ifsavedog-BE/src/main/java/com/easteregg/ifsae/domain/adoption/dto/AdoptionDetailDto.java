package com.easteregg.ifsae.domain.adoption.dto;

import com.easteregg.ifsae.domain.dog.dto.DogListDto;
import com.easteregg.ifsae.domain.user.dto.UserProfileDto;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AdoptionDetailDto {

    private Long id;

    private UserProfileDto userProfile;

    private DogListDto dogList;

    private String adoptionPurpose;

    private String absencePlan;

    private boolean isChecked;

}
