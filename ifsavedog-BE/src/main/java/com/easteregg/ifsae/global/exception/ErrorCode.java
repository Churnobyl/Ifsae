package com.easteregg.ifsae.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    // 예기치못한 에러 발생 시 반환 에러
    UNEXPECTED_ERROR("예기치 못한 오류 발생", HttpStatus.INTERNAL_SERVER_ERROR),

    // 입양 관련 에러
    ADOPTION_NOT_FOUND("입양 신청 내역이 없습니다.", HttpStatus.NOT_FOUND),
    ADOPTION_NOT_WAITING("입양 대기 상태가 아닙니다.", HttpStatus.NOT_FOUND),

    // 댓글 관련 에러
    UNAUTHORIZED_USER("댓글을 수정할 수 없는 사용자입니다.", HttpStatus.UNAUTHORIZED),
    COMMENT_NOT_FOUND("댓글을 찾을 수 없습니다.", HttpStatus.NO_CONTENT),

    // 인증 관련 에러
    UNAUTHORIZED("인증되지 않은 사용자입니다.", HttpStatus.UNAUTHORIZED),
    EXPIRED_TOKEN(" 토큰이 만료되었습니다.", HttpStatus.UNAUTHORIZED),
    INVALID_TOKEN("유효하지 않은 토큰입니다.", HttpStatus.UNAUTHORIZED),
    INVALID_PASSWORD("비밀번호가 옳지 않습니다.", HttpStatus.UNAUTHORIZED),
    FORBIDDEN("사용자의 권한이 없습니다.", HttpStatus.FORBIDDEN),

    // 개 관련 에러
    SPECIES_NOT_FOUND("품종을 찾을 수 없습니다.", HttpStatus.NOT_FOUND),
    DOG_NOT_FOUND("개를 찾을 수 없습니다.", HttpStatus.NOT_FOUND),

    // 기부 관련 에러
    DONATION_NOT_ALLOWED("기부할 수 없는 대상입니다.", HttpStatus.BAD_REQUEST),
    DONATION_NOT_FOUND("기부 내역이 없습니다.", HttpStatus.NOT_FOUND),

    // 이메일 인증 관련 에러
    INVALID_EMAIL_AUTH_CODE("잘못된 인증 코드입니다.", HttpStatus.BAD_REQUEST),

    // 파일 업로드 관련 에러
    INVALID_FILE_FORMAT("잘못된 파일 형식입니다.", HttpStatus.BAD_REQUEST),
    FAILED_TO_UPLOAD_PROFILE_IMG("업로드 실패", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_PAGE_REQUEST("잘못된 페이지 요청입니다.", HttpStatus.NOT_FOUND),
    FILE_NOT_FOUND("썸네일 파일이 존재하지 않습니다.", HttpStatus.NOT_FOUND),

    // 포스트 관련 에러
    POST_NOT_FOUND("게시글을 찾을 수 없습니다.", HttpStatus.NOT_FOUND),

    // 센터 관련 에러
    SHELTER_NOT_FOUND("센터를 찾을 수 없습니다.", HttpStatus.NOT_FOUND),

    // 센터 - 유저 관련 에러
    USER_NOT_FOUND_IN_SHELTER("해당 쉘터에 권한이 없습니다.", HttpStatus.UNAUTHORIZED),

    // 센터 - 개 관련 에러
    DOG_NOT_FOUND_IN_SHELTER("강아지가 소속된 쉘터를 찾을 수 없습니다.", HttpStatus.UNAUTHORIZED),

    // 사용자 관련 에러
    USER_NOT_FOUND("사용자를 찾을 수 없습니다.", HttpStatus.NOT_FOUND),
    DUPLICATE_EMAIL("중복된 이메일 입니다.", HttpStatus.CONFLICT),
    DUPLICATE_NICKNAME("중복된 닉네임 입니다.", HttpStatus.CONFLICT),
    INVALID_EMAIL("잘못된 이메일 입니다.", HttpStatus.BAD_REQUEST),
    INVALID_HOUSING_TYPE("잘못된 주거형태 값 입니다.", HttpStatus.BAD_REQUEST),
    ;

    private final String message;
    private final HttpStatus httpStatus;
}