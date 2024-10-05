package com.easteregg.ifsae.global.elasticsearch.repository;

import com.easteregg.ifsae.global.elasticsearch.index.ESDonation;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface ESDonationRepository extends ElasticsearchRepository<ESDonation, String> {

}
