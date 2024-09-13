package com.easteregg.ifsae.domain.dog.repository;

import com.easteregg.ifsae.domain.dog.entity.Dog;
import com.easteregg.ifsae.domain.shelter.entity.ShelterDog;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DogRepository extends JpaRepository<Dog, Long> {

    Optional<Dog> findById(Long id);

    List<Dog> findDogsByName(String name);

    List<Dog> findDogsByShelterDogIn(List<ShelterDog> shelterDogs);

    

}
