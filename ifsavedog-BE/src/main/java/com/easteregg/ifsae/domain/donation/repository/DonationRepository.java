package com.easteregg.ifsae.domain.donation.repository;

import com.easteregg.ifsae.domain.donation.entity.Donation;
import com.easteregg.ifsae.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {
    List<Donation> findByUser(User user);
    List<Donation> findByShelterId(Long shelterId);
}