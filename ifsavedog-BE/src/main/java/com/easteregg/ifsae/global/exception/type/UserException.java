package com.easteregg.ifsae.global.exception.type;

import com.easteregg.ifsae.global.exception.CustomException;
import com.easteregg.ifsae.global.exception.ErrorCode;
import lombok.Getter;

@Getter
public class UserException extends CustomException {

    public UserException(ErrorCode errorCode) {
        super(errorCode);
    }
}
