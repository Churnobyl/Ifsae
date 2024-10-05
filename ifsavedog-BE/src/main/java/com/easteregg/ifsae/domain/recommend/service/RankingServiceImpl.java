package com.easteregg.ifsae.domain.recommend.service;

import com.easteregg.ifsae.domain.dog.entity.Dog;
import com.easteregg.ifsae.domain.recommend.entity.Ranking;
import com.easteregg.ifsae.domain.recommend.repository.RankingRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RankingServiceImpl implements RankingService {

    private final RankingRepository rankingRepository;

    @Override
    public List<Dog> findRankingsByUserId(Long userId) {

        List<Ranking> rankingList = rankingRepository.findRankingsByUserIdOrderByRankingAsc(userId);

        return rankingList.stream().map(Ranking::getDog).toList();
    }


}
