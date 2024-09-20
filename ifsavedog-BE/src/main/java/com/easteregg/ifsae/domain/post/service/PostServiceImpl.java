package com.easteregg.ifsae.domain.post.service;

import com.easteregg.ifsae.domain.post.dto.PostDto;
import com.easteregg.ifsae.domain.post.entity.Post;
import com.easteregg.ifsae.domain.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final ModelMapper modelMapper;

    @Override
    public Slice<Post> getPostSlice(Pageable pageable) {
        return postRepository.findPostsBy(pageable);
    }

    @Override
    public PostDto.Response read(Long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        return optionalPost.map(post
                -> modelMapper.map(post, PostDto.Response.class)).orElse(null);
    }

    @Override
    public void create(PostDto.Request request, MultipartFile multipartFile) {
        Post post = modelMapper.map(request, Post.class);
        postRepository.save(post);
    }

    @Override
    public void update(Long postId, PostDto.Request request) {
        Post post = modelMapper.map(request, Post.class);
        post.setId(postId);
        postRepository.save(post);
    }

    @Override
    public void delete(Long postId) {
        postRepository.deleteById(postId);
    }
}
