package com.easteregg.ifsae.domain.post.dto;

import com.easteregg.ifsae.domain.post.entity.Comment;
import com.easteregg.ifsae.domain.post.entity.Post;
import com.easteregg.ifsae.domain.user.dto.UserDto;
import com.easteregg.ifsae.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;

public class CommentDto {

    @Builder
    @Getter
    public static class Request {
        private String content;

        public Comment toEntity(User user, Post post) {
            return Comment.builder()
                    .user(user)
                    .content(content)
                    .post(post)
                    .build();
        }
    }

    @Getter
    @Builder
    public static class Response {
        private Long id;
        private UserDto userDto;
        private String content;
    }
}
