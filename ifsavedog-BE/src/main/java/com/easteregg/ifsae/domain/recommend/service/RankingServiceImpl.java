package com.easteregg.ifsae.domain.recommend.service;

import com.easteregg.ifsae.domain.dog.dto.DogListDto;
import com.easteregg.ifsae.domain.dog.entity.Dog;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

        if (pageNum >= 20) {
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

    @Override
    public List<DogListDto> getRecommendDogList(User user, int pageNum) {
        int pageSize = 4;  // 페이지당 데이터 수 설정
        Pageable pageable = PageRequest.of(pageNum - 1, pageSize);  // 페이지 정보 생성

        // 페이지네이션을 적용하여 랭킹 데이터 가져오기
        Page<Ranking> rankingPage = rankingRepository.findRankingsByUserIdOrderByRankingAsc(user.getId(), pageable);

        // 기본 유저의 랭킹 목록을 가져오는 로직 (유저의 랭킹이 비어있는 경우)
        if (rankingPage.isEmpty()) {
            rankingPage = rankingRepository.findRankingsByUserIdOrderByRankingAsc(DEFAULT_RANK_USER_ID, pageable);
        }

        // Page에서 실제 데이터 리스트를 추출하여 변환
        return rankingPage.getContent().stream()
                          .map(Ranking::getDog)
                          .map(Dog::toDogListDto)
                          .toList();
    }
}
