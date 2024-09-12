package com.easteregg.ifsae.global.exception;

import lombok.Builder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Builder
public class ErrorResponse {

    private ErrorCode errorCode;
    private String errorMessage;

    public static ResponseEntity<ErrorResponse> toResponseEntity(ErrorCode e) {
        return ResponseEntity.status(e.getHttpStatus())
                             .body(ErrorResponse.builder()
                                                .errorCode(e)
                                                .errorMessage(e.getMessage())
                                                .build());
    }

    // 메시지를 직접 제공하여 ErrorResponse를 생성하는 메서드
    // ! 에러 코드 없는 형태
    public static ResponseEntity<ErrorResponse> toResponseEntity(String errorMessage, HttpStatus httpStatus) {
        return ResponseEntity.status(httpStatus)
                             .body(ErrorResponse.builder()
                                                .errorMessage(errorMessage)
                                                .build());
    }

}
