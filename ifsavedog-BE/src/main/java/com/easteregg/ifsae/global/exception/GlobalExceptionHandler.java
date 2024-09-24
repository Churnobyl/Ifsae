package com.easteregg.ifsae.global.exception;

import com.easteregg.ifsae.global.exception.type.UserException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserException.class)
    protected ResponseEntity<ErrorResponse> handleUserException(UserException e) {
        log.error("[UserException] - {} : {}", e.getErrorCode(), e.getMessage(), e);
        return ErrorResponse.toResponseEntity(e.getErrorCode());
    }

    // 기타 예상치 못한 모든 예외 처리
    @ExceptionHandler(Exception.class)
    protected ResponseEntity<ErrorResponse> handleGeneralException(Exception e) {
        log.error("[Unhandled Exception] - {}", e.getMessage(), e);
        return ErrorResponse.toResponseEntity(ErrorCode.UNEXPECTED_ERROR);
    }

    // 추가적인 예외 처리 예시 (예: NullPointerException)
    @ExceptionHandler(NullPointerException.class)
    protected ResponseEntity<ErrorResponse> handleNullPointerException(NullPointerException e) {
        log.error("[NullPointerException] : {}", e.getMessage(), e);
        return ErrorResponse.toResponseEntity("필수 값이 누락되었습니다.", HttpStatus.BAD_REQUEST);
    }
}
