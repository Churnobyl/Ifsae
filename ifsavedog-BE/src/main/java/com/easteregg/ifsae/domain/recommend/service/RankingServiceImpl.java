package com.easteregg.ifsae.domain.recommend.service;

import com.easteregg.ifsae.domain.post.dto.PostDto;
import com.easteregg.ifsae.domain.post.entity.Post;
import com.easteregg.ifsae.domain.post.entity.PostDog;
import com.easteregg.ifsae.domain.post.repository.PostDogRepository;
import com.easteregg.ifsae.domain.recommend.entity.Ranking;
import com.easteregg.ifsae.domain.recommend.repository.RankingRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RankingServiceImpl implements RankingService {

    private final RankingRepository rankingRepository;
    private final PostDogRepository postDogRepository;

    @Override
    public List<Long> findDogIdListByUserId(Long userId, int pageNum) {

        List<Ranking> rankingList = rankingRepository.findRankingsByUserIdOrderByRankingAsc(userId);
        List<Long> dogIds = new ArrayList<>();

        int pageSize = 5;
        int fromIndex = (pageNum - 1) * pageSize;
        int toIndex = Math.min(pageNum * pageSize, rankingList.size());
        if(fromIndex >= rankingList.size()){
            return new ArrayList<>();
        }

        List<Ranking> subList = rankingList.subList(fromIndex, toIndex);
        for (Ranking ranking : subList) {
            dogIds.add(ranking.getDog().getId());

        }
        return dogIds;
    }

    @Override
    public List<PostDto.Response> findPostDogListByDogIds(List<Long> dogIds) {
        List<PostDog> postDogs = new ArrayList<>();
        for(Long dogId : dogIds) {
            postDogs.add(postDogRepository.findPostIdByDogIdOrderByIdDesc(dogId));
        }

        List<Post> posts = postDogs.stream().map(PostDog::getPost).toList();

        return posts.stream().map(Post::toResponseDto).toList();
    }
}
