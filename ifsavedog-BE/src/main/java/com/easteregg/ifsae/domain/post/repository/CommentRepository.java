package com.easteregg.ifsae.domain.post.repository;

import com.easteregg.ifsae.domain.post.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Comment Jpa Repository
 */
@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
}
