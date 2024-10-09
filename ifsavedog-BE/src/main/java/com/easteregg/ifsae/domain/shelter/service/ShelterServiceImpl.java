package com.easteregg.ifsae.domain.shelter.service;

import com.amazonaws.AmazonServiceException;
import com.easteregg.ifsae.domain.shelter.dto.ShelterCreateRequest;
import com.easteregg.ifsae.domain.shelter.dto.ShelterDetailDto;
import com.easteregg.ifsae.domain.shelter.entity.Shelter;
import com.easteregg.ifsae.domain.shelter.entity.ShelterUser;
import com.easteregg.ifsae.domain.shelter.repository.ShelterRepository;
import com.easteregg.ifsae.domain.shelter.repository.ShelterUserRepository;
import com.easteregg.ifsae.domain.user.entity.User;
import com.easteregg.ifsae.domain.user.repository.UserRepository;
import com.easteregg.ifsae.global.exception.ErrorCode;
import com.easteregg.ifsae.global.exception.type.InvalidFileFormatException;
import com.easteregg.ifsae.global.exception.type.UserException;
import com.easteregg.ifsae.global.s3.S3ImageUploader;
import jakarta.transaction.Transactional;

import java.io.IOException;
import java.util.NoSuchElementException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class ShelterServiceImpl implements ShelterService {

    private final ShelterRepository shelterRepository;

    private final ShelterUserRepository shelterUserRepository;

    private final UserRepository userRepository;

    private final S3ImageUploader s3ImageUploader;

    @Override
    public void createShelter(User user, ShelterCreateRequest shelterCreateRequest) {
        Shelter shelter = Shelter.builder()
                .name(shelterCreateRequest.getName())
                .address(shelterCreateRequest.getAddress())
                .phone(shelterCreateRequest.getPhone())
                .content(shelterCreateRequest.getContent())
                .canBeDonated(shelterCreateRequest.isCanBeDonated())
                .build();

        user.changeUserStatus();

        userRepository.save(user);

        shelterRepository.save(shelter);

        shelterUserRepository.save(ShelterUser.builder()
                .shelter(shelter)
                .user(user)
                .build());

    }

    @Override
    public void updateShelter(User user, long shelterId, ShelterCreateRequest shelterCreateRequest) {
        Shelter shelter = shelterRepository.findById(shelterId).orElseThrow(NoSuchElementException::new);

        shelter.updateShelterInfo(shelterCreateRequest);
        shelterRepository.save(shelter);
    }

    @Override
    public void deleteShelter(User user, long shelterId) {
        shelterRepository.deleteById(shelterId);
        shelterUserRepository.deleteById(shelterId);
    }

    @Override
    public ShelterDetailDto findShelterById(long shelterId) {
        Shelter shelter = shelterRepository.findById(shelterId).orElseThrow(NoSuchElementException::new);

        return ShelterDetailDto.builder()
                .id(shelter.getId())
                .profileImgUrl(shelter.getProfileImgUrl())
                .name(shelter.getName())
                .address(shelter.getAddress())
                .phone(shelter.getPhone())
                .content(shelter.getContent())
                .canBeDonated(shelter.isCanBeDonated())
                .build();
    }

    @Override
    public String updateUserProfileImg(User user, MultipartFile profileImg) {
        if (profileImg == null || profileImg.isEmpty()) {
            throw new InvalidFileFormatException(ErrorCode.INVALID_FILE_FORMAT);
        }

        ShelterUser shelterUser = shelterUserRepository.findByUserId(user.getId()).orElseThrow(
                () -> new UserException(ErrorCode.USER_NOT_FOUND));
        Shelter shelter = shelterUser.getShelter();

        try {
            // 기존 이미지가 있을 경우 삭제
            deleteOldProfileImg(shelter.getProfileImgUrl());

            // 새로운 이미지 업로드 및 URL 설정
            String newImgUrl = uploadNewProfileImg(profileImg);

            if (!newImgUrl.equals(shelter.getProfileImgUrl())) {
                shelter.setProfileImgUrl(newImgUrl);
                shelterRepository.save(shelter);
                return newImgUrl;
            }
        } catch (AmazonServiceException e) {
            throw new UserException(ErrorCode.FAILED_TO_UPLOAD_PROFILE_IMG);
        }
        return null;
    }

    private void deleteOldProfileImg(String profileImgUrl) {
        if (profileImgUrl != null) {
            s3ImageUploader.delete(profileImgUrl);
        }
    }

    private String uploadNewProfileImg(MultipartFile profileImg) {
        try {
            return s3ImageUploader.upload(profileImg);
        } catch (IOException e) {
            throw new UserException(ErrorCode.FAILED_TO_UPLOAD_PROFILE_IMG);
        }
    }
}
