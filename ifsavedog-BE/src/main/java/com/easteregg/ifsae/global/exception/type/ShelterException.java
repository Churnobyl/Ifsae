package com.easteregg.ifsae.global.exception.type;

import com.easteregg.ifsae.global.exception.CustomException;
import com.easteregg.ifsae.global.exception.ErrorCode;

public class ShelterException extends CustomException {

    public ShelterException(ErrorCode errorCode) {
        super(errorCode);
    }
}
