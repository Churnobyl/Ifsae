package com.easteregg.ifsae.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    // 예기치못한 에러 발생 시 반환 에러
    UNEXPECTED_ERROR("예기치 못한 오류 발생", HttpStatus.INTERNAL_SERVER_ERROR),

    // 인증 관련 에러
    UNAUTHORIZED("인증되지 않은 사용자입니다.", HttpStatus.UNAUTHORIZED),
    EXPIRED_TOKEN(" 토큰이 만료되었습니다.", HttpStatus.UNAUTHORIZED),
    INVALID_TOKEN("유효하지 않은 토큰입니다.", HttpStatus.UNAUTHORIZED),
    INVALID_PASSWORD("비밀번호가 옳지 않습니다.", HttpStatus.UNAUTHORIZED),
    FORBIDDEN("사용자의 권한이 없습니다.", HttpStatus.FORBIDDEN),

    // 사용자 관련 에러
    USER_NOT_FOUND("사용자를 찾을 수 없습니다.", HttpStatus.NOT_FOUND),
    DUPLICATE_EMAIL("중복된 이메일 입니다.", HttpStatus.CONFLICT),
    DUPLICATE_NICKNAME("중복된 닉네임 입니다.", HttpStatus.CONFLICT),
    INVALID_EMAIL("잘못된 이메일 입니다.", HttpStatus.BAD_REQUEST),

    // 이메일 인증 관련 에러
    INVALID_EMAIL_AUTH_CODE("잘못된 인증 코드입니다.", HttpStatus.BAD_REQUEST),

    INVALID_HOUSING_TYPE("잘못된 주거형태 값 입니다.", HttpStatus.BAD_REQUEST);
    // 센터 관련 에러
    SHELTER_NOT_FOUND("센터를 찾을 수 없습니다.", HttpStatus.NOT_FOUND),

    // 포스트 관련 에러
    POST_NOT_FOUND("게시글을 찾을 수 없습니다.", HttpStatus.NOT_FOUND),

    // 파일 업로드 관련 에러
    INVALID_FILE_FORMAT("잘못된 파일 형식입니다.", HttpStatus.BAD_REQUEST);

    private final String message;
    private final HttpStatus httpStatus;

}
