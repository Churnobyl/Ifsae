package com.easteregg.ifsae.domain.post.service;

import com.easteregg.ifsae.domain.post.dto.CommentDto;
import com.easteregg.ifsae.domain.user.entity.User;

public interface CommentService {
    void create(User user, Long postId, CommentDto.Request request);
    void delete(User user, Long commentId);
}
