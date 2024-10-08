package com.easteregg.ifsae.domain.shelter.controller;

import com.easteregg.ifsae.domain.shelter.dto.ShelterCreateRequest;
import com.easteregg.ifsae.domain.shelter.dto.ShelterDetailDto;
import com.easteregg.ifsae.domain.shelter.service.ShelterService;
import com.easteregg.ifsae.domain.user.entity.User;
import com.easteregg.ifsae.global.dto.CommonSuccessResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

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
    public ResponseEntity<ShelterDetailDto> getShelterDetail(@PathVariable long shelterId) {
        return new ResponseEntity<>(shelterService.findShelterById(shelterId), HttpStatus.OK);
    }

    @PutMapping("{shelterId}")
    public ResponseEntity<?> updateShelter(@AuthenticationPrincipal User user,
                                           @PathVariable long shelterId,
                                           @RequestBody ShelterCreateRequest shelterCreateRequest) {
        shelterService.updateShelter(user, shelterId, shelterCreateRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * 프로필 사진 수정
     */
    @PutMapping("/profile-img")
    public ResponseEntity<String> updateShelterProfileImg(@AuthenticationPrincipal User user,
                                                       @RequestParam MultipartFile profileImg)
            throws IOException {

        return ResponseEntity.ok(shelterService.updateUserProfileImg(user, profileImg));
    }
}
