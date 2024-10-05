package com.easteregg.ifsae.domain.donation.entity;

import com.easteregg.ifsae.domain.dog.entity.Dog;
import com.easteregg.ifsae.domain.shelter.entity.Shelter;
import com.easteregg.ifsae.domain.user.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@EntityListeners(AuditingEntityListener.class)
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "shelter_id")
    private Shelter shelter;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "dog_id")
    private Dog dog;

    @NotNull
    private int contribution;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}