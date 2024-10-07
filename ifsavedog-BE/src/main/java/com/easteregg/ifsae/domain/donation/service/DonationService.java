package com.easteregg.ifsae.domain.donation.service;

import com.easteregg.ifsae.domain.donation.dto.DonationDto;
import com.easteregg.ifsae.domain.user.entity.User;

import java.util.List;


public interface DonationService {
    void createDonation(User user, DonationDto.createDonationRequest request, Long dogId);

    List<DonationDto.getUserDonatedListResponse> getUserDonatedList(User user);

    List<DonationDto.getShelterDonorListResponse> getShelterDonorList(User user);
}