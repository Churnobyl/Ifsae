package com.easteregg.ifsae.global.video;

import com.amazonaws.services.s3.AmazonS3Client;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.FileInputStream;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class VideoUploadServiceImplTest {

    @Autowired VideoUploadService videoUploadService;

    @Autowired
    private AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Test
    @DisplayName("비디오가 업로드 됨")
    void videoUpload() throws Exception {
        // 테스트 파일 세팅
        FileInputStream inputFile = new FileInputStream("src/test/resources/test_video.mp4");

        // Mocking MultipartFile 생성
        MockMultipartFile mockMultipartFile = new MockMultipartFile(
                "file", // 파라미터 이름
                "test_video.mp4", // 파일 이름
                "video/mp4", // MIME 타입
                inputFile // 파일 내용 (InputStream)
        );

        SseEmitter emitter = new SseEmitter();

        // S3 업로드 테스트
        videoUploadService.compressAndUploadVideo(mockMultipartFile, emitter);

        boolean isUploaded = amazonS3Client.doesObjectExist(bucket, "video/test_video.mp4");

        assertTrue(isUploaded, "S3에 파일이 업로드되지 않았습니다.");
    }
}