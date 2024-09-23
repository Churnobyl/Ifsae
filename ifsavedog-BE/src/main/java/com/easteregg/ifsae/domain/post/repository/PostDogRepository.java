package com.easteregg.ifsae.domain.post.repository;

import com.easteregg.ifsae.domain.dog.entity.Dog;
import com.easteregg.ifsae.domain.post.entity.PostDog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostDogRepository extends JpaRepository<PostDog, Long> {

    List<PostDog> findByIdIn(List<Long> dogIds);
}
