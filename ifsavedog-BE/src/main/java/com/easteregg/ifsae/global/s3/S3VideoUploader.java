package com.easteregg.ifsae.global.s3;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
public class S3VideoUploader {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.region.static}")
    private String region;

    private List<PartETag> partETags = new ArrayList<>();

    public void uploadFile(File file, SseEmitter emitter) throws IOException, ExecutionException, InterruptedException {
        long contentLength = file.length();
        long partSize = 5 * 1024 * 1024; // 5MB

        String url = "video/";
        String fileName = url + file.getName();

        String uploadId = amazonS3Client.initiateMultipartUpload(new InitiateMultipartUploadRequest(bucket, fileName)).getUploadId();

        try {
            long uploadedBytes = 0;
            int partNumber = 1;
            while (uploadedBytes < contentLength) {
                long remainingBytes = contentLength - uploadedBytes;
                long currentPartSize = Math.min(partSize, remainingBytes);

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
                emitter.send(SseEmitter.event().name("progress").data(progress));
            }

            // 업로드 완료
            amazonS3Client.completeMultipartUpload(new CompleteMultipartUploadRequest(bucket, fileName, uploadId, partETags));
            emitter.send(SseEmitter.event().name("progress").data(100)); // 100% 완료

        } catch (Exception e) {
            amazonS3Client.abortMultipartUpload(new AbortMultipartUploadRequest(bucket, fileName, uploadId));
            throw new RuntimeException("Multipart upload failed: " + e.getMessage());
        } finally {
            // 로컬 파일 삭제
            if (file.exists()) {
                boolean deleted = file.delete();
                if (!deleted) {
                    System.err.println("Failed to delete temporary file: " + file.getAbsolutePath());
                } else {
                    System.out.println("Temporary file deleted successfully: " + file.getAbsolutePath());
                }
            }
        }
    }
}
