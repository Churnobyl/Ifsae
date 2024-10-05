package com.easteregg.ifsae.domain.user.repository;

import com.easteregg.ifsae.domain.user.entity.HousingType;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HousingTypeRepository extends JpaRepository<HousingType, Long> {

    Optional<HousingType> findByName(String housingType);
}