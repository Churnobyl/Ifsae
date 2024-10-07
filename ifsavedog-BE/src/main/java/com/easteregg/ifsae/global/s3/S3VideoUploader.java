package com.easteregg.ifsae.global.s3;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.*;
import com.easteregg.ifsae.global.exception.ErrorCode;
import com.easteregg.ifsae.global.exception.type.VideoUploadException;
import com.easteregg.ifsae.global.video.entity.CompressedVideo;
import com.easteregg.ifsae.global.video.entity.CompressedVideoUrlSet;
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

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    @Value("${cloud.aws.region.static}")
    private String region;
    @Value("${video.directory.s3}")
    private String URL;
    @Value("${video.chunk-size}")
    private long PART_SIZE;
    @Value("${video.emitter.event-name}")
    private String emitterName;

    private final AmazonS3Client amazonS3Client;
    private final List<PartETag> partETags = new ArrayList<>();

    /**
     * @param cVideo 업로드할 파일
     */
    public CompressedVideoUrlSet uploadFile(CompressedVideo cVideo) {
        CompressedVideoUrlSet urlSet = new CompressedVideoUrlSet();

        long contentLength = cVideo.getCompressedVideo().length();

        ///////// 파일 익명화 ///////////////
        LocalDateTime now = LocalDateTime.now();
        String formattedDate = now.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String formattedTime = now.format(DateTimeFormatter.ofPattern("HHmmss"));

        // UUID 생성
        String uuid = UUID.randomUUID().toString();

        // 파일 확장자 추출
        String originalFileName = cVideo.getCompressedVideo().getName();
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
                        .withFile(cVideo.getCompressedVideo())
                        .withPartSize(currentPartSize);

                UploadPartResult result = amazonS3Client.uploadPart(uploadPartRequest);
                partETags.add(result.getPartETag());

                uploadedBytes += currentPartSize;
            }

            // 업로드 완료
            try {
                amazonS3Client.completeMultipartUpload(new CompleteMultipartUploadRequest(bucket, fileName, uploadId, partETags));

            } catch (SdkClientException e) {
                e.toString();
            }

            urlSet.setVideoUrl(fileName); // 동영상 주소 저장

            // 썸네일 업로드 (새로운 파일 경로 설정)
            String thumbnailExtension = ".jpg";
            String thumbnailFileName =
                    "thumbnail/"
                            + formattedDate
                            + "/"
                            + formattedTime
                            + "/"
                            + uuid
                            + thumbnailExtension;
            uploadThumbnailToS3(cVideo.getThumbnailPath(), thumbnailFileName);

            urlSet.setThumbnailUrl(thumbnailFileName); // 썸네일 주소 저장

            return urlSet;
        } catch (Exception e) {
            amazonS3Client.abortMultipartUpload(new AbortMultipartUploadRequest(bucket, fileName, uploadId));
            throw new VideoUploadException(ErrorCode.UNEXPECTED_ERROR);
        } finally {
            // 임시 파일 삭제
            if (cVideo.getCompressedVideo().exists()) {
                boolean deleted = cVideo.getCompressedVideo().delete();
                if (!deleted) {
                    log.info("[video] 임시 파일 삭제 실패 : {}", cVideo.getCompressedVideo().getAbsolutePath());
                }
            }
        }
    }

    private void uploadThumbnailToS3(String thumbnailPath, String thumbnailFileName) {
        File thumbnailFile = new File(thumbnailPath);
        if (thumbnailFile.exists()) {
            try {
                PutObjectRequest putObjectRequest = new PutObjectRequest(bucket, thumbnailFileName, thumbnailFile);
                amazonS3Client.putObject(putObjectRequest);
            } catch (Exception e) {
                log.error("[thumbnail] 썸네일 업로드 중 에러 발생 - {}", e.toString());
                throw new VideoUploadException(ErrorCode.UNEXPECTED_ERROR);
            } finally {
                // 임시 썸네일 파일 삭제
                boolean deleted = thumbnailFile.delete();
                if (!deleted) {
                    log.info("[thumbnail] 임시 썸네일 파일 삭제 실패 : {}", thumbnailFile.getAbsolutePath());
                }
            }
        } else {
            log.error("[thumbnail] 썸네일 파일이 존재하지 않습니다: {}", thumbnailPath);
            throw new VideoUploadException(ErrorCode.FILE_NOT_FOUND);
        }
    }
}
