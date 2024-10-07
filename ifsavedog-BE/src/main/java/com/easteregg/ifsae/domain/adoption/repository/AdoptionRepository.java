package com.easteregg.ifsae.domain.adoption.repository;

import com.easteregg.ifsae.domain.adoption.entity.Adoption;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AdoptionRepository extends JpaRepository<Adoption, Long> {
    List<Adoption> findAdoptionsByDogId(Long dogId);

    List<Adoption> findAdoptionsByShelterId(Long shelterId);

    List<Adoption> findAdoptionsByUserId(Long userId);
}