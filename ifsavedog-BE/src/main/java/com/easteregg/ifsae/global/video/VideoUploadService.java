package com.easteregg.ifsae.global.video;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface VideoUploadService {
    void compressAndUploadVideo(MultipartFile inputFile, SseEmitter emitter);
}
