package com.easteregg.ifsae.domain.post.entity;

import com.easteregg.ifsae.domain.post.dto.CommentDto;
import com.easteregg.ifsae.domain.user.entity.User;
import com.easteregg.ifsae.global.entity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Comment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @NotNull
    private String content;

    public CommentDto.Response toResponse() {
        return CommentDto.Response.builder()
                                  .id(id)
                                  .userNickname(user.getNickname())
                                  .userProfileImg(user.getProfileImgUrl())
                                  .content(content)
                                  .build();
    }

}
