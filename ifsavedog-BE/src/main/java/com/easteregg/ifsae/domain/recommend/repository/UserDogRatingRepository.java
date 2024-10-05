package com.easteregg.ifsae.domain.recommend.repository;

import com.easteregg.ifsae.domain.recommend.entity.UserDogRating;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDogRatingRepository extends JpaRepository<UserDogRating, Long> {

    Optional<UserDogRating> findUserDogRatingsByUserIdAndDogId(Long userId, Long dogId);

}
