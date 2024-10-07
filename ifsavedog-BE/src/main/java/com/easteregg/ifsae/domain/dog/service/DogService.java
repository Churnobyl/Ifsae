package com.easteregg.ifsae.domain.dog.service;

import com.easteregg.ifsae.domain.dog.dto.DogCreateRequest;
import com.easteregg.ifsae.domain.dog.dto.DogDetailDto;
import com.easteregg.ifsae.domain.dog.dto.DogListDto;
import com.easteregg.ifsae.domain.dog.entity.Dog;
import com.easteregg.ifsae.domain.user.entity.User;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface DogService {
    void createDog(User user, DogCreateRequest dogCreateRequest, MultipartFile dogImage) throws IOException;

    void updateDogProfileImage(MultipartFile dogImage, Dog dog) throws IOException;

    void updateDog(long dogId, DogCreateRequest dogCreateRequest);

    DogDetailDto findById(long dogId);

    List<DogListDto> findDogsByShelterId(long shelterId);

    List<DogListDto> findDogsByFollowerId(long followerId);
}