package com.easteregg.ifsae.domain.shelter.service;

import com.easteregg.ifsae.domain.shelter.dto.ShelterCreateRequest;
import com.easteregg.ifsae.domain.shelter.dto.ShelterDetailDto;
import com.easteregg.ifsae.domain.user.entity.User;

public interface ShelterService {

    void createShelter(User user, ShelterCreateRequest shelterCreateRequest);

    void updateShelter(User user, long shelterId, ShelterCreateRequest shelterCreateRequest);

    void deleteShelter(User user, long shelterId);

    ShelterDetailDto findShelterById(long shelterId);
}
