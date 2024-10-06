package com.easteregg.ifsae.domain.adoption.service;

import com.easteregg.ifsae.domain.adoption.dto.*;
import com.easteregg.ifsae.domain.adoption.entity.Adoption;
import com.easteregg.ifsae.domain.adoption.repository.AdoptionRepository;
import com.easteregg.ifsae.domain.adoption.type.AdoptionStatus;
import com.easteregg.ifsae.domain.dog.entity.Dog;
import com.easteregg.ifsae.domain.dog.repository.DogRepository;
import com.easteregg.ifsae.domain.shelter.entity.Shelter;
import com.easteregg.ifsae.domain.shelter.entity.ShelterUser;
import com.easteregg.ifsae.domain.shelter.repository.ShelterUserRepository;
import com.easteregg.ifsae.domain.user.entity.User;
import com.easteregg.ifsae.domain.user.entity.UserProfile;
import com.easteregg.ifsae.domain.user.repository.UserProfileRepository;
import com.easteregg.ifsae.global.exception.ErrorCode;
import com.easteregg.ifsae.global.exception.type.AdoptionException;
import com.easteregg.ifsae.global.exception.type.ShelterUserException;
import com.easteregg.ifsae.global.exception.type.UserException;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import static com.easteregg.ifsae.domain.adoption.type.AdoptionStatus.*;
import static com.easteregg.ifsae.global.exception.ErrorCode.*;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class AdoptionServiceImpl implements AdoptionService {
    private final AdoptionRepository adoptionRepository;
    private final DogRepository dogRepository;
    private final ShelterUserRepository shelterUserRepository;
    private final UserProfileRepository userProfileRepository;

    @Override
    public void createAdoption(User user, AdoptionCreateRequest adoptionCreateRequest) {
        Dog dog = dogRepository.findById(adoptionCreateRequest.getDogId())
                .orElseThrow(NoSuchElementException::new);

        Shelter shelter = dog.getShelterDog().getShelter();

        Adoption adoption = Adoption.builder()
                .user(user)
                .dog(dog)
                .shelter(shelter)
                .adoptionPurpose(adoptionCreateRequest.getAdoptionPurpose())
                .absencePlan(adoptionCreateRequest.getAbsencePlan())
                .adoptionStatus(WAITING)
                .build();

        adoptionRepository.save(adoption);
    }

    @Override
    public List<AdoptionShelterListRes> getShelterAdoptionList(User user) {
        Shelter shelter = shelterUserRepository.findByUserId(user.getId())
                // 쉘터가 없을 경우 예외처리
                .orElseThrow(() -> new ShelterUserException(ErrorCode.SHELTER_NOT_FOUND))
                .getShelter();

        List<Adoption> adoptionList = adoptionRepository.findAdoptionsByShelterId(shelter.getId());

        if (adoptionList.isEmpty()) {
            throw new AdoptionException(ADOPTION_NOT_FOUND);
        }

        return adoptionList.stream()
                .map(AdoptionShelterListRes::fromAdoption)
                .toList();
    }

    @Override
    public List<AdoptionUserListRes> getUserAdoptionList(User user) {
        List<Adoption> adoptionList = adoptionRepository.findAdoptionsByUserId(user.getId());

        if (adoptionList.isEmpty()) {
            throw new AdoptionException(ADOPTION_NOT_FOUND);
        }

        return adoptionList.stream()
                .map(AdoptionUserListRes::fromAdoption)
                .toList();
    }

    @Override
    public void updateAdoption(User user, long adoptionId, AdoptionUpdateRequest adoptionUpdateRequest) {
        Adoption adoption = adoptionRepository.findById(adoptionId).orElseThrow(NoSuchElementException::new);

        if (!adoption.getUser().getId().equals(user.getId())) {
            throw new UserException(ErrorCode.UNAUTHORIZED);
        }

        adoption.updateAdoption(adoptionUpdateRequest);
        adoptionRepository.save(adoption);
    }

    @Override
    public void acceptAdoption(User user, Long adoptionId) {
        // 유저의 shelterId와 입양 신청서의 shelterId가 같은지 확인
        Adoption adoption = adoptionRepository.findById(adoptionId)
                .map(foundAdoption -> {
                    // 입양 상태가 WAITING이 아닐 경우 에러
                    if (foundAdoption.getAdoptionStatus() != AdoptionStatus.WAITING) {
                        throw new AdoptionException(ADOPTION_NOT_WAITING);
                    }

                    Shelter shelter = shelterUserRepository.findByUserId(user.getId())
                            // 쉘터가 없을 경우 예외처리
                            .orElseThrow(() -> new ShelterUserException(ErrorCode.SHELTER_NOT_FOUND))
                            .getShelter();

                    // 입양 신청서 대상 쉘터와 관리자의 소속 쉘터가 다를 경우 에러
                    if (!shelter.getId().equals(foundAdoption.getShelter().getId())) {
                        throw new AdoptionException(USER_NOT_FOUND_IN_SHELTER);
                    }

                    return foundAdoption;
                })
                // 입양 정보가 조회되지 않을 경우 에러
                .orElseThrow(() -> new AdoptionException(ADOPTION_NOT_FOUND));

        adoption.updateAdoptionStatus(ACCEPTED);

        adoptionRepository.save(adoption);
    }

    @Override
    public void rejectAdoption(User user, Long adoptionId) {
        // 유저의 shelterId와 입양 신청서의 shelterId가 같은지 확인
        Adoption adoption = adoptionRepository.findById(adoptionId)
                .map(foundAdoption -> {
                    // 입양 상태가 WAITING이 아닐 경우 에러
                    if (foundAdoption.getAdoptionStatus() != AdoptionStatus.WAITING) {
                        throw new AdoptionException(ADOPTION_NOT_WAITING);
                    }

                    Shelter shelter = shelterUserRepository.findByUserId(user.getId())
                            // 쉘터가 없을 경우 예외처리
                            .orElseThrow(() -> new ShelterUserException(ErrorCode.SHELTER_NOT_FOUND))
                            .getShelter();

                    // 입양 신청서 대상 쉘터와 관리자의 소속 쉘터가 다를 경우 에러
                    if (!shelter.getId().equals(foundAdoption.getShelter().getId())) {
                        throw new AdoptionException(USER_NOT_FOUND_IN_SHELTER);
                    }

                    return foundAdoption;
                })
                // 입양 정보가 조회되지 않을 경우 에러
                .orElseThrow(() -> new AdoptionException(ADOPTION_NOT_FOUND));

        adoption.updateAdoptionStatus(REJECTED);

        adoptionRepository.save(adoption);
    }

    @Override
    public AdoptionDetailDto findById(User user, long adoptionId) {
        Adoption adoption = adoptionRepository.findById(adoptionId).orElseThrow(NoSuchElementException::new);

        User applier = adoption.getUser();
        UserProfile userProfile = userProfileRepository.findByUserId(applier.getId())
                .orElse(UserProfile.builder().build());

        Dog dog = adoption.getDog();
        Shelter shelter = dog.getShelterDog().getShelter();
        List<ShelterUser> shelterEmpList = shelterUserRepository.findAllByShelterId(shelter.getId());

        for (ShelterUser shelterUser : shelterEmpList) {
            if (shelterUser.getUser().getId().equals(user.getId())) {
                return AdoptionDetailDto.builder()
                        .id(adoptionId)
                        .userProfile(userProfile.toDto())
                        .dogList(dog.toDogListDto())
                        .adoptionPurpose(adoption.getAdoptionPurpose())
                        .absencePlan(adoption.getAbsencePlan())
                        .adoptionStatus(adoption.getAdoptionStatus())
                        .build();
            }
        }

        throw new UserException(ErrorCode.UNAUTHORIZED);
    }

    @Override
    public List<AdoptionApplierListDto> findUsersByDogId(User user, long dogId) {
        List<Adoption> adoptions = adoptionRepository.findAdoptionsByDogId(dogId);

        Dog dog = dogRepository.findById(dogId).orElseThrow(NoSuchElementException::new);

        Shelter shelter = dog.getShelterDog().getShelter();
        List<ShelterUser> shelterEmpList = shelterUserRepository.findAllByShelterId(shelter.getId());
        for (ShelterUser shelterUser : shelterEmpList) {
            if (shelterUser.getUser().getId().equals(user.getId())) {
                return adoptions.stream()
                        .map(adoption -> AdoptionApplierListDto.fromUser(adoption.getId(), adoption.getUser()))
                        .toList();
            }
        }

        throw new UserException(ErrorCode.UNAUTHORIZED);
    }
}