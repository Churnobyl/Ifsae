package com.easteregg.ifsae.global.s3;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.*;
import com.easteregg.ifsae.global.exception.ErrorCode;
import com.easteregg.ifsae.global.exception.type.VideoUploadException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.File;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * S3로 비디오를 업로드하는 서비스
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class S3VideoUploader {

    @Value("${cloud.aws.s3.bucket}") private String bucket;
    @Value("${cloud.aws.region.static}") private String region;
    @Value("${video.directory.s3}") private String URL;
    @Value("${video.chunk-size}") private long PART_SIZE;
    @Value("${video.emitter.event-name}") private String emitterName;

    private final AmazonS3Client amazonS3Client;
    private List<PartETag> partETags = new ArrayList<>();

    /**
     *
     * @param file 업로드할 파일
     * @param emitter 프론트단에 진행상황 전달
     */
    public String uploadFile(File file) {
        long contentLength = file.length();

        ///////// 파일 익명화 ///////////////
        LocalDateTime now = LocalDateTime.now();
        String formattedDate = now.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String formattedTime = now.format(DateTimeFormatter.ofPattern("HHmmss"));

        // UUID 생성
        String uuid = UUID.randomUUID().toString();

        // 파일 확장자 추출
        String originalFileName = file.getName();
        String extension = "";
        int extensionIndex = originalFileName.lastIndexOf(".");
        if (extensionIndex > 0) {
            extension = originalFileName.substring(extensionIndex); // 확장자 포함
        }

        // 파일 이름에 날짜, 시간, UUID 적용
        String fileName = URL + formattedDate + "/" + formattedTime + "/" + uuid + extension;
        String uploadId = amazonS3Client.initiateMultipartUpload(new InitiateMultipartUploadRequest(bucket, fileName)).getUploadId();

        try {
            long uploadedBytes = 0; // 업로드된 Byte
            int partNumber = 1; // 업로드 Chunk 넘버

            // 업로드된 Byte < 전체 Byte
            while (uploadedBytes < contentLength) {
                long remainingBytes = contentLength - uploadedBytes;
                long currentPartSize = Math.min(PART_SIZE, remainingBytes);

                // 각 파트를 업로드
                UploadPartRequest uploadPartRequest = new UploadPartRequest()
                        .withBucketName(bucket)
                        .withKey(fileName)
                        .withUploadId(uploadId)
                        .withPartNumber(partNumber++)
                        .withFile(file)
                        .withPartSize(currentPartSize);

                UploadPartResult result = amazonS3Client.uploadPart(uploadPartRequest);
                partETags.add(result.getPartETag());

                uploadedBytes += currentPartSize;
            }

            // 업로드 완료
            amazonS3Client.completeMultipartUpload(new CompleteMultipartUploadRequest(bucket, fileName, uploadId, partETags));
            return fileName;
        } catch (Exception e) {
            amazonS3Client.abortMultipartUpload(new AbortMultipartUploadRequest(bucket, fileName, uploadId));
            throw new VideoUploadException(ErrorCode.UNEXPECTED_ERROR);
        } finally {
            // 임시 파일 삭제
            if (file.exists()) {
                boolean deleted = file.delete();
                if (!deleted) {
                    log.info("[video] 임시 파일 삭제 실패 : {}", file.getAbsolutePath());
                }
            }
        }
    }
}
