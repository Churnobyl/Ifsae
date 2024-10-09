package com.easteregg.ifsae.domain.post.controller;

import com.easteregg.ifsae.domain.post.dto.PostDto;
import com.easteregg.ifsae.domain.post.dto.PostDto.PostPreview;
import com.easteregg.ifsae.domain.post.service.PostService;
import com.easteregg.ifsae.domain.user.entity.User;
import com.easteregg.ifsae.global.dto.CommonSuccessResponse;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import com.easteregg.ifsae.global.elasticsearch.service.SearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/post")
@RequiredArgsConstructor
@Slf4j
public class PostController {
    private final PostService postService;
    private final SearchService searchService;

    /**
     * ES 게시물 조회
     * @param query 검색어
     * @param searchField 검색조건 (title, content, dogName, shelterName, userNickname)
     * @return List<PostDto.Response> 게시물 목록
     */
    @GetMapping("/search")
    public ResponseEntity<?> searchPosts(@RequestParam String query,
                                         @RequestParam(defaultValue = "title") String searchField) throws IOException {
        List<Long> postIds = searchService.searchPosts(query, searchField);

        List<PostDto.Response> posts = postService.findPostsByIds(postIds);

        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    /**
     * 게시글 상세 조회
     *
     * @param postId 게시글 아이디
     * @return PostDto.Response 상세 게시글 정보
     */
    @GetMapping("/{postId}")
    public ResponseEntity<?> getPost(@PathVariable("postId") Long postId) {
        PostDto.Response response = postService.read(postId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> writePost(
            @AuthenticationPrincipal User user,
            @RequestPart(value = "data") PostDto.Request request,
            @RequestPart(value = "video") MultipartFile multipartFile
    ) {
        postService.create(user, request, multipartFile);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/{postId}")
    public ResponseEntity<?> updatePost(
            @AuthenticationPrincipal User user,
            @PathVariable("postId") Long postId,
            @RequestBody PostDto.UpdateRequest uRequest
    ) {
        postService.update(user, postId, uRequest);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<?> deletePost(
            @AuthenticationPrincipal User user,
            @PathVariable("postId") Long postId
    ) {
        postService.delete(user, postId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/dog/{dogId}")
    public ResponseEntity<?> getPostListByDogId(@PathVariable Long dogId) {
        List<PostPreview> postList = postService.getPostList(dogId);

        return new ResponseEntity<>(postList, HttpStatus.OK);
    }

    @GetMapping("/like")
    public ResponseEntity<?> getPostListByLike(@AuthenticationPrincipal User user) {
        List<PostPreview> postList = postService.getPostListByLike(user.getId());

        return new ResponseEntity<>(postList, HttpStatus.OK);
    }

    @PostMapping("/like")
    public ResponseEntity<CommonSuccessResponse> addPostLike(@AuthenticationPrincipal User user,
                                                             @RequestParam long postId) {
        postService.createLike(user, postId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/like")
    public ResponseEntity<CommonSuccessResponse> deletePostLike(@AuthenticationPrincipal User user,
                                                                @RequestParam long postId) {
        postService.deleteLike(user, postId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/like/{postId}")
    public ResponseEntity<?> checkPostLike(@AuthenticationPrincipal User user, @PathVariable long postId) {
        boolean isLiked = postService.checkPostLike(user, postId);
        return new ResponseEntity<>(Map.of("isLiked", isLiked), HttpStatus.OK);
    }
}