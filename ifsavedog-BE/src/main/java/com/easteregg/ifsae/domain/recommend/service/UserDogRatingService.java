package com.easteregg.ifsae.domain.recommend.service;

import com.easteregg.ifsae.domain.dog.entity.Dog;
import com.easteregg.ifsae.domain.user.entity.User;

public interface UserDogRatingService {

    void createRating(User user, Dog dog, int score);

}
