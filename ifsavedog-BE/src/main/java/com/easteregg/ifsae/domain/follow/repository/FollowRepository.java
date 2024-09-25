package com.easteregg.ifsae.domain.follow.repository;

import com.easteregg.ifsae.domain.follow.entity.Follow;
import com.easteregg.ifsae.domain.user.entity.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {

    @Query("SELECT f FROM Follow f JOIN FETCH f.dog WHERE f.user.id = :userId")
    List<Follow> findFollowsByUserId(@Param("userId") Long userId);


    @Query("SELECT f FROM Follow f JOIN FETCH f.user WHERE f.dog.id = :dogId")
    List<User> findUsersFollowingDog(@Param("dogId") Long dogId);

    Optional<Follow> findByUserIdAndDogId(Long userId, Long dogId);

}
