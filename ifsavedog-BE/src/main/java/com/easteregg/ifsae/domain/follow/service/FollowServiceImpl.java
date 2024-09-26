package com.easteregg.ifsae.domain.follow.service;

import com.easteregg.ifsae.domain.dog.entity.Dog;
import com.easteregg.ifsae.domain.dog.repository.DogRepository;
import com.easteregg.ifsae.domain.follow.entity.Follow;
import com.easteregg.ifsae.domain.follow.repository.FollowRepository;
import com.easteregg.ifsae.domain.user.entity.User;
import com.easteregg.ifsae.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService {

    private final FollowRepository followRepository;

    private final UserRepository userRepository;

    private final DogRepository dogRepository;

    @Override
    public void createFollow(long userId, long dogId) {
        User user = userRepository.findById(userId).orElseThrow(NoSuchElementException::new);
        Dog dog = dogRepository.findById(dogId).orElseThrow(NoSuchElementException::new);
        followRepository.save(new Follow(user, dog));
    }

    @Override
    public void deleteFollow(long userId, long dogId) {
        Follow follow = followRepository.findByUserIdAndDogId(userId, dogId).orElseThrow(NoSuchElementException::new);
        followRepository.delete(follow);
    }
}
