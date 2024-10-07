package com.easteregg.ifsae.domain.follow.service;

import com.easteregg.ifsae.domain.user.entity.User;

public interface FollowService {

    void createFollow(long userId, long dogId);

    void deleteFollow(long userId, long dogId);

    boolean checkFollow(long userId, long dogId);
}
