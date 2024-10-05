package com.easteregg.ifsae.global.elasticsearch.service;

import com.easteregg.ifsae.domain.donation.entity.Donation;
import com.easteregg.ifsae.global.elasticsearch.index.ESDonation;
import com.easteregg.ifsae.global.elasticsearch.repository.ESDonationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ESDonationService {

    private final ESDonationRepository esDonationRepository;

    public void saveDonation(Donation donation) {
        ESDonation esDonation = ESDonation.builder()
                                          .id(donation.getId().toString())
                                          .shelterId(donation.getShelter().getId().toString())
                                          .userId(donation.getUser().getId().toString())
                                          .userNickname(donation.getUser().getNickname())
                                          .userProfileImgUrl(donation.getUser().getProfileImgUrl())
                                          .DogName(donation.getDog().getName())
                                          .build();
        esDonationRepository.save(esDonation);
    }

    public void deleteDonation(Donation donation) {
        esDonationRepository.deleteById(donation.getId().toString());
    }
}
