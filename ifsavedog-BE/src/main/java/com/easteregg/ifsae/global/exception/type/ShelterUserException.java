package com.easteregg.ifsae.global.exception.type;

import com.easteregg.ifsae.global.exception.CustomException;
import com.easteregg.ifsae.global.exception.ErrorCode;

public class ShelterUserException extends CustomException {

    public ShelterUserException(ErrorCode errorCode) {
        super(errorCode);
    }
}
