package com.easteregg.ifsae.domain.adoption.controller;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/adoption")
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AdoptionController {

}
