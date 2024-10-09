package com.easteregg.ifsae.domain.recommend.service;

import com.easteregg.ifsae.domain.post.dto.PostDto;
import java.util.List;

public interface RankingService {

	List<Long> findDogIdListByUserId(Long userId, int pageNum);

	List<PostDto.Response> findPostDogListByDogIds(List<Long> dogIds);
}
