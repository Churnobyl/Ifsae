package com.easteregg.ifsae.global.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {
    @Value("${jwt.secret.key}")
    private String secretKey;

    @Value("${jwt.access.expiration}")
    private long ACCESS_TOKEN_VALID_TIME;

    @Value("${jwt.refresh.expiration}")
    private long REFRESH_TOKEN_VALID_TIME;

    private final UserDetailsService userDetailsService;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String createAccessToken(String email, List<String> roles) {
        log.debug("[createAccessToken]");
        return this.createToken(email, roles, ACCESS_TOKEN_VALID_TIME);
    }

    public String createRefreshToken(String email, List<String> roles) {
        log.debug("[createRefreshToken]");
        return this.createToken(email, roles, REFRESH_TOKEN_VALID_TIME);
    }

    private String createToken(String email, List<String> roles, long tokenValidTime) {
        log.info("[createToken]");
        Claims claims = Jwts.claims().setSubject(email);
        claims.put("roles", roles);

        Date now = new Date();

        return Jwts.builder()
                   .setClaims(claims)
                   .setIssuedAt(now)
                   .setExpiration(new Date(System.currentTimeMillis() + tokenValidTime))
                   .signWith(SignatureAlgorithm.HS256, this.secretKey)
                   .compact();
    }

    public Authentication getAuthentication(String token) {
        log.debug("[getAuthentication] 토큰 인증 정보 조회");
        UserDetails userDetails = userDetailsService.loadUserByUsername(getUserEmailFromToken(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    public String getUserEmailFromToken(String token) {
        log.debug("[getMemberEmail] token 에서 이메일 정보 추출");
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateTokenExpiration(String token) {
        log.debug("[validateTokenExpiration] 토큰 유효 기간 확인");
        Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
        return !claims.getBody().getExpiration().before(new Date());
    }

    public String resolveToken(HttpServletRequest request) {
        log.debug("[resolveToken] HTTP 헤더에서 Token 값 추출");
        String bearerToken = request.getHeader("Authorization");

        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    // TODO: accessToken으로 refeshToken 가져오기
    public String getRefreshToken(String accessToken) {
        return null;
    }

    // TODO: refreshToken으로 accessToken 재발급
    public String reissueAccessToken(String refreshToken) {
        return null;
    }
}
