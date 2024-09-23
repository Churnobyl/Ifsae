package com.easteregg.ifsae.global.security;

import com.easteregg.ifsae.domain.user.service.UserService;
import com.easteregg.ifsae.global.exception.ErrorCode;
import com.easteregg.ifsae.global.exception.type.CustomSecurityException;
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
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    private final UserService userService;
    private final UserDetailsService userDetailsService;
    private final JwtTokenRedisRepository jwtTokenRepository;
    @Value("${jwt.secret.key}")
    private String secretKey;
    @Value("${jwt.access.expiration}")
    private long ACCESS_TOKEN_VALID_TIME;
    @Value("${jwt.refresh.expiration}")
    private long REFRESH_TOKEN_VALID_TIME;

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
                   .signWith(SignatureAlgorithm.HS512, this.secretKey)
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

    public String getRefreshTokenByAccessToken(String accessToken) {
        log.debug("[getRefreshTokenByAccessToken] accessToken으로 refreshToken 조회");
        JwtToken jwtToken = jwtTokenRepository.findByAccessToken(accessToken).orElse(null);

        return jwtToken != null ? jwtToken.getRefreshToken() : null;
    }

    public String reissueAccessToken(String refreshToken) {
        log.debug("[reissueAccessToken] refreshToken으로 accessToken 재발급");
        JwtToken jwtToken = jwtTokenRepository.findByRefreshToken(refreshToken)
                                              .orElseThrow(() -> new CustomSecurityException(ErrorCode.INVALID_TOKEN));

        String userEmail = getUserEmailFromToken(refreshToken);
        List<String> roles = userDetailsService.loadUserByUsername(userEmail).getAuthorities().stream()
                                               .map(GrantedAuthority::getAuthority).toList();
        String newAccessToken = this.createAccessToken(userEmail, roles);
        jwtToken.updateAccessToken(newAccessToken);
        JwtToken save = jwtTokenRepository.save(jwtToken);
        return save.getAccessToken();
    }
}
