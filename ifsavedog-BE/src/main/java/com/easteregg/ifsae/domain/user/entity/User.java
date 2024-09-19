package com.easteregg.ifsae.domain.user.entity;

import com.easteregg.ifsae.domain.user.type.Grade;
import com.easteregg.ifsae.domain.user.type.Role;
import com.easteregg.ifsae.domain.user.type.UserStatus;
import com.fasterxml.jackson.annotation.JsonProperty;
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
import java.util.ArrayList;
import java.util.Collection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String email;

    @NotNull
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collection = new ArrayList<>();
        collection.add((GrantedAuthority) () -> this.role.toString());
        collection.add((GrantedAuthority) () -> this.grade.toString());
        return collection;
    }

    @Override
    public String getUsername() {
        return this.email;
    }
}
