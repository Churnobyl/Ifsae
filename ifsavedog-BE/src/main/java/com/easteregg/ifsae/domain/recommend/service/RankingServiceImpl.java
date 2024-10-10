package com.easteregg.ifsae.domain.recommend.service;

import com.easteregg.ifsae.domain.post.dto.PostDto;
import com.easteregg.ifsae.domain.post.entity.Post;
import com.easteregg.ifsae.domain.post.entity.PostDog;
import com.easteregg.ifsae.domain.post.repository.PostDogRepository;
import com.easteregg.ifsae.domain.recommend.entity.LastPage;
import com.easteregg.ifsae.domain.recommend.entity.Ranking;
import com.easteregg.ifsae.domain.recommend.repository.LastPageRedisRepository;
import com.easteregg.ifsae.domain.recommend.repository.RankingRepository;
import com.easteregg.ifsae.domain.user.entity.User;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RankingServiceImpl implements RankingService {

    private final long DEFAULT_RANK_USER_ID = 100;

    private final RankingRepository rankingRepository;
    private final PostDogRepository postDogRepository;
    private final LastPageRedisRepository lastPageRedisRepository;

    @Override
    public List<Long> findDogIdListByUserId(Long userId, int pageNum) {

        List<Ranking> rankingList = rankingRepository.findRankingsByUserIdOrderByRankingAsc(userId);

        if (rankingList.isEmpty()) {
            rankingList = rankingRepository.findRankingsByUserIdOrderByRankingAsc(DEFAULT_RANK_USER_ID);
        }

        List<Long> dogIds = new ArrayList<>();

        int pageSize = 5;
        int fromIndex = (pageNum - 1) * pageSize;
        int toIndex = Math.min(pageNum * pageSize, rankingList.size());
        if (fromIndex >= rankingList.size()) {
            return new ArrayList<>();
        }

        List<Ranking> subList = rankingList.subList(fromIndex, toIndex);
        for (Ranking ranking : subList) {
            dogIds.add(ranking.getDog().getId());
        }

        LastPage lastPage = lastPageRedisRepository.findById(userId).orElseThrow(NoSuchElementException::new);

        if (pageNum == 20) {
            lastPage.initLastPage();
        } else {
            lastPage.updateLastPage();
        }

        lastPageRedisRepository.save(lastPage);

        return dogIds;
    }

    @Override
    public List<PostDto.Response> findPostDogListByDogIds(List<Long> dogIds) {
        List<PostDog> postDogs = new ArrayList<>();
        for (Long dogId : dogIds) {
            postDogs.add(postDogRepository.findPostIdByDogIdOrderByIdDesc(dogId));
        }

        List<Post> posts = postDogs.stream().map(PostDog::getPost).toList();

        return posts.stream().map(Post::toResponseDto).toList();
    }

    @Override
    public int getUserLastPage(User user) {
        Optional<LastPage> lastPage = lastPageRedisRepository.findById(user.getId());

        if (lastPage.isPresent()) {
            return lastPage.get().getLastPage();
        }

        lastPageRedisRepository.save(LastPage.builder()
                                             .userId(user.getId())
                                             .lastPage(1)
                                             .build());

        return 1;
    }
}
