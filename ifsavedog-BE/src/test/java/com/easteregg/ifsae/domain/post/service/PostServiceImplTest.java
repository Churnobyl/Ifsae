package com.easteregg.ifsae.domain.post.service;

import com.easteregg.ifsae.domain.post.dto.PostDto;
import com.easteregg.ifsae.domain.post.entity.Post;
import com.easteregg.ifsae.domain.post.entity.PostDog;
import com.easteregg.ifsae.domain.post.repository.PostRepository;
import com.easteregg.ifsae.domain.shelter.entity.Shelter;
import com.easteregg.ifsae.domain.shelter.repository.ShelterRepository;
import jakarta.transaction.Transactional;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PostServiceImplTest {

    @Autowired PostService postService;
    @Autowired ShelterRepository shelterRepository;
    @Autowired
    private PostRepository postRepository;

    @Test
    @Transactional
    @DisplayName("Post를 작성하고 읽을 수 있다(create, read)")
    void createAndReadPost() throws IOException {
        Shelter shelter = Shelter.builder()
                .name("aaa")
                .address("bbb")
                .content("ccc")
                .build();

        shelterRepository.save(shelter);

        PostDto.Request request = PostDto.Request.builder()
                .title("title1")
                .content("abc")
                .shelterId(shelter.getId())
                .dogIds(Arrays.asList(1L, 2L, 3L, 4L))
                .build();

        FileInputStream inputFile = new FileInputStream("src/test/resources/test_video.mp4");

        // Mocking MultipartFile 생성
        MockMultipartFile mockMultipartFile = new MockMultipartFile(
                "file", // 파라미터 이름
                "test_video.mp4", // 파일 이름
                "video/mp4", // MIME 타입
                inputFile // 파일 내용 (InputStream)
        );

        Long id = postService.create(request, mockMultipartFile);

        PostDto.Response dataFromDB = postService.read(id);

        assertThat(request.getTitle()).isEqualTo(dataFromDB.getTitle());
    }

    @Test
    @Transactional
    @DisplayName("Post를 수정할 수 있다.(update)")
    void updatePost() throws IOException {
        Shelter shelter = Shelter.builder()
                .name("aaa")
                .address("bbb")
                .content("ccc")
                .build();

        shelterRepository.save(shelter);

        PostDto.Request request = PostDto.Request.builder()
                .title("title1")
                .content("abc")
                .shelterId(shelter.getId())
                .dogIds(Arrays.asList(1L, 2L, 3L, 4L))
                .build();

        FileInputStream inputFile = new FileInputStream("src/test/resources/test_video.mp4");

        // Mocking MultipartFile 생성
        MockMultipartFile mockMultipartFile = new MockMultipartFile(
                "file", // 파라미터 이름
                "test_video.mp4", // 파일 이름
                "video/mp4", // MIME 타입
                inputFile // 파일 내용 (InputStream)
        );

        Long id = postService.create(request, mockMultipartFile);

        PostDto.Response dataFromDB = postService.read(id);

        System.out.println("dataFromDB = " + dataFromDB);

        // update 요청 들어옴
        PostDto.UpdateRequest request2 = PostDto.UpdateRequest.builder()
                .title("title2")
                .content("bcd")
                .dogIds(Arrays.asList(2L,3L,4L,5L))
                .build();

        // update 쿼리 날림
        postService.update(id, request2);

        // DB로부터 다시 데이터 긁어오기
        PostDto.Response dataFromDB2 = postService.read(id);

        System.out.println("dataFromDB2 = " + dataFromDB2);
    }

}