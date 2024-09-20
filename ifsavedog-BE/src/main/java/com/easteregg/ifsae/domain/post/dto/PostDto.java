package com.easteregg.ifsae.domain.post.dto;

import com.easteregg.ifsae.domain.post.entity.PostDog;
import com.easteregg.ifsae.domain.post.entity.PostLike;
import lombok.*;

import java.util.List;

public class PostDto {

    @Getter
    @Builder
    public static class Request {
        private Long id;
        private String title;
        private String content;
        private List<PostDog> dogs;
    }

    @Getter
    @Builder
    public static class Response {

    }
}
