package com.easteregg.ifsae.domain.dog.service;

import com.easteregg.ifsae.domain.dog.dto.DogDetailDto;
import com.easteregg.ifsae.domain.dog.dto.DogListDto;
import com.easteregg.ifsae.domain.dog.entity.Dog;
import com.easteregg.ifsae.domain.dog.repository.DogRepository;
import com.easteregg.ifsae.domain.shelter.entity.ShelterDog;
import com.easteregg.ifsae.domain.shelter.repository.ShelterDogRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class DogServiceImpl implements DogService {

    private final DogRepository dogRepository;

    private final ShelterDogRepository shelterDogRepository;

    @Override
    public DogDetailDto findById(Long id) {
        Dog dog = dogRepository.findById(id).orElseThrow(NoSuchElementException::new);

        return DogDetailDto.builder()
                           .id(dog.getId())
                           .name(dog.getName())
                           .age(dog.getAge())
                           .gender(dog.getGender())
                           .dogStatus(dog.getDogStatus())
                           .species(dog.getSpecies().getName())
                           .info(dog.getInfo())
                           .image(dog.getImage())
                           .build();
    }

    @Override
    public List<DogListDto> findDogsByName(String name) {
        List<Dog> dogs = dogRepository.findDogsByName(name);

        return dogs.stream()
                   .map(dog -> DogListDto.builder()
                                         .id(dog.getId())
                                         .name(dog.getName())
                                         .image(dog.getImage())
                                         .shelter(dog.getShelterDog() != null ? dog.getShelterDog().getShelter() : null)
                                         .build())
                   .collect(Collectors.toList());
    }

    @Override
    public List<DogListDto> findDogsByShelterId(long shelterId) {
        List<ShelterDog> shelterDogs = shelterDogRepository.findShelterDogsByShelterId(shelterId);

        List<Dog> dogs = dogRepository.findDogsByShelterDogIn(shelterDogs);

        return dogs.stream()
                   .map(dog -> DogListDto.builder()
                                         .id(dog.getId())
                                         .name(dog.getName())
                                         .image(dog.getImage())
                                         .shelter(dog.getShelterDog() != null ? dog.getShelterDog().getShelter() : null)
                                         .build())
                   .collect(Collectors.toList());
    }

}
