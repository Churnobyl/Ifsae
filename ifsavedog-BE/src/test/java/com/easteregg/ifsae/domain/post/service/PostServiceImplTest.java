package com.easteregg.ifsae.domain.post.service;

import com.easteregg.ifsae.domain.post.dto.PostDto;
import com.easteregg.ifsae.domain.post.entity.PostDog;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PostServiceImplTest {

    @Autowired PostService postService;

    @Test
    @DisplayName("Post를 작성할 수 있다")
    void createPost() {
        PostDto.Request request = PostDto.Request.builder()
                .id(1L)
                .title("title1")
                .content("abc")
                .dogs(new ArrayList<PostDog>())
                .build();


        PostDto.Response dataFromDB = postService.read(1L);

        Assertions.assertThat(request).isEqualTo(dataFromDB);
    }
}