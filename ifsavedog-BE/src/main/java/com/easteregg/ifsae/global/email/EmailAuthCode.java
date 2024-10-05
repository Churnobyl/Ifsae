package com.easteregg.ifsae.global.email;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@Builder
@RedisHash(value = "EmailAuthCode", timeToLive = 60 * 5)
public class EmailAuthCode {

    @Id
    private String email;

    private String code;

}
