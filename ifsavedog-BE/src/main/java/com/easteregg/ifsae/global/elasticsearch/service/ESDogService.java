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
                           .id(dog.getId().toString())
                           .name(dog.getName())
                           .breed(dog.getSpecies().getName())
                           .imgUrl(dog.getImage())
                           .shelter(ESShelter.builder()
                                             .shelterId(dog.getShelterDog().getShelter().getId().toString())
                                             .name(dog.getShelterDog().getShelter().getName())
                                             .build())
                           .build();
        esDogRepository.save(esDog);
    }

    public void deleteDog(Dog dog) {
        esDogRepository.deleteById(dog.getId().toString());
    }
}
