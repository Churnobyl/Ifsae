package com.easteregg.ifsae.global.exception.type;

import com.easteregg.ifsae.global.exception.CustomException;
import com.easteregg.ifsae.global.exception.ErrorCode;

public class PostException extends CustomException {

    public PostException(ErrorCode errorCode) {
        super(errorCode);
    }
}
