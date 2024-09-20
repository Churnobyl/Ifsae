package com.easteregg.ifsae.domain.post.repository;

import com.easteregg.ifsae.domain.post.entity.PostDog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostDogRepository extends JpaRepository<PostDog, Long> {
}
