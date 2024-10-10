package com.easteregg.ifsae.global.elasticsearch.controller;

import com.easteregg.ifsae.domain.dog.entity.Dog;
import com.easteregg.ifsae.domain.dog.type.DogStatus;
import com.easteregg.ifsae.domain.dog.type.Gender;
import com.easteregg.ifsae.domain.post.entity.Post;
import com.easteregg.ifsae.domain.post.entity.PostDog;
import com.easteregg.ifsae.domain.shelter.entity.Shelter;
import com.easteregg.ifsae.domain.shelter.entity.ShelterDog;
import com.easteregg.ifsae.global.elasticsearch.service.ESDogService;
import com.easteregg.ifsae.global.elasticsearch.service.ESPostService;
import com.easteregg.ifsae.global.elasticsearch.service.SearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/es/test")
public class ESController {
    private final ESDogService esDogService;

    private final ESPostService esPostService;

    private final SearchService searchService;

    // Dog 저장 테스트 API
    @PostMapping("/dog")
    public ResponseEntity<?> createDog() {
        Dog dog = Dog.builder()
                .id(1L)
                .name("강아지")
                .age(5)
                .gender(Gender.MALE)
                .dogStatus(DogStatus.NOT_ADOPTED)
                .species("잡개")
                .shelterDog(ShelterDog.builder()
                        .shelter(Shelter.builder()
                                .id(1L)
                                .name("보호소")
                                .build())
                        .build())
                .build();

        esDogService.saveDog(dog);

        Dog dog2 = Dog.builder()
                .id(2L)
                .name("댕댕강아지")
                .age(5)
                .gender(Gender.MALE)
                .dogStatus(DogStatus.NOT_ADOPTED)
                .species("똥개")
                .shelterDog(ShelterDog.builder()
                        .shelter(Shelter.builder()
                                .id(2L)
                                .name("진짜보호소")
                                .build())
                        .build())
                .build();

        esDogService.saveDog(dog2);

        return ResponseEntity.ok("Dog saved successfully in Elasticsearch.");
    }

    // Dog 삭제 테스트 API
    @DeleteMapping("/dog/{dogId}")
    public ResponseEntity<?> deleteDog(@PathVariable Long dogId) {
        Dog dog = Dog.builder().id(dogId).build();

        esDogService.deleteDog(dog);

        return ResponseEntity.ok("Dog deleted successfully from Elasticsearch.");
    }

    // 개 검색 API
    @GetMapping("/search/dogs")
    public ResponseEntity<?> searchDogs(@RequestParam(defaultValue = "") String query) throws IOException {
        List<Long> results = searchService.searchDogs(query);

        return ResponseEntity.ok(results);
    }

    // Post 저장 테스트 API
    @PostMapping("/post")
    public ResponseEntity<?> createPost() {
        Post post = Post.builder()
                .id(1L)
                .title("시고르자브종")
                .content("냐하하하")
                .videoUrl("https://example1.com/video")
                .thumbnailUrl("https://example1.com/thumbnail")
                .dogs(List.of(
                        PostDog.builder().id(1L).build(),
                        PostDog.builder().id(2L).build()
                ))
                .shelter(Shelter.builder()
                        .id(1L)
                        .name("댕댕보호소")
                        .build())
                .build();

        Post post2 = Post.builder()
                .id(2L)
                .title("어반자브종")
                .content("캬하하하")
                .videoUrl("https://example2.com/video")
                .thumbnailUrl("https://example2.com/thumbnail")
                .dogs(List.of(
                        PostDog.builder().id(1L).build(),
                        PostDog.builder().id(2L).build()
                ))
                .shelter(Shelter.builder()
                        .id(2L)
                        .name("싸피보호소")
                        .build())
                .build();

        esPostService.savePost(post);
        esPostService.savePost(post2);

        return ResponseEntity.ok("Post saved successfully in Elasticsearch.");
    }

    // Post 삭제 테스트 API
    @DeleteMapping("/post/{postId}")
    public ResponseEntity<?> deletePost(@PathVariable Long postId) {
        Post post = Post.builder().id(postId).build();

        esPostService.deletePost(post);

        return ResponseEntity.ok("Post deleted successfully from Elasticsearch.");
    }

    // 게시글 조건 검색 API
    @GetMapping("/search/posts")
    public ResponseEntity<?> searchPosts(@RequestParam(defaultValue = "") String query) throws IOException {
        List<Long> results = searchService.searchPosts(query);

        return ResponseEntity.ok(results);
    }
}
