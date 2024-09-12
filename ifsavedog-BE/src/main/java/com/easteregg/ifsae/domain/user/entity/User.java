package com.easteregg.ifsae.domain.user.entity;

import com.easteregg.ifsae.domain.user.type.Grade;
import com.easteregg.ifsae.domain.user.type.Role;
import com.easteregg.ifsae.domain.user.type.UserStatus;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String email;

    @NotNull
    private String password;

    @NotNull
    private String nickname;

    @Enumerated(EnumType.ORDINAL)
    private Role role;

    private String profileImgUrl;

    @Enumerated(EnumType.ORDINAL)
    private Grade grade;

    @Enumerated(EnumType.ORDINAL)
    private UserStatus userStatus;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_profile_id")
    private UserProfile userProfile;
}
