package com.easteregg.ifsae.domain.post.service;

import com.easteregg.ifsae.domain.post.dto.PostDto;
import com.easteregg.ifsae.domain.post.dto.PostDto.PostPreview;
import com.easteregg.ifsae.domain.post.entity.Post;
import com.easteregg.ifsae.domain.user.entity.User;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.web.multipart.MultipartFile;

public interface PostService {

    Slice<Post> getPostSlice(Pageable pageable);

    PostDto.Response read(Long postId);

    @Transactional
    Long create(User user, PostDto.Request request, MultipartFile multipartFile);

    void update(User user, Long postId, PostDto.UpdateRequest request);

    void delete(User user, Long postId);

    List<PostPreview> getPostList(Long dogId);

    List<PostPreview> getPostListByLike(Long userId);
}
