package com.easteregg.ifsae.global.elasticsearch.repository;

import com.easteregg.ifsae.global.elasticsearch.index.ESPost;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface ESPostRepository extends ElasticsearchRepository<ESPost, String> {

}
