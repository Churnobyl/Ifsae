package com.easteregg.ifsae.domain.post.repository;

import com.easteregg.ifsae.domain.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Post Jpa Repository
 */
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
}
