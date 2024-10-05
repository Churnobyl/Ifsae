package com.easteregg.ifsae.domain.dog.repository;

import com.easteregg.ifsae.domain.dog.entity.Species;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpeciesRepository extends JpaRepository<Species, Integer> {

    Optional<Species> findByName(String speciesName);

}
