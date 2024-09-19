package com.easteregg.ifsae.global.video;

import com.easteregg.ifsae.global.s3.S3VideoUploader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.File;

@Service
public class VideoUploadServiceImpl {

    @Autowired private VideoCompressor videoCompressor;
    @Autowired private S3VideoUploader s3VideoUploader;

    @Async("threadPoolTaskExecutor")
    public void compressAndUploadVideo(MultipartFile inputFile, SseEmitter emitter) throws Exception {
        try {
            // 비디오 압축 상태 전송
            File compressedFile = videoCompressor.compressVideo(inputFile, "comped_" + inputFile.getOriginalFilename(), emitter);

            // 압축 완료 후 업로드 상태 전송
            s3VideoUploader.uploadFile(compressedFile, emitter);

            emitter.complete();
        } catch (Exception e) {
            emitter.completeWithError(e);
        }
    }
}
