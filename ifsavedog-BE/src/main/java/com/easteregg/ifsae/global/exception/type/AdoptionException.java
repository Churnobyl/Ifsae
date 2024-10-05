package com.easteregg.ifsae.global.exception.type;

import com.easteregg.ifsae.global.exception.CustomException;
import com.easteregg.ifsae.global.exception.ErrorCode;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
public class AdoptionException extends CustomException {
    public AdoptionException(ErrorCode errorCode) {
        super(errorCode);
    }
}