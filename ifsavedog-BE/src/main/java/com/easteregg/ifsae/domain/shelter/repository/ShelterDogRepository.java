package com.easteregg.ifsae.domain.shelter.repository;


import com.easteregg.ifsae.domain.shelter.entity.ShelterDog;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShelterDogRepository extends JpaRepository<ShelterDog, Long> {

    List<ShelterDog> findShelterDogsByShelterName(String shelterName);

}
