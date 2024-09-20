package com.easteregg.ifsae.domain.shelter.repository;

import com.easteregg.ifsae.domain.shelter.entity.ShelterUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShelterUserRepository extends JpaRepository<ShelterUser, Long> {

}
