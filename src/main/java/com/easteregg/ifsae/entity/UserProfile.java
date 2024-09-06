package com.easteregg.ifsae.entity;

import jakarta.annotation.Nullable;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    private HousingType housingType;

    @Nullable
    private int birth;

    @Nullable
    private String address;

    @Nullable
    private String phoneNumber;

    @Nullable
    private int familyCnt;

    @Nullable
    private String curPets;

    @Nullable
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "allergy_id")
    private List<UserProfileAllergy> allergies;

    @Nullable
    private String petExperience;
}
