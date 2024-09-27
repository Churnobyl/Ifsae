package com.easteregg.ifsae.domain.post.service;

import com.easteregg.ifsae.domain.post.dto.CommentDto;
import com.easteregg.ifsae.domain.post.entity.Comment;
import com.easteregg.ifsae.domain.post.entity.Post;
import com.easteregg.ifsae.domain.post.repository.CommentRepository;
import com.easteregg.ifsae.domain.post.repository.PostRepository;
import com.easteregg.ifsae.domain.user.entity.User;
import com.easteregg.ifsae.global.exception.ErrorCode;
import com.easteregg.ifsae.global.exception.type.CommentException;
import com.easteregg.ifsae.global.exception.type.PostException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

    @Override
    public void create(User user, Long postId, CommentDto.Request request) {
        Post post = postRepository.findPostById(postId).orElseThrow(()
                -> new PostException(ErrorCode.INVALID_PAGE_REQUEST));
        Comment comment = request.toEntity(user, post);
        commentRepository.save(comment);
    }

    @Override
    public void delete(User user, Long commentId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(()
                -> new CommentException(ErrorCode.COMMENT_NOT_FOUND));

        if (!Objects.equals(comment.getUser().getId(), user.getId())) {
            throw new CommentException(ErrorCode.FORBIDDEN);
        }

        commentRepository.delete(comment);
    }
}
