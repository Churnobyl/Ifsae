package com.easteregg.ifsae.domain.adoption.service;

import com.easteregg.ifsae.domain.adoption.dto.AdoptionCreateRequest;
import com.easteregg.ifsae.domain.adoption.dto.AdoptionUpdateRequest;
import com.easteregg.ifsae.domain.user.entity.User;

public interface AdoptionService {

    void createAdoption(User user, AdoptionCreateRequest adoptionCreateRequest);

    void checkAdoption(User user, long adoptionId);

    void updateAdoption(User user, long adoptionId, AdoptionUpdateRequest adoptionUpdateRequest);
}
