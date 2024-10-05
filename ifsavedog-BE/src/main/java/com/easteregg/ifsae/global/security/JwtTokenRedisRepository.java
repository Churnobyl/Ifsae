package com.easteregg.ifsae.global.security;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JwtTokenRedisRepository extends CrudRepository<JwtToken, Long> {
    Optional<JwtToken> findByAccessToken(String accessToken);
    Optional<JwtToken> findByRefreshToken(String refreshToken);
}
