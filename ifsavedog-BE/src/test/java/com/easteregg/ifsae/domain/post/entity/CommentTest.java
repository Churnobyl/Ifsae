package com.easteregg.ifsae.domain.post.entity;

import com.easteregg.ifsae.domain.post.repository.CommentRepository;
import com.easteregg.ifsae.domain.post.repository.PostRepository;
import com.easteregg.ifsae.domain.shelter.entity.Shelter;
import com.easteregg.ifsae.domain.shelter.repository.ShelterRepository;
import com.easteregg.ifsae.domain.user.entity.User;
import com.easteregg.ifsae.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class CommentTest {

    @Autowired private PostRepository postRepository;
    @Autowired private ShelterRepository shelterRepository;
    @Autowired private CommentRepository commentRepository;
    @Autowired private UserRepository userRepository;

    @Test
    @DisplayName("Comment에 createdAt과 updatedAt이 존재한다.")
    @Transactional
    void checkCreatedAtAndUpdatedAt() {
        // Given
        // Shelter 객체 생성
        Shelter shelter = Shelter.builder()
                .name("Test Shelter")
                .build();

        // Shelter 객체 저장
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

        User user = User.builder()
                .email("user1@naver.com")
                .nickname("user1")
                .password("1234")
                .build();

        userRepository.save(user);

        // Comment 생성
        Comment newComment = Comment.builder()
                .id(1L)
                .post(newPost)
                .user(user)
                .content("Test")
                .build();

        // Comment 저장
        commentRepository.save(newComment);

        // When
        Optional<Comment> savedComment = commentRepository.findById(1L);

        // Then
        assertThat(savedComment).isPresent(); // 저장된 코멘트 존재?
        assertThat(savedComment.get().getCreatedAt()).isNotNull(); // createdAt 존재?
        assertThat(savedComment.get().getUpdatedAt()).isNotNull(); // updatedAt 존재?
    }
}