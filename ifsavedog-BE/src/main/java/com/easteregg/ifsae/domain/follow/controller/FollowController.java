package com.easteregg.ifsae.domain.follow.controller;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dog")
@RequiredArgsConstructor
@Transactional
@Slf4j
public class FollowController {

}
