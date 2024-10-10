package com.easteregg.ifsae.global.elasticsearch.service;

import java.io.IOException;
import java.util.List;

public interface SearchService {
    List<Long> searchDogs(String query) throws IOException;

    List<Long> searchPosts(String query) throws IOException;
}