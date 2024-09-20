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
import java.util.ArrayList;
import java.util.List;

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
    public void uploadFile(File file, SseEmitter emitter) {
        long contentLength = file.length();
        String fileName = URL + file.getName();

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

                // 진행 상태 계산 (50%에서 100% 사이로)
                int progress = 50 + (int) ((uploadedBytes * 50) / contentLength);
                emitter.send(SseEmitter.event().name(emitterName).data(progress));
            }

            // 업로드 완료
            amazonS3Client.completeMultipartUpload(new CompleteMultipartUploadRequest(bucket, fileName, uploadId, partETags));
            emitter.send(SseEmitter.event().name(emitterName).data(100)); // 100% 완료

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
