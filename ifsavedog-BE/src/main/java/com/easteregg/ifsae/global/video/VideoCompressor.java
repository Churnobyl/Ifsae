package com.easteregg.ifsae.global.video;

import com.easteregg.ifsae.global.exception.ErrorCode;
import com.easteregg.ifsae.global.exception.type.VideoUploadException;
import com.easteregg.ifsae.global.video.entity.CompressedVideo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 비디오 압축 서비스
 */
@Slf4j
@Service
public class VideoCompressor {

    // ffmpeg variable
    @Value("${video.ffmpeg.video-codec}") private String videoCodec;
    @Value("${video.ffmpeg.audio-codec}") private String audioCodec;
    @Value("${video.ffmpeg.crf}") private String crf;
    @Value("${video.ffmpeg.audio-bitrate}") private String audioBitrate;
    @Value("${video.ffmpeg.scale}") private String scale;

    @Value("${video.emitter.event-name}") private String emitterName;


    /**
     * 비디오 압축 메서드
     * @param multipartFile 압축할 파일
     * @param outputFilePath 아웃풋 파일 경로
     * @param emitter 프론트단에 진행상황 전달
     * @return 압축된 파일 경로
     */
    public CompressedVideo compressVideo(MultipartFile multipartFile, String outputFilePath, String thumbnailPath) throws IOException, InterruptedException {
        final Pattern DURATION_PATTERN = Pattern.compile("Duration: (\\d{2}):(\\d{2}):(\\d{2}\\.\\d{2})");
        final Pattern TIME_PATTERN = Pattern.compile("time=(\\d{2}):(\\d{2}):(\\d{2}\\.\\d{2})");

        File inputFile = convertMultipartFileToFile(multipartFile);

        extractThumbnail(inputFile, thumbnailPath);

        double totalDuration = compressVideoFile(inputFile, outputFilePath, DURATION_PATTERN, TIME_PATTERN);

        CompressedVideo compressedVideo = new CompressedVideo();
        compressedVideo.setCompressedVideo(new File(outputFilePath));
        compressedVideo.setThumbnailPath(thumbnailPath);
        return compressedVideo;
    }

    private void extractThumbnail(File inputFile, String thumbnailPath) throws IOException, InterruptedException {
        ProcessBuilder processBuilder = new ProcessBuilder(
                "ffmpeg", "-ss", "0",
                "-i", inputFile.getAbsolutePath(),
                "-frames:v", "1",
                thumbnailPath
        );
        Process process = processBuilder.start();

        try (BufferedReader stdError = new BufferedReader(new InputStreamReader(process.getErrorStream()))) {
            String line;
            while ((line = stdError.readLine()) != null) {
            }
        }

        int exitCode = process.waitFor();
        if (exitCode != 0) {
            log.error("[video] 썸네일 추출 실패. 에러코드 - {}", exitCode);
            throw new VideoUploadException(ErrorCode.UNEXPECTED_ERROR);
        }
    }

    private double compressVideoFile(File inputFile, String outputFilePath, Pattern DURATION_PATTERN, Pattern TIME_PATTERN) throws IOException, InterruptedException {
        Process process = getCompressionProcess(inputFile, outputFilePath);
        BufferedReader stdError = new BufferedReader(new InputStreamReader(process.getErrorStream()));

        String line;
        double totalDuration = 0;
        double currentProgress = 0;

        while ((line = stdError.readLine()) != null) {
            Matcher durationMatcher = DURATION_PATTERN.matcher(line);
            if (durationMatcher.find()) {
                totalDuration = parseTimeToSeconds(durationMatcher);
                break;
            }
        }

        while ((line = stdError.readLine()) != null) {
            Matcher timeMatcher = TIME_PATTERN.matcher(line);
            if (timeMatcher.find()) {
                double currentTime = parseTimeToSeconds(timeMatcher);
                currentProgress = (currentTime / totalDuration) * 100;
                log.info("[비디오 압축] {}%", currentProgress);
            }
        }

        int exitCode = process.waitFor();
        if (exitCode != 0) {
            log.error("[video] 압축 실패. 에러코드 - {}", exitCode);
            throw new VideoUploadException(ErrorCode.UNEXPECTED_ERROR);
        }

        return totalDuration;
    }

    private Process getCompressionProcess(File inputFile, String outputFilePath) throws IOException {
        ProcessBuilder processBuilder = new ProcessBuilder(
                "ffmpeg", "-i", inputFile.getAbsolutePath(),
                "-vcodec", videoCodec, // Video codec
                "-acodec", audioCodec,  // Audio codec
                "-b:a", audioBitrate,   // Audio bitrate
                "-vf", "scale=" + scale, // Scale
                "-crf", crf,            // Constant Rate Factor
                outputFilePath          // Output video file path
        );

        return processBuilder.start();
    }

    /**
     * Video 시간을 초로 변환하는 메서드
     * @param matcher - Time 매처
     * @return 초
     */
    private double parseTimeToSeconds(Matcher matcher) {
        int hours = Integer.parseInt(matcher.group(1));
        int minutes = Integer.parseInt(matcher.group(2));
        double seconds = Double.parseDouble(matcher.group(3));

        return hours * 3600 + minutes * 60 + seconds;
    }

    /**
     * Web으로 전달받은 MultipartFile을 File객체로 변환
     * @param file - MultipartFile
     * @return File 객체
     */
    private File convertMultipartFileToFile(MultipartFile file) {
        File convFile = new File(System.getProperty("java.io.tmpdir") + "/" + file.getOriginalFilename());
        try {
            file.transferTo(convFile); // MultipartFile을 로컬 파일로 저장
        } catch (IOException e) {
            log.error("[video] MultipartFile을 File객체로 변환하는데 에러 발생");
            throw new VideoUploadException(ErrorCode.UNEXPECTED_ERROR);
        }

        return convFile;
    }
}
