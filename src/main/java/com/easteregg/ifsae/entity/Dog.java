package com.easteregg.ifsae.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
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
public class Dog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    private String name;

    @NotNull
    private int age;

    @NotNull
    @Enumerated(EnumType.ORDINAL)
    private Gender gender;

    @NotNull
    private boolean is_adopted;

    @NotNull
    private String species;

    private String info;

    private String image;

    @OneToOne(mappedBy = "dog")
    private ShelterDog shelterDog;
}
