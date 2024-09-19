package com.easteregg.ifsae.global.video;

import com.easteregg.ifsae.global.s3.S3VideoUploader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.File;
import java.util.concurrent.CompletableFuture;

@Service
public class VideoUploadServiceImpl implements VideoUploadService {

    private final VideoCompressor videoCompressor;
    private final S3VideoUploader s3VideoUploader;

    public VideoUploadServiceImpl(VideoCompressor videoCompressor, S3VideoUploader s3VideoUploader) {
        this.videoCompressor = videoCompressor;
        this.s3VideoUploader = s3VideoUploader;
    }

    public void compressAndUploadVideo(MultipartFile inputFile, SseEmitter emitter) {
        try {
            // 비디오 압축
            File compressedFile = videoCompressor.compressVideo(inputFile, inputFile.getOriginalFilename(), emitter);
            
            // 비디오 업로드
            s3VideoUploader.uploadFile(compressedFile, emitter);

            emitter.complete();
        } catch (Exception e) {
            emitter.completeWithError(e);
        }
    }
}
