package com.easteregg.ifsae.domain.recommend.service;

import com.easteregg.ifsae.domain.dog.entity.Dog;
import java.util.List;

public interface RankingService {

    List<Dog> findRankingsByUserId(Long userId);
}
