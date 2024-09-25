package com.easteregg.ifsae.global.video;

import com.easteregg.ifsae.global.exception.ErrorCode;
import com.easteregg.ifsae.global.exception.type.VideoUploadException;
import com.easteregg.ifsae.global.s3.S3VideoUploader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.File;
import java.util.concurrent.CompletableFuture;

/**
 * 비디오를 압축하고 업로드하는 서비스
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class VideoUploadServiceImpl implements VideoUploadService {

    private final VideoCompressor videoCompressor;
    private final S3VideoUploader s3VideoUploader;

    public String compressAndUploadVideo(MultipartFile inputFile) {
        try {
            // 비디오 압축
            File compressedFile = videoCompressor.compressVideo(inputFile, inputFile.getOriginalFilename());
            
            // 비디오 업로드
            return s3VideoUploader.uploadFile(compressedFile);
        } catch (Exception e) {
            log.error("[video] 업로드 과정 중 에러 발생 - {}", e);
            throw new VideoUploadException(ErrorCode.UNEXPECTED_ERROR);
        }
    }
}
