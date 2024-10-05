package com.easteregg.ifsae.domain.recommend.repository;

import com.easteregg.ifsae.domain.recommend.entity.UserDogRating;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDogRatingRepository extends JpaRepository<UserDogRating, Long> {

}
