package com.easteregg.ifsae.domain.recommend.entity;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@Builder
@RedisHash(value = "LastPage")
public class LastPage {

    @Id
    private Long userId;

    private int lastPage;

    public void updateLastPage() {
        lastPage++;
    }

    public void initLastPage() {
        lastPage = 1;
    }
}
