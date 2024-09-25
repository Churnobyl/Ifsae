package com.easteregg.ifsae.domain.dog.entity;

import com.easteregg.ifsae.domain.dog.dto.DogCreateRequest;
import com.easteregg.ifsae.domain.dog.type.DogStatus;
import com.easteregg.ifsae.domain.dog.type.Gender;
import com.easteregg.ifsae.domain.post.entity.PostDog;
import com.easteregg.ifsae.domain.shelter.entity.ShelterDog;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Dog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private int age;

    @NotNull
    @Enumerated(EnumType.ORDINAL)
    private Gender gender;

    @NotNull
    @Enumerated(EnumType.ORDINAL)
    private DogStatus dogStatus;

    @NotNull
    @OneToOne
    @JoinColumn(name = "species_id")
    private Species species;

    private String info;

    private String image;

    @OneToOne(mappedBy = "dog")
    private ShelterDog shelterDog;

    @OneToMany(mappedBy = "dog")
    private List<PostDog> posts;

    public void updateDogProfileImage(String imageUrl) {
        this.image = imageUrl;
    }

    public void updateDogInfo(DogCreateRequest dogCreateRequest) {
        this.name = dogCreateRequest.getName();
        this.age = dogCreateRequest.getAge();
        this.gender = Gender.valueOf(dogCreateRequest.getGender());
        this.dogStatus = DogStatus.valueOf(dogCreateRequest.getDogStatus());
        this.info = dogCreateRequest.getInfo();

    }

}