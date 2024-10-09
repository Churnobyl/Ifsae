package com.easteregg.ifsae.domain.dog.controller;

import com.easteregg.ifsae.domain.dog.dto.DogCreateRequest;
import com.easteregg.ifsae.domain.dog.dto.DogListDto;
import com.easteregg.ifsae.domain.dog.entity.Dog;
import com.easteregg.ifsae.domain.dog.service.DogService;
import com.easteregg.ifsae.domain.user.entity.User;
import com.easteregg.ifsae.global.dto.CommonSuccessResponse;
import com.easteregg.ifsae.global.elasticsearch.service.SearchService;
import jakarta.transaction.Transactional;

import java.io.IOException;
import java.util.List;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/dog")
@RequiredArgsConstructor
@Transactional
@Slf4j
public class DogController {
    private final DogService dogService;
    private final SearchService searchService;

    @PostMapping
    public ResponseEntity<CommonSuccessResponse> createDog(@AuthenticationPrincipal User user,
                                                           @RequestPart DogCreateRequest dogCreateRequest,
                                                           @RequestPart MultipartFile dogImage) throws IOException {
        dogService.createDog(user, dogCreateRequest, dogImage);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * ES 개 검색
     *
     * @param query       검색어
     * @param searchField 검색 조건 (name, species, shelterName)
     */
    @GetMapping("/search")
    public ResponseEntity<?> searchDogs(@RequestParam(defaultValue = "") String query,
                                        @RequestParam(defaultValue = "name") String searchField) throws IOException {
        List<Long> dogIds = searchService.searchDogs(query, searchField);

        List<DogListDto> dogs = dogService.findDogsByIds(dogIds);

        return new ResponseEntity<>(dogs, HttpStatus.OK);
    }

    @GetMapping("/{dogId}")
    public ResponseEntity<?> getDogDetail(@PathVariable long dogId) {
        return new ResponseEntity<>(dogService.findById(dogId), HttpStatus.OK);
    }

    @GetMapping("/shelter/{shelterId}")
    public ResponseEntity<?> getDogListByShelterId(@PathVariable long shelterId) {
        return new ResponseEntity<>(dogService.findDogsByShelterId(shelterId), HttpStatus.OK);
    }

    @GetMapping("/follow")
    public ResponseEntity<?> getFollowingDogs(@AuthenticationPrincipal User user) {
        return new ResponseEntity<>(dogService.findDogsByFollowerId(user.getId()), HttpStatus.OK);
    }

}
