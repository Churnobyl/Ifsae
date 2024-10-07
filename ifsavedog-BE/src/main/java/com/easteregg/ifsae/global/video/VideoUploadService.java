package com.easteregg.ifsae.global.video;

import com.easteregg.ifsae.global.video.entity.CompressedVideoUrlSet;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface VideoUploadService {
    CompressedVideoUrlSet compressAndUploadVideo(MultipartFile inputFile);
}
