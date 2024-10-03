package com.easteregg.ifsae.domain.recommend.repository;

import com.easteregg.ifsae.domain.recommend.entity.UserSurvey;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSurveyRepository extends JpaRepository<UserSurvey, Long> {

    Optional<UserSurvey> findByUserId(Long id);
}
