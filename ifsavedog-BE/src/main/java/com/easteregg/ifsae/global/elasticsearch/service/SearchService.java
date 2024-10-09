package com.easteregg.ifsae.global.elasticsearch.service;

import java.io.IOException;
import java.util.List;

public interface SearchService {
    List<Long> searchDogs(String searchField, String query) throws IOException;

    List<Long> searchPosts(String searchField, String query) throws IOException;
}