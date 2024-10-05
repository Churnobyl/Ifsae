package com.easteregg.ifsae.domain.shelter.controller;

import com.easteregg.ifsae.domain.shelter.dto.ShelterCreateRequest;
import com.easteregg.ifsae.domain.shelter.service.ShelterService;
import com.easteregg.ifsae.domain.user.entity.User;
import com.easteregg.ifsae.global.dto.CommonSuccessResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/shelter")
@RequiredArgsConstructor
@Slf4j
public class ShelterController {

    private final ShelterService shelterService;

    @PostMapping
    public ResponseEntity<CommonSuccessResponse> createShelter(@AuthenticationPrincipal User user,
                                                               @RequestBody ShelterCreateRequest shelterCreateRequest) {
        shelterService.createShelter(user, shelterCreateRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("{shelterId}")
    public ResponseEntity<?> getShelterDetail(@PathVariable long shelterId) {
        return new ResponseEntity<>(shelterService.findShelterById(shelterId), HttpStatus.OK);
    }

    @PutMapping("{shelterId}")
    public ResponseEntity<?> updateShelter(@AuthenticationPrincipal User user,
                                           @PathVariable long shelterId,
                                           @RequestBody ShelterCreateRequest shelterCreateRequest) {
        shelterService.updateShelter(user, shelterId, shelterCreateRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
