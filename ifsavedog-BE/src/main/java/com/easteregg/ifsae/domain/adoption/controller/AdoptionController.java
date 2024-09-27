package com.easteregg.ifsae.domain.adoption.controller;

import com.easteregg.ifsae.domain.adoption.dto.AdoptionCreateRequest;
import com.easteregg.ifsae.domain.adoption.dto.AdoptionUpdateRequest;
import com.easteregg.ifsae.domain.adoption.service.AdoptionService;
import com.easteregg.ifsae.domain.user.entity.User;
import com.easteregg.ifsae.global.dto.CommonSuccessResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/adoption")
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AdoptionController {

    private final AdoptionService adoptionService;

    @PostMapping
    public ResponseEntity<CommonSuccessResponse> applyAdoption(@AuthenticationPrincipal User user,
                                                               @RequestBody AdoptionCreateRequest adoptionCreateRequest) {
        adoptionService.createAdoption(user, adoptionCreateRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("{adoptionId}")
    public ResponseEntity<CommonSuccessResponse> updateAdoption(@AuthenticationPrincipal User user,
                                                                @PathVariable Long adoptionId,
                                                                @RequestBody AdoptionUpdateRequest adoptionUpdateRequest) {
        adoptionService.updateAdoption(user, adoptionId, adoptionUpdateRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("check/{adoptionId}")
    public ResponseEntity<CommonSuccessResponse> checkAdoption(@AuthenticationPrincipal User user,
                                                               @PathVariable Long adoptionId) {
        adoptionService.checkAdoption(user, adoptionId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
