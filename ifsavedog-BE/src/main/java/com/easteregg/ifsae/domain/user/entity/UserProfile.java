package com.easteregg.ifsae.domain.user.entity;

import com.easteregg.ifsae.domain.user.dto.UserProfileDto;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Getter
@Setter
@Builder
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

    @ColumnDefault("0")
    private int familyCnt;

    private String curPets;

    @ColumnDefault("false")
    private boolean hasAllergy;

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
                             .hasAllergy(hasAllergy)
                             .build();
    }
}
