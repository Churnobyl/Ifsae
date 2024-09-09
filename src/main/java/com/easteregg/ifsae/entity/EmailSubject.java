package com.easteregg.ifsae.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum EmailSubject {
    EMAIL_AUTH("회원가입 인증 코드"), FIND_PASSWORD("비밀번호 찾기 인증 코드");

    private final String value;

}
