package com.easteregg.ifsae.global.exception.type;

import com.easteregg.ifsae.global.exception.CustomException;
import com.easteregg.ifsae.global.exception.ErrorCode;

public class InvalidFileFormatException extends CustomException {

    public InvalidFileFormatException(ErrorCode errorCode) {
        super(errorCode);
    }
}
