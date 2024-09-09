package com.easteregg.ifsae.global.email;

import com.easteregg.ifsae.global.redis.RedisUtil;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender javaMailSender;
    private final RedisUtil redisUtil;

    @Override
    public String sendEmail(String email, EmailSubject subject) throws MessagingException {
        // 1. 랜덤 코드 생성
        String rndCode = generateRandomCode();

        // 2. 메시지 생성
        MimeMessage message = createMessage(email, subject.getValue(), rndCode);

        // 3. 이메일 전송
        javaMailSender.send(message);

        return rndCode;
    }

    @Override
    public String generateRandomCode() {
        return UUID.randomUUID().toString().substring(0, 6);
    }

    public void saveAuthCode(String email, String code) {
        redisUtil.setData(email, code);
    }

    private MimeMessage createMessage(String email, String subject, String code) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        // 1. 받는 사람 설정
        message.addRecipients(Message.RecipientType.TO, email);

        StringBuilder sb = new StringBuilder();

        // 2. 제목 설정
        sb.append("[Ifsave]잎새 ").append(subject).append("인증 코드");
        String title = sb.toString();
        message.setSubject(title);

        // 3. 내용 설정
        sb = new StringBuilder();
        sb.append("<!DOCTYPE html>\n")
          .append("<html lang=\"en\">\n")
          .append("  <head>\n")
          .append("    <meta charset=\"UTF-8\" />\n")
          .append("    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n")
          .append("    <title>Ifsave</title>\n")
          .append("  </head>\n")
          .append("  <body>\n")
          .append("    <h1>잎새 ").append(subject).append("인증 코드입니다.</h1>\\n\"")
          .append("    <h3>아래 6자리 숫자를 이메일 인증 입력칸에 입력해주세요</h3>\n")
          .append("    <div style=\"align-self: center;  border: 5px solid black; width: 50%; height: 10%;\">\n")
          .append("      <h1 style=\"text-align: center; font-size: 50px;\">").append(code).append("</h1>\n")
          .append("  </body>\n")
          .append("</html>");

        String msg = sb.toString();

        message.setText(msg, "utf-8", "html");
        return message;
    }
}
