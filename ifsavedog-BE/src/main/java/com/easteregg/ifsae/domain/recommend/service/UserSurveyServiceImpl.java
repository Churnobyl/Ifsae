package com.easteregg.ifsae.domain.recommend.service;

import com.easteregg.ifsae.domain.recommend.dto.UserSurveyRequest;
import com.easteregg.ifsae.domain.recommend.entity.UserSurvey;
import com.easteregg.ifsae.domain.recommend.repository.UserSurveyRepository;
import com.easteregg.ifsae.domain.user.entity.User;
import com.easteregg.ifsae.domain.user.repository.UserRepository;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserSurveyServiceImpl implements UserSurveyService {

    private final UserSurveyRepository userSurveyRepository;

    private final UserRepository userRepository;

    @Override
    public void createUserSurvey(User user, UserSurveyRequest userSurveyRequest) {
        UserSurvey userSurvey = UserSurvey.from(user, userSurveyRequest);
        user.changeUserStatus();

        userSurveyRepository.save(userSurvey);
        userRepository.save(user);
    }

    @Override
    public void updateUserSurvey(User user, UserSurveyRequest userSurveyRequest) {
        UserSurvey userSurvey = userSurveyRepository.findByUserId(user.getId())
                                                    .orElseThrow(NoSuchElementException::new);
        userSurvey.update(userSurveyRequest);
        userSurveyRepository.save(userSurvey);
    }


}
