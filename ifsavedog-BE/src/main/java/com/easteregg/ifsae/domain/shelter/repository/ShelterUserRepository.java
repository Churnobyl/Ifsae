package com.easteregg.ifsae.domain.shelter.repository;

import com.easteregg.ifsae.domain.shelter.entity.ShelterUser;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShelterUserRepository extends JpaRepository<ShelterUser, Long> {

    Optional<ShelterUser> findByUserId(long userId);

    List<ShelterUser> findAllByShelterId(long shelterId);

}
