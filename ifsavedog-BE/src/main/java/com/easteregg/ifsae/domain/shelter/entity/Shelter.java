package com.easteregg.ifsae.domain.shelter.entity;

import com.easteregg.ifsae.domain.shelter.dto.ShelterCreateRequest;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import java.util.List;

import lombok.*;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Shelter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    private String profileImgUrl;

    @NotNull
    private String name;

    private String address;

    @Column(length = 20)
    private String phone;

    @Column(columnDefinition = "TEXT")
    private String content;

    @NotNull
    private boolean canBeDonated;

    @OneToMany(mappedBy = "shelter")
    private List<ShelterDog> shelterDogList;

    public void updateShelterInfo(ShelterCreateRequest shelterCreateRequest) {
        this.name = shelterCreateRequest.getName();
        this.address = shelterCreateRequest.getAddress();
        this.phone = shelterCreateRequest.getPhone();
        this.content = shelterCreateRequest.getContent();
        this.canBeDonated = shelterCreateRequest.isCanBeDonated();
    }
}

