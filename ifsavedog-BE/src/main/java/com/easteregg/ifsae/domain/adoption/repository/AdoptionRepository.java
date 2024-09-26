package com.easteregg.ifsae.domain.adoption.repository;

import com.easteregg.ifsae.domain.adoption.entity.Adoption;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdoptionRepository extends JpaRepository<Adoption, Long> {

}
