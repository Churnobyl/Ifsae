package com.easteregg.ifsae.domain.post.service;

import com.easteregg.ifsae.domain.post.dto.PostDto;
import com.easteregg.ifsae.domain.post.entity.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.web.multipart.MultipartFile;

public interface PostService {

    Slice<Post> getPostSlice(Pageable pageable);
    PostDto.Response read(Long postId);
    void create(PostDto.Request request, MultipartFile multipartFile);
    void update(Long postId, PostDto.Request request);
    void delete(Long postId);
}
