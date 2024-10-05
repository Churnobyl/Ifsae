package com.easteregg.ifsae.domain.follow.service;

public interface FollowService {

    void createFollow(long userId, long dogId);

    void deleteFollow(long userId, long dogId);
}
