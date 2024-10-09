package com.easteregg.ifsae.domain.recommend.service;

import com.easteregg.ifsae.domain.recommend.dto.UserSurveyRequest;
import com.easteregg.ifsae.domain.recommend.entity.UserSurvey;
import com.easteregg.ifsae.domain.recommend.repository.UserSurveyRepository;
import com.easteregg.ifsae.domain.user.entity.User;
import com.easteregg.ifsae.domain.user.repository.UserRepository;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.apache.http.protocol.HTTP;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;

@Service
@RequiredArgsConstructor
public class UserSurveyServiceImpl implements UserSurveyService {

    private final UserSurveyRepository userSurveyRepository;

    private final UserRepository userRepository;

//    @Value("${fastApi.endpoint}")
//    String fastApiEndpoint;
//
//    public void sendAPI(User user){
//        RestTemplate restTemplate = new RestTemplate();
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//        HttpEntity<Long> requestEntity = new HttpEntity<>(user.getId(), headers);
//        restTemplate.exchange(fastApiEndpoint, HttpMethod.POST, requestEntity, User.class);
//    }

    @Override
    public void createUserSurvey(User user, UserSurveyRequest userSurveyRequest) {
        UserSurvey userSurvey = UserSurvey.from(user, userSurveyRequest);
        user.changeUserStatus();

        userSurveyRepository.save(userSurvey);
        userRepository.save(user);
//        sendAPI(user);
    }

    @Override
    public void updateUserSurvey(User user, UserSurveyRequest userSurveyRequest) {
        UserSurvey userSurvey = userSurveyRepository.findByUserId(user.getId())
                                                    .orElseThrow(NoSuchElementException::new);
        userSurvey.update(userSurveyRequest);
        userSurveyRepository.save(userSurvey);
    }


}
