package com.easteregg.ifsae.domain.donation.service;

import com.easteregg.ifsae.domain.dog.entity.Dog;
import com.easteregg.ifsae.domain.dog.repository.DogRepository;
import com.easteregg.ifsae.domain.donation.dto.DonationDto;
import com.easteregg.ifsae.domain.donation.entity.Donation;
import com.easteregg.ifsae.domain.donation.repository.DonationRepository;
import com.easteregg.ifsae.domain.shelter.entity.Shelter;
import com.easteregg.ifsae.domain.shelter.repository.ShelterUserRepository;
import com.easteregg.ifsae.domain.user.entity.User;
import com.easteregg.ifsae.global.exception.ErrorCode;
import com.easteregg.ifsae.global.exception.type.DonationException;
import com.easteregg.ifsae.global.exception.type.ShelterUserException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.easteregg.ifsae.domain.dog.type.DogStatus.NOT_ADOPTED;
import static com.easteregg.ifsae.global.exception.ErrorCode.DONATION_NOT_ALLOWED;
import static com.easteregg.ifsae.global.exception.ErrorCode.DONATION_NOT_FOUND;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class DonationServiceImpl implements DonationService {
    private final ShelterUserRepository shelterUserRepository;
    private final DogRepository dogRepository;
    private final DonationRepository donationRepository;

    @Override
    public void createDonation(User user, DonationDto.createDonationRequest request, Long dogId) {
        Dog dog = dogRepository.findById(dogId)
                .map(foundDog -> {
                    // 강아지가 입양된 상태가 아니라면(입양 / 사망 상태라면) 기부 불가 예외 처리
                    if (foundDog.getDogStatus() != NOT_ADOPTED) {
                        throw new DonationException(DONATION_NOT_ALLOWED);
                    }
                    return foundDog;
                })
                // 강아지가 조회되지 않을 경우 예외 처리
                .orElseThrow(NoSuchElementException::new);

        Donation donation = request.toEntity(user, dog);

        donationRepository.save(donation);
    }

    @Override
    public List<DonationDto.getUserDonatedListResponse> getUserDonatedList(User user) {
        List<Donation> donationList = Optional.ofNullable(donationRepository.findByUser(user))
                // 기부 내역이 없을 경우 예외처리
                .filter(foundDonations -> !foundDonations.isEmpty())
                .orElseThrow(() -> new DonationException(DONATION_NOT_FOUND));

        return donationList.stream()
                .map(DonationDto.getUserDonatedListResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public List<DonationDto.getShelterDonorListResponse> getShelterDonorList(User user) {
        Shelter shelter = shelterUserRepository.findByUserId(user.getId())
                // 쉘터가 없을 경우 예외처리
                .orElseThrow(() -> new ShelterUserException(ErrorCode.SHELTER_NOT_FOUND))
                .getShelter();

        List<Donation> donationList = Optional.ofNullable(donationRepository.findByShelterId(shelter.getId()))
                // 기부 받은 내역이 없을 경우 예외처리
                .filter(donations -> !donations.isEmpty())
                .orElseThrow(() -> new DonationException(DONATION_NOT_FOUND));

        return donationList.stream()
                .map(DonationDto.getShelterDonorListResponse::fromEntity)
                .collect(Collectors.toList());
    }
}