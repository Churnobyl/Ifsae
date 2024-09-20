package com.easteregg.ifsae.global.exception.type;

import com.easteregg.ifsae.global.exception.CustomException;
import com.easteregg.ifsae.global.exception.ErrorCode;

public class VideoUploadException extends CustomException {

    public VideoUploadException(ErrorCode errorCode) {
        super(errorCode);
    }
}
