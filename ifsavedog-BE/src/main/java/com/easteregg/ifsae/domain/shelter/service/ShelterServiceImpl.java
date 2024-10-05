package com.easteregg.ifsae.domain.shelter.service;

import com.easteregg.ifsae.domain.shelter.dto.ShelterCreateRequest;
import com.easteregg.ifsae.domain.shelter.dto.ShelterDetailDto;
import com.easteregg.ifsae.domain.shelter.entity.Shelter;
import com.easteregg.ifsae.domain.shelter.entity.ShelterUser;
import com.easteregg.ifsae.domain.shelter.repository.ShelterRepository;
import com.easteregg.ifsae.domain.shelter.repository.ShelterUserRepository;
import com.easteregg.ifsae.domain.user.entity.User;
import com.easteregg.ifsae.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class ShelterServiceImpl implements ShelterService {

    private final ShelterRepository shelterRepository;

    private final ShelterUserRepository shelterUserRepository;

    private final UserRepository userRepository;

    @Override
    public void createShelter(User user, ShelterCreateRequest shelterCreateRequest) {
        Shelter shelter = Shelter.builder()
                                 .name(shelterCreateRequest.getName())
                                 .address(shelterCreateRequest.getAddress())
                                 .phone(shelterCreateRequest.getPhone())
                                 .content(shelterCreateRequest.getContent())
                                 .canBeDonated(shelterCreateRequest.isCanBeDonated())
                                 .build();

        user.changeUserStatus();

        userRepository.save(user);

        shelterRepository.save(shelter);

        shelterUserRepository.save(ShelterUser.builder()
                                              .shelter(shelter)
                                              .user(user)
                                              .build());

    }

    @Override
    public void updateShelter(User user, long shelterId, ShelterCreateRequest shelterCreateRequest) {
        Shelter shelter = shelterRepository.findById(shelterId).orElseThrow(NoSuchElementException::new);

        shelter.updateShelterInfo(shelterCreateRequest);
        shelterRepository.save(shelter);
    }

    @Override
    public void deleteShelter(User user, long shelterId) {
        shelterRepository.deleteById(shelterId);
        shelterUserRepository.deleteById(shelterId);
    }

    @Override
    public ShelterDetailDto findShelterById(long shelterId) {
        Shelter shelter = shelterRepository.findById(shelterId).orElseThrow(NoSuchElementException::new);

        return ShelterDetailDto.builder()
                               .id(shelter.getId())
                               .name(shelter.getName())
                               .address(shelter.getAddress())
                               .phone(shelter.getPhone())
                               .content(shelter.getContent())
                               .canBeDonated(shelter.isCanBeDonated())
                               .build();
    }

}
