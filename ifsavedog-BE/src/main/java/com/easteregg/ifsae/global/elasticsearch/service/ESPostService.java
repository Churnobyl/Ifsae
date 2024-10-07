package com.easteregg.ifsae.global.elasticsearch.service;

import com.easteregg.ifsae.domain.post.entity.Post;
import com.easteregg.ifsae.global.elasticsearch.index.ESPost;
import com.easteregg.ifsae.global.elasticsearch.index.ESShelter;
import com.easteregg.ifsae.global.elasticsearch.repository.ESPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ESPostService {
    private final ESPostRepository esPostRepository;

    public void savePost(Post post) {
        ESPost esPost = ESPost.builder()
                .id(post.getId().toString())
                .title(post.getTitle())
                .content(post.getContent())
                .dogIds(post.getDogs().stream()
                        .map(dog -> dog.getId().toString())
                        .toList())
                .shelter((ESShelter.builder()
                        .shelterId(post.getShelter().getId().toString())
                        .name(post.getShelter().getName())
                        .build()))
                .build();

        esPostRepository.save(esPost);
    }

    public void updatePost(Post post) {
        deletePost(post);
        savePost(post);
    }

    public void deletePost(Post post) {
        esPostRepository.deleteById(post.getId().toString());
    }
}