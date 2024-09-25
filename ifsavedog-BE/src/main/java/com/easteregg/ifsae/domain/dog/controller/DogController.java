package com.easteregg.ifsae.domain.dog.controller;

import com.easteregg.ifsae.domain.dog.dto.DogCreateRequest;
import com.easteregg.ifsae.domain.dog.entity.Dog;
import com.easteregg.ifsae.domain.dog.service.DogService;
import com.easteregg.ifsae.domain.user.entity.User;
import com.easteregg.ifsae.global.dto.CommonSuccessResponse;
import jakarta.transaction.Transactional;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/dog")
@RequiredArgsConstructor
@Transactional
@Slf4j
public class DogController {

    private final DogService dogService;

    @PostMapping
    public ResponseEntity<CommonSuccessResponse> createDog(@AuthenticationPrincipal User user,
                                                           @RequestPart DogCreateRequest dogCreateRequest,
                                                           @RequestPart MultipartFile dogImage) throws IOException {

        Dog dog = dogService.createDog(user, dogCreateRequest);
        dogService.updateDogProfileImage(dogImage, dog);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{dogId}")
    public ResponseEntity<?> getDogDetail(@PathVariable long dogId) {
        return new ResponseEntity<>(dogService.findById(dogId), HttpStatus.OK);
    }

    @GetMapping("/shelter/{shelterId}")
    public ResponseEntity<?> getDogListByShelterId(@PathVariable long shelterId) {
        return new ResponseEntity<>(dogService.findDogsByShelterId(shelterId), HttpStatus.OK);
    }


}
