package com.easteregg.ifsae.domain.adoption.service;

import com.easteregg.ifsae.domain.adoption.dto.AdoptionCreateRequest;
import com.easteregg.ifsae.domain.adoption.dto.AdoptionUpdateRequest;
import com.easteregg.ifsae.domain.adoption.entity.Adoption;
import com.easteregg.ifsae.domain.adoption.repository.AdoptionRepository;
import com.easteregg.ifsae.domain.dog.entity.Dog;
import com.easteregg.ifsae.domain.dog.repository.DogRepository;
import com.easteregg.ifsae.domain.shelter.entity.Shelter;
import com.easteregg.ifsae.domain.shelter.entity.ShelterUser;
import com.easteregg.ifsae.domain.shelter.repository.ShelterUserRepository;
import com.easteregg.ifsae.domain.user.entity.User;
import com.easteregg.ifsae.global.exception.ErrorCode;
import com.easteregg.ifsae.global.exception.type.UserException;
import jakarta.transaction.Transactional;
import java.util.List;
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

    private final DogRepository dogRepository;

    private final ShelterUserRepository shelterUserRepository;

    @Override
    public void createAdoption(User user, AdoptionCreateRequest adoptionCreateRequest) {
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
    public void updateAdoption(User user, long adoptionId, AdoptionUpdateRequest adoptionUpdateRequest) {
        System.out.println("user : " + user.getNickname());
        Adoption adoption = adoptionRepository.findById(adoptionId).orElseThrow(NoSuchElementException::new);

        if (!adoption.getUser().getId().equals(user.getId())) {
            throw new UserException(ErrorCode.UNAUTHORIZED);
        }

        adoption.updateAdoption(adoptionUpdateRequest);
        adoptionRepository.save(adoption);
    }

    @Override
    public void checkAdoption(User user, long adoptionId) {
        Adoption adoption = adoptionRepository.findById(adoptionId).orElseThrow(NoSuchElementException::new);

        Shelter shelter = adoption.getShelter();
        List<ShelterUser> shelterEmpList = shelterUserRepository.findAllByShelterId(shelter.getId());

        for (ShelterUser shelterUser : shelterEmpList) {
            if (shelterUser.getUser().getId().equals(user.getId())) {
                adoption.check();
                adoptionRepository.save(adoption);
                return;
            }
        }

        throw new UserException(ErrorCode.UNAUTHORIZED);
    }

}
