package com.easteregg.ifsae.domain.post.dto;

import com.easteregg.ifsae.domain.post.entity.Comment;
import com.easteregg.ifsae.domain.post.entity.Post;
import com.easteregg.ifsae.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class CommentDto {

    @Getter
    @Builder
    @NoArgsConstructor  // 기본 생성자 추가
    @AllArgsConstructor // 모든 필드를 포함한 생성자 추가
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
        private String userNickname;
        private String userProfileImg;
        private String content;
    }
}
