package com.easteregg.ifsae.global.elasticsearch.service;

import com.easteregg.ifsae.domain.user.entity.User;

import java.io.IOException;
import java.util.List;

public interface SearchService {
    List<Long> searchDogs(String query, User user) throws IOException;

    List<Long> searchPosts(String query) throws IOException;
}