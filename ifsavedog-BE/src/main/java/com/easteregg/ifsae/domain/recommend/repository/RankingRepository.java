package com.easteregg.ifsae.domain.recommend.repository;

import com.easteregg.ifsae.domain.recommend.entity.Ranking;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RankingRepository extends JpaRepository<Ranking, Long> {

    List<Ranking> findRankingsByUserIdOrderByRankingAsc(Long userId);

}
