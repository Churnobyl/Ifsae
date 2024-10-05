package com.easteregg.ifsae.domain.donation.dto;

import com.easteregg.ifsae.domain.dog.entity.Dog;
import com.easteregg.ifsae.domain.donation.entity.Donation;
import com.easteregg.ifsae.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class DonationDto {
    // 기부 신청 request
    @Builder
    @AllArgsConstructor
    @Getter
    @NoArgsConstructor
    public static class createDonationRequest {
        int contribution;

        public Donation toEntity(User user, Dog dog) {
            return Donation.builder()
                    .user(user)
                    .shelter(dog.getShelterDog().getShelter())
                    .dog(dog)
                    .contribution(contribution)
                    .build();
        }
    }

    // 유저 기부한 강아지 내역 response
    @Builder
    @AllArgsConstructor
    @Getter
    public static class getUserDonatedListResponse {
        private Long dogId;
        private String dogName;
        private String dogImage;
        private int contribution;
        private LocalDateTime donateDate;

        public static getUserDonatedListResponse fromEntity(Donation donation) {
            return getUserDonatedListResponse.builder()
                    .dogId(donation.getDog().getId())
                    .dogName(donation.getDog().getName())
                    .dogImage(donation.getDog().getImage())
                    .contribution(donation.getContribution())
                    .donateDate(donation.getCreatedAt())
                    .build();
        }
    }

    // 쉘터 기부 받은 유저 리스트 response
    @Builder
    @AllArgsConstructor
    @Getter
    public static class getShelterDonorListResponse {
        private Long userId;
        private String userNickName;
        private String userProfileImage;
        private Long dogId;
        private String dogName;
        private int contribution;
        private LocalDateTime donateDate;

        public static getShelterDonorListResponse fromEntity(Donation donation) {
            return getShelterDonorListResponse.builder()
                    .userId(donation.getUser().getId())
                    .userNickName(donation.getUser().getNickname())
                    .userProfileImage(donation.getUser().getProfileImgUrl())
                    .dogId(donation.getDog().getId())
                    .dogName(donation.getDog().getName())
                    .contribution(donation.getContribution())
                    .donateDate(donation.getCreatedAt())
                    .build();
        }
    }
}