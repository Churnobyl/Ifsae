package com.easteregg.ifsae.domain.shelter.repository;

import com.easteregg.ifsae.domain.shelter.entity.Shelter;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShelterRepository extends JpaRepository<Shelter, Long> {

}
