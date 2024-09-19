package com.easteregg.ifsae.domain.post.entity;

import com.easteregg.ifsae.domain.post.repository.PostRepository;
import com.easteregg.ifsae.domain.shelter.entity.Shelter;
import com.easteregg.ifsae.domain.shelter.repository.ShelterRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class PostTest {

    @Autowired private PostRepository postRepository;
    @Autowired private ShelterRepository shelterRepository;

    @Test
    @DisplayName("Post에 createdAt과 updatedAt이 존재한다.")
    @Transactional
    void checkCreatedAtAndUpdatedAt() {
        // Given
        // Shelter 객체 생성
        Shelter shelter = Shelter.builder()
                .name("Test Shelter")
                .build();
        shelterRepository.save(shelter);

        // Post 객체 생성
        Post newPost = Post.builder()
                .title("강아지")
                .videoUrl("http://localhost:3000/video/1.mp4")
                .viewCnt(0)
                .likeCnt(0)
                .shelter(shelter) // Shelter 연관관계 주입
                .build();

        // post 저장
        postRepository.save(newPost);

        // When
        Optional<Post> savedPost = postRepository.findById(newPost.getId());

        // Then
        assertThat(savedPost).isPresent(); // 저장된 포스트 존재?
        assertThat(savedPost.get().getCreatedAt()).isNotNull(); // createdAt 존재?
        assertThat(savedPost.get().getUpdatedAt()).isNotNull(); // updatedAt 존재?
    }
}