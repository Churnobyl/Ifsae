package com.easteregg.ifsae.domain.dog.service;

import com.easteregg.ifsae.domain.dog.dto.DogDetailDto;
import com.easteregg.ifsae.domain.dog.entity.Dog;
import com.easteregg.ifsae.domain.dog.repository.DogRepository;
import jakarta.transaction.Transactional;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class DogServiceImpl implements DogService {

    private final DogRepository dogRepository;

    public DogDetailDto findById(Long id) {
        Dog dog = dogRepository.findById(id).orElseThrow(NoSuchElementException::new);

        return DogDetailDto.builder()
                           .name(dog.getName())
                           .age(dog.getAge())
                           .gender(dog.getGender())
                           .dogStatus(dog.getDogStatus())
                           .species(dog.getSpecies().getName())
                           .info(dog.getInfo())
                           .image(dog.getImage())
                           .build();
    }

}
