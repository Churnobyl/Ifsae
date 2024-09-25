package com.easteregg.ifsae.global.security;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@Getter
@Builder
@RedisHash(value = "JwtToken", timeToLive = 60 * 60 * 24 * 30)
public class JwtToken {

    @Id
    private String accessToken;

    @Indexed
    private String refreshToken;

    public void updateAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}
