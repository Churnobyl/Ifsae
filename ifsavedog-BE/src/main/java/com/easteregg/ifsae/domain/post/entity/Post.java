package com.easteregg.ifsae.domain.post.entity;

import com.easteregg.ifsae.domain.shelter.entity.Shelter;
import com.easteregg.ifsae.global.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Post extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String title;

    private String content;

    @NotNull
    private String videoUrl;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "shelter_id")
    private Shelter shelter;

    @OneToMany(mappedBy = "post")
    private List<PostDog> dogs;

    @OneToMany(mappedBy = "post")
    private List<Comment> comments;

    @OneToMany(mappedBy = "post")
    private List<PostLike> likes;

    @NotNull
    private int likeCnt;

    @NotNull
    private int viewCnt;
}