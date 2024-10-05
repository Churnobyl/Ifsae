package com.easteregg.ifsae.domain.recommend.service;

import com.easteregg.ifsae.domain.recommend.dto.UserSurveyRequest;
import com.easteregg.ifsae.domain.user.entity.User;

public interface UserSurveyService {

    void createUserSurvey(User user, UserSurveyRequest userSurveyRequest);

    void updateUserSurvey(User user, UserSurveyRequest userSurveyRequest);
}
