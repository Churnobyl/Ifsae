package com.easteregg.ifsae.domain.post.controller;

import com.easteregg.ifsae.domain.post.dto.CommentDto;
import com.easteregg.ifsae.domain.post.service.CommentService;
import com.easteregg.ifsae.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/post/{postId}")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<?> writeComment(
            @AuthenticationPrincipal User user,
            @PathVariable("postId") Long postId,
            @RequestBody CommentDto.Request request
            ) {
        commentService.create(user, postId, request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(
            @AuthenticationPrincipal User user,
            @PathVariable("commentId") Long commentId
    ) {
        commentService.delete(user, commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
