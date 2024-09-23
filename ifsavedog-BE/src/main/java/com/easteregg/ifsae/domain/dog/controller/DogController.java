package com.easteregg.ifsae.domain.dog.controller;

import com.easteregg.ifsae.domain.dog.service.DogService;
import com.easteregg.ifsae.global.s3.S3ImageUploader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dog")
@RequiredArgsConstructor
@Slf4j
public class DogController {

    private final DogService dogService;

    private final S3ImageUploader s3ImageUploader;

}
