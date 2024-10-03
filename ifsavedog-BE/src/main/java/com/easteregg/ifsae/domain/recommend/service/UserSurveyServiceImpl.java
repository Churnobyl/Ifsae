package com.easteregg.ifsae.domain.recommend.service;

import com.easteregg.ifsae.domain.recommend.dto.UserSurveyRequest;
import com.easteregg.ifsae.domain.recommend.entity.UserSurvey;
import com.easteregg.ifsae.domain.recommend.repository.UserSurveyRepository;
import com.easteregg.ifsae.domain.user.entity.User;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserSurveyServiceImpl implements UserSurveyService {

    private final UserSurveyRepository userSurveyRepository;

    @Override
    public void createUserSurvey(User user, UserSurveyRequest userSurveyRequest) {
        UserSurvey userSurvey = UserSurvey.from(user, userSurveyRequest);

        userSurveyRepository.save(userSurvey);

    }

    @Override
    public void updateUserSurvey(User user, UserSurveyRequest userSurveyRequest) {
        UserSurvey userSurvey = userSurveyRepository.findByUserId(user.getId())
                                                    .orElseThrow(NoSuchElementException::new);
        userSurvey.update(userSurveyRequest);
        userSurveyRepository.save(userSurvey);
    }


}
