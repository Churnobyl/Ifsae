package com.easteregg.ifsae.domain.adoption.service;

import com.easteregg.ifsae.domain.adoption.dto.AdoptionApplierListDto;
import com.easteregg.ifsae.domain.adoption.dto.AdoptionCreateRequest;
import com.easteregg.ifsae.domain.adoption.dto.AdoptionDetailDto;
import com.easteregg.ifsae.domain.adoption.dto.AdoptionUpdateRequest;
import com.easteregg.ifsae.domain.user.entity.User;
import java.util.List;

public interface AdoptionService {

    void createAdoption(User user, AdoptionCreateRequest adoptionCreateRequest);

    void checkAdoption(User user, long adoptionId);

    void updateAdoption(User user, long adoptionId, AdoptionUpdateRequest adoptionUpdateRequest);

    AdoptionDetailDto findById(User user, long adoptionId);

    List<AdoptionApplierListDto> findUsersByDogId(User user, long dogId);
}
