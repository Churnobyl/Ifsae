package com.easteregg.ifsae.global.security;

import com.easteregg.ifsae.global.exception.ErrorCode;
import com.easteregg.ifsae.global.exception.type.CustomSecurityException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        log.debug("[doFilterInternal] : token 만료 확인");
        String token = jwtTokenProvider.resolveToken(request);

        // 정상일 때
        if (token != null && jwtTokenProvider.validateTokenExpiration(token)) {
            log.info("[doFilterInternal] : accessToken이 유효합니다.");
            // 1. SecurityContextHolder에 인증정보 저장
            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            response.setHeader("Authorization", "Bearer " + token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } else if (token != null && !jwtTokenProvider.validateTokenExpiration(token)) {
            log.info("[doFilterInternal] : accessToken이 만료되었습니다.");
            // 1. redis에서 해당 accessToken값으로 저장된 refreshToken 가져오기
            String refreshToken = jwtTokenProvider.getRefreshTokenByAccessToken(token);

            // 2. refresh token이 존재하면
            if (refreshToken != null) {
                // 3. refresh token이 유효한지 확인
                if (jwtTokenProvider.validateTokenExpiration(refreshToken)) {
                    log.info("[doFilterInternal] : refreshToken이 유효합니다.");
                    // 4. refresh token으로 accessToken 재발급
                    String newAccessToken = jwtTokenProvider.reissueAccessToken(refreshToken);
                    // 5. response header에 accessToken 저장
                    response.setHeader("Authorization", "Bearer " + newAccessToken);
                    // 6. SecurityContextHolder에 인증정보 저장
                    Authentication authentication = jwtTokenProvider.getAuthentication(newAccessToken);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } else {
                    log.info("[doFilterInternal] : refreshToken이 만료되었습니다.");
                    throw new CustomSecurityException(ErrorCode.EXPIRED_TOKEN);
                }
            } else {
                log.info("[doFilterInternal] : refreshToken이 만료되었습니다.");
                throw new CustomSecurityException(ErrorCode.EXPIRED_TOKEN);
            }
        }
        filterChain.doFilter(request, response);
    }

}
