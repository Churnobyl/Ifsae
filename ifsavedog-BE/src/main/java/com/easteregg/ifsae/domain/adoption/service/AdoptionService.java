package com.easteregg.ifsae.domain.adoption.service;

import com.easteregg.ifsae.domain.adoption.dto.*;
import com.easteregg.ifsae.domain.user.entity.User;

import java.util.List;

public interface AdoptionService {
    void createAdoption(User user, AdoptionCreateRequest adoptionCreateRequest);

    List<AdoptionShelterListRes> getShelterAdoptionList(User user);

    List<AdoptionUserListRes> getUserAdoptionList(User user);

    void acceptAdoption(User user, Long adoptionId);

    void rejectAdoption(User user, Long adoptionId);

    void updateAdoption(User user, long adoptionId, AdoptionUpdateRequest adoptionUpdateRequest);

    AdoptionDetailDto findById(User user, long adoptionId);

    List<AdoptionApplierListDto> findUsersByDogId(User user, long dogId);
}
