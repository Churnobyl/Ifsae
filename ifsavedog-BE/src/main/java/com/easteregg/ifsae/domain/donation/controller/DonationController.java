package com.easteregg.ifsae.domain.donation.controller;

import com.easteregg.ifsae.domain.donation.dto.DonationDto;
import com.easteregg.ifsae.domain.donation.service.DonationService;
import com.easteregg.ifsae.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/donations")
public class DonationController {
    private final DonationService donationService;

    // 기부 신청
    @PostMapping("/dogs/{dogId}")
    public ResponseEntity<?> createDonation(@AuthenticationPrincipal User user,
                                            @RequestBody DonationDto.createDonationRequest request,
                                            @PathVariable Long dogId) {
        donationService.createDonation(user, request, dogId);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // 유저 기부한 강아지 내역 리스트 조회
    @GetMapping("/users")
    public ResponseEntity<?> getUserDonatedList(@AuthenticationPrincipal User user) {
        List<DonationDto.getUserDonatedListResponse> userDonatedList = donationService.getUserDonatedList(user);

        return new ResponseEntity<>(userDonatedList, HttpStatus.OK);
    }

    // 쉘터 기부받은 유저 내역 리스트 조회
    @GetMapping("/shelters")
    public ResponseEntity<?> getShelterDonorList(@AuthenticationPrincipal User user) {
        List<DonationDto.getShelterDonorListResponse> shelterDonorList = donationService.getShelterDonorList(user);

        return new ResponseEntity<>(shelterDonorList, HttpStatus.OK);
    }
}