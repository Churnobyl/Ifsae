package com.easteregg.ifsae.domain.recommend.service;

import com.easteregg.ifsae.domain.dog.entity.Dog;
import com.easteregg.ifsae.domain.recommend.entity.UserDogRating;
import com.easteregg.ifsae.domain.recommend.repository.UserDogRatingRepository;
import com.easteregg.ifsae.domain.user.entity.User;
import java.util.NoSuchElementException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDogRatingServiceImpl implements UserDogRatingService {

    private final UserDogRatingRepository userDogRatingRepository;

    @Override
    public void createRating(User user, Dog dog) {
        Optional<UserDogRating> userDogRating = userDogRatingRepository.findUserDogRatingsByUserIdAndDogId(user.getId(),
                                                                                                           dog.getId());
        if (userDogRating.isPresent()) {
            return;
        }

        UserDogRating dogRating = UserDogRating.builder()
                                               .user(user)
                                               .dog(dog)
                                               .build();
        userDogRatingRepository.save(dogRating);
    }

    /*  changeRating
     *  유저의 강아지 선호도를 변경하는 메소드
     *
     *  @param userId 유저 ID(PK)
     *  @param dogId 강아지 ID(PK)
     *  @param score 변경할 선호도 점수
     *               DEFAULT : 0   팔로우 : 5   영상 좋아요 : 2
     */
    @Override
    public void changeRating(Long userId, Long dogId, int score) {
        UserDogRating userDogRating = userDogRatingRepository.findUserDogRatingsByUserIdAndDogId(userId, dogId)
                                                             .orElseThrow(
                                                                     NoSuchElementException::new);

        userDogRating.updateScore(score);

        userDogRatingRepository.save(userDogRating);
    }

}
