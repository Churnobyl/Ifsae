package com.easteregg.ifsae.global.exception.type;

import com.easteregg.ifsae.global.exception.CustomException;
import com.easteregg.ifsae.global.exception.ErrorCode;

public class CommentException extends CustomException {

    public CommentException(ErrorCode errorCode) {
        super(errorCode);
    }
}
