package com.easteregg.ifsae.domain.recommend.controller;

import com.easteregg.ifsae.domain.post.dto.PostDto;
import com.easteregg.ifsae.domain.recommend.dto.UserSurveyRequest;
import com.easteregg.ifsae.domain.recommend.service.RankingService;
import com.easteregg.ifsae.domain.recommend.service.UserSurveyService;
import com.easteregg.ifsae.domain.user.entity.User;
import com.easteregg.ifsae.global.dto.CommonSuccessResponse;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/recommend")
@RequiredArgsConstructor
@Transactional
@Slf4j
public class RecommendController {

    private final RankingService rankingService;

    private final UserSurveyService userSurveyService;

    @PostMapping("/survey")
    public ResponseEntity<CommonSuccessResponse> createSurvey(@AuthenticationPrincipal User user,
                                                              @RequestBody UserSurveyRequest userSurveyRequest) {
        userSurveyService.createUserSurvey(user, userSurveyRequest);
        return new ResponseEntity<CommonSuccessResponse>(CommonSuccessResponse.of("응답을 완료하였습니다."), HttpStatus.CREATED);
    }

    @PutMapping("/survey")
    public ResponseEntity<CommonSuccessResponse> updateSurvey(@AuthenticationPrincipal User user,
                                                              @RequestBody UserSurveyRequest userSurveyRequest) {
        userSurveyService.updateUserSurvey(user, userSurveyRequest);
        return new ResponseEntity<CommonSuccessResponse>(CommonSuccessResponse.of("응답을 수정하였습니다."), HttpStatus.OK);
    }

    @GetMapping("/ranking")
    public ResponseEntity<?> readRanking(@AuthenticationPrincipal User user, @RequestParam int pageNum) {
        if (pageNum < 1 || pageNum > 20) {
            pageNum = 1;
        }

        long userId = user.getId();
        List<Long> list = rankingService.findDogIdListByUserId(userId, pageNum);
        List<PostDto.Response> response = rankingService.findPostDogListByDogIds(list);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/index/lastpage")
    public ResponseEntity<?> readLastPage(@AuthenticationPrincipal User user) {
        int lastPage = rankingService.getUserLastPage(user);
        System.out.println("-------------------" + lastPage + "-------------------");
        return new ResponseEntity<>(Map.of("lastPage", lastPage), HttpStatus.OK);
    }

    @GetMapping("/dogs")
    public ResponseEntity<?> getRecommendDogs(@AuthenticationPrincipal User user) {
        return new ResponseEntity<>(rankingService.getRecommendDogList(user), HttpStatus.OK);
    }

}
