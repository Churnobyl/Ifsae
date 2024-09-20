package com.easteregg.ifsae.global.video;

import com.easteregg.ifsae.global.exception.ErrorCode;
import com.easteregg.ifsae.global.exception.type.VideoUploadException;
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
    public File compressVideo(MultipartFile multipartFile, String outputFilePath, SseEmitter emitter) throws IOException, InterruptedException {
        final Pattern DURATION_PATTERN = Pattern.compile("Duration: (\\d{2}):(\\d{2}):(\\d{2}\\.\\d{2})");
        final Pattern TIME_PATTERN = Pattern.compile("time=(\\d{2}):(\\d{2}):(\\d{2}\\.\\d{2})");

        File inputFile = convertMultipartFileToFile(multipartFile);

        ProcessBuilder processBuilder = new ProcessBuilder(
                "ffmpeg", "-i", inputFile.getAbsolutePath(),
                "-vcodec", videoCodec, // 비디오 코덱
                "-acodec", audioCodec,  // 오디오 코덱
                "-b:a", audioBitrate,  // 오디오 비트레이트
                "-vf", "scale=" + scale, // 해상도 조정
                "-crf", crf, // Constant Rate Factor 사용 (변경 가능 default: 23)
                outputFilePath // 출력 파일 경로
        );

        Process process = processBuilder.start();

        BufferedReader stdError = new BufferedReader(new InputStreamReader(process.getErrorStream()));

        String line;
        double totalDuration = 0;
        double currentProgress = 0;

        // Duration 추출
        while ((line = stdError.readLine()) != null) {
            Matcher durationMatcher = DURATION_PATTERN.matcher(line);
            if (durationMatcher.find()) {
                totalDuration = parseTimeToSeconds(durationMatcher);
                break;
            }
        }

        // 압축 진행 상황 추적
        while ((line = stdError.readLine()) != null) {
            Matcher timeMatcher = TIME_PATTERN.matcher(line);
            if (timeMatcher.find()) {
                double currentTime = parseTimeToSeconds(timeMatcher);
                currentProgress = (currentTime / totalDuration) * 100;

                // 진행 상태 SSE로 전송
                try {
                    emitter.send(SseEmitter.event().name(emitterName).data((int) currentProgress));
                } catch (IOException e) {
                    log.info("[video] sse 전송 실패");
                    throw new VideoUploadException(ErrorCode.UNEXPECTED_ERROR);
                }
            }
        }

        int exitCode = process.waitFor();
        if (exitCode == 0) {
            // 완료 상태 100%
            emitter.send(SseEmitter.event().name(emitterName).data(100));

            return new File(outputFilePath);
        } else {
            log.error("[video] 압축 실패. 에러코드 - {}", exitCode);
            throw new VideoUploadException(ErrorCode.UNEXPECTED_ERROR);
        }
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
