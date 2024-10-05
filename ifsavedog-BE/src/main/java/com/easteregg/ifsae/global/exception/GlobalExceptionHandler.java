package com.easteregg.ifsae.global.exception;

import com.easteregg.ifsae.global.exception.type.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomSecurityException.class)
    protected ResponseEntity<ErrorResponse> handleCustomSecurityException(CustomSecurityException e) {
        log.error("[CustomSecurityException] - {} : {}", e.getErrorCode(), e.getErrorCode().getMessage(), e);
        return ErrorResponse.toResponseEntity(e.getErrorCode());
    }

    @ExceptionHandler(UserException.class)
    protected ResponseEntity<ErrorResponse> handleUserException(UserException e) {
        log.error("[UserException] - {} : {}", e.getErrorCode(), e.getMessage(), e);
        return ErrorResponse.toResponseEntity(e.getErrorCode());
    }

    @ExceptionHandler(EmailAuthException.class)
    protected ResponseEntity<ErrorResponse> handleEmailAuthException(EmailAuthException e) {
        log.error("[EmailAuthException] - {} : {}", e.getErrorCode(), e.getErrorCode().getMessage(), e);
        return ErrorResponse.toResponseEntity(e.getErrorCode());
    }

    @ExceptionHandler(PostException.class)
    protected ResponseEntity<ErrorResponse> handlePostException(PostException e) {
        log.error("[PostException] - {} : {}", e.getErrorCode(), e.getErrorCode().getMessage(), e);
        return ErrorResponse.toResponseEntity(e.getErrorCode());
    }

    @ExceptionHandler(VideoUploadException.class)
    protected ResponseEntity<ErrorResponse> handleVideoUploadException(VideoUploadException e) {
        log.error("[VideoUploadException] - {} : {}", e.getErrorCode(), e.getErrorCode().getMessage(), e);
        return ErrorResponse.toResponseEntity(e.getErrorCode());
    }

    @ExceptionHandler(ShelterUserException.class)
    protected ResponseEntity<ErrorResponse> handleShelterUserException(ShelterUserException e) {
        log.error("[ShelterUserException] - {} : {}", e.getErrorCode(), e.getErrorCode().getMessage(), e);
        return ErrorResponse.toResponseEntity(e.getErrorCode());
    }

    @ExceptionHandler(DonationException.class)
    protected ResponseEntity<ErrorResponse> handleDonationException(DonationException e) {
        log.error("[ShelterUserException] - {} : {}", e.getErrorCode(), e.getErrorCode().getMessage(), e);
        return ErrorResponse.toResponseEntity(e.getErrorCode());
    }

    // 추가적인 예외 처리 예시 (예: NullPointerException)
    @ExceptionHandler(NullPointerException.class)
    protected ResponseEntity<ErrorResponse> handleNullPointerException(NullPointerException e) {
        log.error("[NullPointerException] : {}", e.getMessage(), e);
        return ErrorResponse.toResponseEntity("필수 값이 누락되었습니다.", HttpStatus.BAD_REQUEST);
    }

    // 기타 예상치 못한 모든 예외 처리
    @ExceptionHandler(Exception.class)
    protected ResponseEntity<ErrorResponse> handleGeneralException(Exception e) {
        log.error("[Unhandled Exception] - {}", e.getMessage(), e);
        return ErrorResponse.toResponseEntity(ErrorCode.UNEXPECTED_ERROR);
    }


}
