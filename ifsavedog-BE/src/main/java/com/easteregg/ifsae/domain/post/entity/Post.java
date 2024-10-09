package com.easteregg.ifsae.domain.post.entity;

import com.easteregg.ifsae.domain.dog.entity.Dog;
import com.easteregg.ifsae.domain.post.dto.PostDto;
import com.easteregg.ifsae.domain.shelter.entity.Shelter;
import com.easteregg.ifsae.global.entity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Builder
@Getter
@DynamicUpdate // 일부 column 변경 가능
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
    private String thumbnailUrl;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "shelter_id")
    private Shelter shelter;

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
                               .shelter(shelter.toShelterPreviewDto())
                               .dogs(dogs.stream().map(PostDog::getDog).map(Dog::toDogListDto).toList())
                               .comments(comments.stream().map(Comment::toResponse).toList())
                               .likeCnt(likeCnt)
                               .viewCnt(viewCnt)
                               .build();
    }

    public void updateDogs(List<PostDog> postDogs) {
        this.dogs = postDogs;
    }

    public void addLikeCnt() {
        this.likeCnt++;
    }

    public void removeLikeCnt() {
        this.likeCnt--;
    }

    public void addViewCnt() {
        this.viewCnt++;
    }
}