package com.easteregg.ifsae.global.elasticsearch.service;

import com.easteregg.ifsae.domain.dog.entity.Dog;
import com.easteregg.ifsae.global.elasticsearch.index.ESDog;
import com.easteregg.ifsae.global.elasticsearch.index.ESShelter;
import com.easteregg.ifsae.global.elasticsearch.repository.ESDogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ESDogService {
    private final ESDogRepository esDogRepository;

    public void saveDog(Dog dog) {
        ESDog esDog = ESDog.builder()
                .id(Long.toString(dog.getId()))
                .name(dog.getName())
                .species(dog.getSpecies())
                .shelter(ESShelter.builder()
                        .shelterId(dog.getShelterDog().getShelter().getId().toString())
                        .name(dog.getShelterDog().getShelter().getName())
                        .build())
                .build();

        esDogRepository.save(esDog);
    }

    public void updateDog(Dog dog) {
        deleteDog(dog);
        saveDog(dog);
    }

    public void deleteDog(Dog dog) {
        esDogRepository.deleteById(Long.toString(dog.getId()));
    }
}