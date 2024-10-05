package com.easteregg.ifsae.domain.adoption.controller;

import com.easteregg.ifsae.domain.adoption.dto.AdoptionApplierListDto;
import com.easteregg.ifsae.domain.adoption.dto.AdoptionCreateRequest;
import com.easteregg.ifsae.domain.adoption.dto.AdoptionDetailDto;
import com.easteregg.ifsae.domain.adoption.dto.AdoptionUpdateRequest;
import com.easteregg.ifsae.domain.adoption.service.AdoptionService;
import com.easteregg.ifsae.domain.user.entity.User;
import com.easteregg.ifsae.global.dto.CommonSuccessResponse;

import java.util.List;

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
@RequestMapping("/api/adoptions")
@RequiredArgsConstructor
@Slf4j
public class AdoptionController {
    private final AdoptionService adoptionService;

    @PostMapping
    public ResponseEntity<CommonSuccessResponse> createAdoption(@AuthenticationPrincipal User user,
                                                                @RequestBody AdoptionCreateRequest adoptionCreateRequest) {
        adoptionService.createAdoption(user, adoptionCreateRequest);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    //TODO : shleter 입양 신청 받은 리스트 조회
    //TODO : user가 입양 신청한 리스트 조회

    @GetMapping("/{adoptionId}")
    public ResponseEntity<AdoptionDetailDto> getAdoption(@AuthenticationPrincipal User user,
                                                         @PathVariable Long adoptionId) {

        return new ResponseEntity<>(adoptionService.findById(user, adoptionId), HttpStatus.OK);
    }

    @PutMapping("/{adoptionId}")
    public ResponseEntity<CommonSuccessResponse> updateAdoption(@AuthenticationPrincipal User user,
                                                                @PathVariable Long adoptionId,
                                                                @RequestBody AdoptionUpdateRequest adoptionUpdateRequest) {
        adoptionService.updateAdoption(user, adoptionId, adoptionUpdateRequest);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    //TODO : 입양 신청 수락 로직
//    @PutMapping("/accept/{adoptionId}")
//    public ResponseEntity<CommonSuccessResponse> acceptAdoption(@AuthenticationPrincipal User user,
//                                                                @PathVariable Long adoptionId) {
//        adoptionService.rejectAdoption(user, adoptionId);
//
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

    @PutMapping("/reject/{adoptionId}")
    public ResponseEntity<CommonSuccessResponse> rejectAdoption(@AuthenticationPrincipal User user,
                                                                @PathVariable Long adoptionId) {
        adoptionService.rejectAdoption(user, adoptionId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/dog/{dogId}")
    public ResponseEntity<List<AdoptionApplierListDto>> getApplierList(@AuthenticationPrincipal User user,
                                                                       @PathVariable Long dogId) {

        return new ResponseEntity<>(adoptionService.findUsersByDogId(user, dogId), HttpStatus.OK);
    }
}