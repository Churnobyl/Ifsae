package com.easteregg.ifsae.domain.dog.service;

import com.easteregg.ifsae.domain.dog.dto.DogDetailDto;
import com.easteregg.ifsae.domain.dog.dto.DogListDto;
import java.util.List;

public interface DogService {

    public DogDetailDto findById(Long id);

    public List<DogListDto> findDogsByName(String name);

    public List<DogListDto> findDogsByShelterId(long shelterId);

}
