package com.easteregg.ifsae.global.video;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class VideoCompressor {

    private static final Pattern DURATION_PATTERN = Pattern.compile("Duration: (\\d{2}):(\\d{2}):(\\d{2}\\.\\d{2})");
    private static final Pattern TIME_PATTERN = Pattern.compile("time=(\\d{2}):(\\d{2}):(\\d{2}\\.\\d{2})");

    public File compressVideo(MultipartFile multipartFile, String outputFilePath, SseEmitter emitter) throws IOException, InterruptedException {
        File inputFile = convertMultipartFileToFile(multipartFile);

        ProcessBuilder processBuilder = new ProcessBuilder(
                "ffmpeg", "-i", inputFile.getAbsolutePath(),
                "-vcodec", "h264", "-acodec", "mp2", outputFilePath);

        Process process = processBuilder.start();

        BufferedReader stdError = new BufferedReader(new InputStreamReader(process.getErrorStream()));

        String line;
        double totalDuration = 0;
        double currentProgress = 0;

        // 총 길이(Duration)를 먼저 추출
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
                    emitter.send(SseEmitter.event().name("progress").data((int) currentProgress));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        int exitCode = process.waitFor();
        if (exitCode == 0) {
            // 완료 상태 100%
            emitter.send(SseEmitter.event().name("progress").data(100));
            return new File(outputFilePath);
        } else {
            throw new RuntimeException("Failed to compress video, error code: " + exitCode);
        }
    }

    private double parseTimeToSeconds(Matcher matcher) {
        int hours = Integer.parseInt(matcher.group(1));
        int minutes = Integer.parseInt(matcher.group(2));
        double seconds = Double.parseDouble(matcher.group(3));
        return hours * 3600 + minutes * 60 + seconds;
    }

    private File convertMultipartFileToFile(MultipartFile file) throws IOException {
        File convFile = new File(System.getProperty("java.io.tmpdir") + "/" + file.getOriginalFilename());
        file.transferTo(convFile); // MultipartFile을 로컬 파일로 저장
        return convFile;
    }
}
