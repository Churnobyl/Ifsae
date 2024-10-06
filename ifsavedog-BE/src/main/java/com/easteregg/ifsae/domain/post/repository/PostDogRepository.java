package com.easteregg.ifsae.domain.post.repository;

import com.easteregg.ifsae.domain.post.entity.PostDog;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostDogRepository extends JpaRepository<PostDog, Long> {

    List<PostDog> findByIdIn(List<Long> dogIds);

    List<PostDog> findByDogId(Long dogId);
}
