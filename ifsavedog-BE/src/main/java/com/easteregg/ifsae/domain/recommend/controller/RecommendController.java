package com.easteregg.ifsae.domain.recommend.controller;

import com.easteregg.ifsae.domain.recommend.service.RankingService;
import com.easteregg.ifsae.domain.recommend.service.UserDogRatingServiceImpl;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/recommend")
@RequiredArgsConstructor
@Transactional
@Slf4j
public class RecommendController {

    private final RankingService rankingService;

    private final UserDogRatingServiceImpl userDogRatingService;

    

}
