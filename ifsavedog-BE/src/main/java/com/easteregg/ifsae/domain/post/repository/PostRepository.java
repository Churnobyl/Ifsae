package com.easteregg.ifsae.domain.post.repository;

import com.easteregg.ifsae.domain.post.entity.Post;
import com.easteregg.ifsae.domain.post.entity.PostDog;
import com.easteregg.ifsae.domain.post.entity.PostLike;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Post Jpa Repository
 */
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    Slice<Post> findPostsBy(Pageable pageable);

    @Query(value = "SELECT p FROM Post p " +
            "LEFT JOIN p.dogs " +
            "LEFT JOIN p.comments " +
            "LEFT JOIN FETCH p.likes " +
            "WHERE p.id = :postId")
    Optional<Post> findPostById(@Param("postId") Long postId);

    List<Post> findPostsByDogsIn(List<PostDog> postDogs);

    List<Post> findPostsByLikesIn(List<PostLike> postLikes);

}
