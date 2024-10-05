package com.easteregg.ifsae.global.elasticsearch.repository;

import com.easteregg.ifsae.global.elasticsearch.index.ESDog;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface ESDogRepository extends ElasticsearchRepository<ESDog, String> {

}
