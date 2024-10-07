package com.easteregg.ifsae.domain.adoption.dto;

import com.easteregg.ifsae.domain.adoption.entity.Adoption;
import com.easteregg.ifsae.domain.adoption.type.AdoptionStatus;
import com.easteregg.ifsae.domain.dog.entity.Dog;
import com.easteregg.ifsae.domain.shelter.entity.Shelter;
import com.easteregg.ifsae.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdoptionUserListRes {
    private Long adoptionId;
    private Long shelterId;
    private String shelterProfileImageUrl;
    private String shelterName;
    private String dogProfileImageUrl;
    private String dogName;
    private AdoptionStatus adoptionStatus;

    public static AdoptionUserListRes fromAdoption(Adoption adoption) {
        return AdoptionUserListRes.builder()
                .adoptionId(adoption.getId())
                .shelterId(adoption.getShelter().getId())
                .shelterProfileImageUrl(adoption.getShelter().getProfileImgUrl())
                .shelterName(adoption.getShelter().getName())
                .dogProfileImageUrl(adoption.getDog().getImage())
                .dogName(adoption.getDog().getName())
                .adoptionStatus(adoption.getAdoptionStatus())
                .build();
    }
}