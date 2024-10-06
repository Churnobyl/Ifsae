package com.easteregg.ifsae.domain.adoption.dto;

import com.easteregg.ifsae.domain.adoption.entity.Adoption;
import com.easteregg.ifsae.domain.adoption.type.AdoptionStatus;
import com.easteregg.ifsae.domain.dog.entity.Dog;
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
public class AdoptionShelterListRes {
    private Long adoptionId;
    private User user;
    private Dog dog;
    private String adoptionPurpose;
    private String absencePlan;
    private AdoptionStatus adoptionStatus;
    private LocalDateTime createdAt;

    public static AdoptionShelterListRes fromAdoption(Adoption adoption) {
        return AdoptionShelterListRes.builder()
                .adoptionId(adoption.getId())
                .user(adoption.getUser())
                .dog(adoption.getDog())
                .adoptionPurpose(adoption.getAdoptionPurpose())
                .absencePlan(adoption.getAbsencePlan())
                .adoptionStatus(adoption.getAdoptionStatus())
                .createdAt(adoption.getCreatedAt())
                .build();
    }
}