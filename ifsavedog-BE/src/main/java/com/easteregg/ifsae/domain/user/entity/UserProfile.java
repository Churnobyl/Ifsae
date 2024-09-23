package com.easteregg.ifsae.domain.user.entity;

import com.easteregg.ifsae.domain.user.dto.UserProfileDto;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
    @JoinColumn(name = "housing_type_id")
    private HousingType housingType;

    private int birth;

    private String address;

    private String phoneNumber;

    private int familyCnt;

    private String curPets;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "allergy_id")
    private List<UserProfileAllergy> allergies;

    private String petExperience;

    public UserProfileDto toDto() {
        return UserProfileDto.builder()
                             .housingType(housingType.getName())
                             .birth(birth)
                             .address(address)
                             .phoneNumber(phoneNumber)
                             .familyCnt(familyCnt)
                             .curPets(curPets)
                             .petExperience(petExperience)
                             .allergies(allergies.stream()
                                                 .map(userProfileAllergy -> userProfileAllergy.getAllergy().getName())
                                                 .toList())
                             .build();
    }
}
