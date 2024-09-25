package com.easteregg.ifsae.global.s3;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.easteregg.ifsae.global.exception.ErrorCode;
import com.easteregg.ifsae.global.exception.type.InvalidFileFormatException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3ImageUploader {

    private static final Map<String, String> CONTENT_TYPE_MAP = new HashMap<>();

    static {
        CONTENT_TYPE_MAP.put(".jpg", "image/jpeg");
        CONTENT_TYPE_MAP.put(".jpeg", "image/jpeg");
        CONTENT_TYPE_MAP.put(".png", "image/png");
        CONTENT_TYPE_MAP.put(".gif", "image/gif");
        CONTENT_TYPE_MAP.put(".bmp", "image/bmp");
        CONTENT_TYPE_MAP.put(".webp", "image/webp");
        CONTENT_TYPE_MAP.put(".jfif", "image/jfif");
    }

    private final AmazonS3Client amazonS3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    @Value("${cloud.aws.region.static}")
    private String region;

    public String upload(MultipartFile file) throws IOException {
        String filename = UUID.randomUUID().toString().concat(file.getOriginalFilename());

        String contentType = getFileExtension(file.getOriginalFilename().toLowerCase());

        if (!CONTENT_TYPE_MAP.containsKey(contentType)) {
            throw new InvalidFileFormatException(ErrorCode.INVALID_FILE_FORMAT);
        }

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        metadata.setContentType(contentType);

        amazonS3Client.putObject(bucket, filename, file.getInputStream(), metadata);

        return amazonS3Client.getUrl(bucket, filename).toString();
    }

    public void delete(String bucket, String filename) {
        amazonS3Client.deleteObject(bucket, filename);
    }

    private String getFileExtension(String filename) {
        if (filename == null || !filename.contains(".")) {
            return "";
        }
        return filename.substring(filename.lastIndexOf('.'));
    }

}
