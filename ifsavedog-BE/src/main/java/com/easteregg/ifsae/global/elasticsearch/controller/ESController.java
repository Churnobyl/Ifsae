package com.easteregg.ifsae.global.elasticsearch.controller;

import com.easteregg.ifsae.domain.dog.entity.Dog;
import com.easteregg.ifsae.domain.dog.entity.Species;
import com.easteregg.ifsae.domain.dog.type.DogStatus;
import com.easteregg.ifsae.domain.dog.type.Gender;
import com.easteregg.ifsae.domain.post.entity.Post;
import com.easteregg.ifsae.domain.post.entity.PostDog;
import com.easteregg.ifsae.domain.shelter.entity.Shelter;
import com.easteregg.ifsae.domain.shelter.entity.ShelterDog;
import com.easteregg.ifsae.global.elasticsearch.service.ESDogService;
import com.easteregg.ifsae.global.elasticsearch.service.ESPostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/es/test")
public class ESController {
    private final ESDogService esDogService;
    private final ESPostService esPostService;

    // *** Dog 관련 테스트 API ***

    // Dog 저장 테스트 API
    @PostMapping("/dog")
    public ResponseEntity<?> createDog() {
        // 테스트용 Dog 객체 생성
        Dog dog = Dog.builder()
                .id(1L)
                .name("Buddy")
                .age(5)
                .gender(Gender.MALE)
                .dogStatus(DogStatus.NOT_ADOPTED)
                .species(Species.builder().id(1).name("Golden Retriever").build())
                .shelterDog(ShelterDog.builder()
                        .shelter(Shelter.builder()
                                .id(123L)
                                .name("Happy Shelter")
                                .build())
                        .build())
                .build();

        // Elasticsearch에 저장
        esDogService.saveDog(dog);
        return ResponseEntity.ok("Dog saved successfully in Elasticsearch.");
    }

    // Dog 삭제 테스트 API
    @DeleteMapping("/dog/{dogId}")
    public ResponseEntity<?> deleteDog(@PathVariable Long dogId) {
        // 삭제할 Dog 객체 생성
        Dog dog = Dog.builder().id(dogId).build();
        esDogService.deleteDog(dog);
        return ResponseEntity.ok("Dog deleted successfully from Elasticsearch.");
    }

    // *** Post 관련 테스트 API ***

    // Post 저장 테스트 API
    @PostMapping("/post")
    public ResponseEntity<?> createPost() {
        // 테스트용 Post 객체 생성
        Post post = Post.builder()
                .id(1L)
                .title("My Dog's Adventure")
                .content("Today we went hiking in the mountains.")
                .videoUrl("https://example.com/video")
                .thumbnailUrl("https://example.com/thumbnail")
                .dogs(List.of(
                        PostDog.builder().id(1L).build(),
                        PostDog.builder().id(2L).build()
                ))
                .shelter(Shelter.builder()
                        .id(123L)
                        .name("Happy Shelter")
                        .build())
                .build();

        // Elasticsearch에 저장
        esPostService.savePost(post);
        return ResponseEntity.ok("Post saved successfully in Elasticsearch.");
    }

    // Post 삭제 테스트 API
    @DeleteMapping("/post/{postId}")
    public ResponseEntity<?> deletePost(@PathVariable Long postId) {
        Post post = Post.builder().id(postId).build();
        esPostService.deletePost(post);
        return ResponseEntity.ok("Post deleted successfully from Elasticsearch.");
    }
}