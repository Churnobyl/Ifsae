package com.easteregg.ifsae.global.elasticsearch.controller;

import com.easteregg.ifsae.domain.dog.entity.Dog;
import com.easteregg.ifsae.global.elasticsearch.service.ESDogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/es")
public class ESController {
    private final ESDogService esDogService;

    @PostMapping("/dog")
    public ResponseEntity<?> createDog(@RequestBody Dog dog) {
        return null;
    }

    @PutMapping("/dog/{dogId}")
    public ResponseEntity<?> updateDog() {
        return null;
    }

    @DeleteMapping("/dog/{dogId}")
    public ResponseEntity<?> deleteDog(@PathVariable Long dogId) {
        return null;
    }
}