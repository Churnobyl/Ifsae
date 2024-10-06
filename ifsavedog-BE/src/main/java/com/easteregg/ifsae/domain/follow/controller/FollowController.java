package com.easteregg.ifsae.domain.follow.controller;

import com.easteregg.ifsae.domain.follow.service.FollowService;
import com.easteregg.ifsae.domain.user.entity.User;
import com.easteregg.ifsae.global.dto.CommonSuccessResponse;
import jakarta.transaction.Transactional;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/follow")
@RequiredArgsConstructor
@Transactional
@Slf4j
public class FollowController {

    private final FollowService followService;

    @PostMapping
    public ResponseEntity<CommonSuccessResponse> createFollow(@AuthenticationPrincipal User user,
                                                              @RequestParam long dogId) {
        followService.createFollow(user.getId(), dogId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping
    public ResponseEntity<CommonSuccessResponse> deleteFollow(@AuthenticationPrincipal User user,
                                                              @RequestParam long dogId) {
        followService.deleteFollow(user.getId(), dogId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{dogId}")
    public ResponseEntity<?> checkFollow(@AuthenticationPrincipal User user, @PathVariable long dogId) {
        boolean isFollowed = followService.checkFollow(user.getId(), dogId);
        return new ResponseEntity<>(Map.of("isFollowed", isFollowed), HttpStatus.OK);
    }


}
