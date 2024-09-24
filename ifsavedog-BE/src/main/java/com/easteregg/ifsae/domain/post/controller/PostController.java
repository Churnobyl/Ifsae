package com.easteregg.ifsae.domain.post.controller;

import com.easteregg.ifsae.domain.post.dto.PostDto;
import com.easteregg.ifsae.domain.post.service.PostService;
import com.easteregg.ifsae.domain.user.entity.User;
import com.easteregg.ifsae.global.dto.CommonSuccessResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/post")
@RequiredArgsConstructor
@Slf4j
public class PostController {

    private final PostService postService;

    @GetMapping("/{postId}")
    public ResponseEntity<?> getPost(@PathVariable("postId") Long postId) {
        PostDto.Response response = postService.read(postId);

        if (response == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @PreAuthorize("hasAuthority('user')")
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> writePost(
            @AuthenticationPrincipal User user,
            @RequestPart(value = "info") PostDto.Request request,
            @RequestPart(value = "file") MultipartFile multipartFile
    ) {


        postService.create(request, multipartFile);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/{postId}")
    public ResponseEntity<?> updatePost(@PathVariable("postId") Long postId, @RequestBody PostDto.UpdateRequest uRequest) {
        postService.update(postId, uRequest);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<?> deletePost(@PathVariable("postId") Long postId) {
        postService.delete(postId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
