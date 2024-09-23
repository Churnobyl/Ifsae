package com.easteregg.ifsae.domain.post.entity;

import com.easteregg.ifsae.domain.post.dto.PostDto;
import com.easteregg.ifsae.domain.shelter.entity.Shelter;
import com.easteregg.ifsae.global.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Getter
@DynamicUpdate // 일부 column 변경 가능
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Post extends BaseEntity {

    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String title;

    private String content;

    @Setter
    @NotNull
    private String videoUrl;

    @Setter
    @NotNull
    @ManyToOne
    @JoinColumn(name = "shelter_id")
    private Shelter shelter;

    @Setter
    @OneToMany(mappedBy = "post", fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<PostDog> dogs = new ArrayList<>();

    @OneToMany(mappedBy = "post", fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "post", fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<PostLike> likes = new ArrayList<>();

    @NotNull
    @ColumnDefault("0")
    private int likeCnt;

    @NotNull
    @ColumnDefault("0")
    private int viewCnt;

    public PostDto.Response toResponseDto() {
        return PostDto.Response.builder()
                .id(id)
                .title(title)
                .content(content)
                .videoUrl(videoUrl)
                .shelter(shelter)
                .dogs(dogs)
                .comments(comments)
                .likes(likes)
                .likeCnt(likeCnt)
                .viewCnt(viewCnt)
                .build();
    }
}