package com.easteregg.ifsae.domain.recommend.service;

import com.easteregg.ifsae.domain.dog.dto.DogListDto;
import com.easteregg.ifsae.domain.post.dto.PostDto;
import com.easteregg.ifsae.domain.user.entity.User;
import java.util.List;

public interface RankingService {

	List<Long> findDogIdListByUserId(Long userId, int pageNum);

	List<PostDto.Response> findPostDogListByDogIds(List<Long> dogIds);

    int getUserLastPage(User user);

	List<DogListDto> getRecommendDogList(User user, int pageNum);
}
