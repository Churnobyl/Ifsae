package com.easteregg.ifsae.domain.post.dto;

import com.easteregg.ifsae.domain.post.entity.Comment;
import com.easteregg.ifsae.domain.post.entity.Post;
import com.easteregg.ifsae.domain.post.entity.PostDog;
import com.easteregg.ifsae.domain.post.entity.PostLike;
import com.easteregg.ifsae.domain.shelter.entity.Shelter;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

public class PostDto {

    @Getter
    @Builder
    @ToString
    public static class Request {
        private Long id;

        @NotNull(message = "[PostDto.Request] need title")
        @Size(min = 1, max = 100, message = "[PostDto.Request] invalid title size")
        private String title;
        private String content;
        private String videoUrl;

        @Column(name = "shelter_id")
        private Long shelterId;

        @Column(name = "dog_ids")
        private List<Long> dogIds;

        public Post toEntity(String videoUrl, Shelter shelter) {
            return Post.builder()
                    .id(id)
                    .title(title)
                    .content(content)
                    .videoUrl(videoUrl)
                    .shelter(shelter)
                    .dogs(new ArrayList<>())
                    .comments(new ArrayList<>())
                    .likes(new ArrayList<>())
                    .build();
        }
    }

    @Getter
    @Builder
    @ToString
    public static class UpdateRequest {
        private Long id;

        @NotNull(message = "[PostDto.UpdateRequest] need title")
        @Size(min = 1, max = 100, message = "[PostDto.UpdateRequest] invalid title size")
        private String title;
        private String content;

        @Column(name = "dog_ids")
        private List<Long> dogIds;

        public Post toEntity(Post originalPost) {
            return Post.builder()
                    .id(originalPost.getId())
                    .title(title)
                    .content(content)
                    .videoUrl(originalPost.getVideoUrl())
                    .shelter(originalPost.getShelter())
                    .comments(originalPost.getComments())
                    .likes(originalPost.getLikes())
                    .likeCnt(originalPost.getLikeCnt())
                    .viewCnt(originalPost.getViewCnt())
                    .build();
        }
    }

    @Getter
    @Builder
    @ToString
    public static class Response {
        private Long id;
        private String title;
        private String content;
        private String videoUrl;
        private Shelter shelter;
        private List<PostDog> dogs;
        private List<Comment> comments;
        private List<PostLike> likes;
        private int likeCnt;
        private int viewCnt;
    }
}
