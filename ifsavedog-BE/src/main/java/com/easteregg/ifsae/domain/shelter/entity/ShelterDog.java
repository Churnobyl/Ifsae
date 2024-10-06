package com.easteregg.ifsae.domain.shelter.entity;

import com.easteregg.ifsae.domain.dog.entity.Dog;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ShelterDog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "shelter_id")
    @JsonIgnore // 순환 참조 방지
    private Shelter shelter;

    @OneToOne
    @JoinColumn(name = "dog_id")
    @JsonIgnore // 순환 참조 방지
    private Dog dog;
}
