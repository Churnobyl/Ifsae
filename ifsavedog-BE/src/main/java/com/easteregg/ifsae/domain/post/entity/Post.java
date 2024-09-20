package com.easteregg.ifsae.domain.post.entity;

import com.easteregg.ifsae.domain.shelter.entity.Shelter;
import com.easteregg.ifsae.global.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicUpdate;

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
    @ColumnDefault("0")
    private List<PostLike> likes;

    @NotNull
    @ColumnDefault("0")
    private int likeCnt;

    @NotNull
    @ColumnDefault("0")
    private int viewCnt;

}