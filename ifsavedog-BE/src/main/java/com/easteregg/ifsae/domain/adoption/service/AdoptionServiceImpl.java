package com.easteregg.ifsae.domain.adoption.service;

import com.easteregg.ifsae.domain.adoption.dto.AdoptionCreateRequest;
import com.easteregg.ifsae.domain.adoption.dto.AdoptionUpdateRequest;
import com.easteregg.ifsae.domain.adoption.entity.Adoption;
import com.easteregg.ifsae.domain.adoption.repository.AdoptionRepository;
import com.easteregg.ifsae.domain.dog.entity.Dog;
import com.easteregg.ifsae.domain.dog.repository.DogRepository;
import com.easteregg.ifsae.domain.shelter.entity.Shelter;
import com.easteregg.ifsae.domain.user.entity.User;
import com.easteregg.ifsae.domain.user.repository.UserRepository;
import com.easteregg.ifsae.global.exception.ErrorCode;
import com.easteregg.ifsae.global.exception.type.UserException;
import jakarta.transaction.Transactional;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class AdoptionServiceImpl implements AdoptionService {

    private final AdoptionRepository adoptionRepository;

    private final UserRepository userRepository;

    private final DogRepository dogRepository;

    @Override
    public void applyAdoption(AdoptionCreateRequest adoptionCreateRequest) {

        User user = userRepository.findById(adoptionCreateRequest.getUserId()).orElseThrow(NoSuchElementException::new);

        Dog dog = dogRepository.findById(adoptionCreateRequest.getDogId()).orElseThrow(NoSuchElementException::new);

        Shelter shelter = dog.getShelterDog().getShelter();

        Adoption adoption = Adoption.builder()
                                    .user(user)
                                    .dog(dog)
                                    .shelter(shelter)
                                    .adoptionPurpose(adoptionCreateRequest.getAdoptionPurpose())
                                    .absencePlan(adoptionCreateRequest.getAbsencePlan())
                                    .isChecked(false)
                                    .build();

        adoptionRepository.save(adoption);
    }

    @Override
    public void checkAdoption(User user, long adoptionId) {

        Adoption adoption = adoptionRepository.findById(adoptionId).orElseThrow(NoSuchElementException::new);

        if (adoption.getUser() != user) {
            throw new UserException(ErrorCode.UNAUTHORIZED);
        }

        adoption.check();
        adoptionRepository.save(adoption);
    }

    @Override
    public void updateAdoption(long userId, long adoptionId, AdoptionUpdateRequest adoptionUpdateRequest) {
        if (adoptionUpdateRequest.getUserId() != userId) {
            throw new UserException(ErrorCode.UNAUTHORIZED);
        }

        Adoption adoption = adoptionRepository.findById(adoptionId).orElseThrow(NoSuchElementException::new);

        adoption.updateAdoption(adoptionUpdateRequest);
        adoptionRepository.save(adoption);
    }

}
