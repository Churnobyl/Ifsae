package com.easteregg.ifsae.domain.user.service;

import com.amazonaws.AmazonServiceException;
import com.easteregg.ifsae.domain.user.dto.SignupDto;
import com.easteregg.ifsae.domain.user.dto.UpdateUserBasicInfoDto;
import com.easteregg.ifsae.domain.user.dto.UserInfo;
import com.easteregg.ifsae.domain.user.dto.UserProfileDto;
import com.easteregg.ifsae.domain.user.entity.User;
import com.easteregg.ifsae.domain.user.entity.UserProfile;
import com.easteregg.ifsae.domain.user.repository.HousingTypeRepository;
import com.easteregg.ifsae.domain.user.repository.UserProfileRepository;
import com.easteregg.ifsae.domain.user.repository.UserRepository;
import com.easteregg.ifsae.domain.user.type.Grade;
import com.easteregg.ifsae.domain.user.type.Role;
import com.easteregg.ifsae.domain.user.type.UserStatus;
import com.easteregg.ifsae.global.exception.ErrorCode;
import com.easteregg.ifsae.global.exception.type.InvalidFileFormatException;
import com.easteregg.ifsae.global.exception.type.UserException;
import com.easteregg.ifsae.global.s3.S3ImageUploader;
import jakarta.transaction.Transactional;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final HousingTypeRepository housingTypeRepository;
    private final UserProfileRepository userProfileRepository;
    private final S3ImageUploader s3ImageUploader;
    private final PasswordEncoder passwordEncoder;

    @Override
    public boolean isEmailExisted(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public boolean isNicknameExisted(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    @Override
    public void saveNewUser(SignupDto.Request request) {

        User user = User.builder()
                        .email(request.getEmail())
                        .nickname(request.getNickname())
                        .password(passwordEncoder.encode(request.getPassword()))
                        .role(Role.fromValue(request.getRole()))
                        .userStatus(UserStatus.PENDING)
                        .grade(Grade.BRONZE)
                        .build();

        userRepository.save(user);
    }

    @Override
    public User getUserByEmail(String userEmail) {
        return userRepository.findByEmail(userEmail)
                             .orElseThrow(() -> new UserException(ErrorCode.INVALID_EMAIL));
    }

    @Override
    public UserInfo getUserInfo(User user) {
        UserProfile userProfile = userProfileRepository.findByUserId(user.getId())
                                                       .orElse(UserProfile.builder().build());

        return UserInfo.builder()
                       .id(user.getId())
                       .email(user.getEmail())
                       .nickname(user.getNickname())
                       .profileImgUrl(user.getProfileImgUrl())
                       .grade(user.getGrade().name())
                       .role(user.getRole().name())
                       .userProfile(userProfile.toDto())
                       .build();
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                             .orElseThrow(() -> new UserException(ErrorCode.USER_NOT_FOUND));
    }


    @Override
    public void updateUserBasicInfo(UpdateUserBasicInfoDto updateUserBasicInfoDto, User user) {
        user.updateUserBasicInfo(updateUserBasicInfoDto);
        userRepository.save(user);
    }

    @Override
    public void updateUserProfileInfo(UserProfileDto userProfileDto, User user) {
        UserProfile userProfile = user.getUserProfile();
        UserProfile newUserProfile = createNewUserProfile(userProfileDto, user);

        if (userProfile != null) {
            newUserProfile.setId(userProfile.getId());
        }

        userProfileRepository.save(newUserProfile);
    }

    @Override
    public void updateUserProfileImg(User user, MultipartFile profileImg) {
        if (profileImg == null || profileImg.isEmpty()) {
            throw new InvalidFileFormatException(ErrorCode.INVALID_FILE_FORMAT);
        }

        try {
            // 기존 이미지가 있을 경우 삭제
            deleteOldProfileImg(user.getProfileImgUrl());

            // 새로운 이미지 업로드 및 URL 설정
            String newImgUrl = uploadNewProfileImg(profileImg);

            if (!newImgUrl.equals(user.getProfileImgUrl())) {
                user.setProfileImgUrl(newImgUrl);
                userRepository.save(user);
            }
        } catch (AmazonServiceException e){
            throw new UserException(ErrorCode.FAILED_TO_UPLOAD_PROFILE_IMG);
        }
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

    private UserProfile createNewUserProfile(UserProfileDto userProfileDto, User user) {
        return UserProfile.builder()
                          .user(user)
                          .housingType(housingTypeRepository.findByName(userProfileDto.getHousingType())
                                                            .orElseThrow(() -> new UserException(
                                                                    ErrorCode.INVALID_HOUSING_TYPE)))
                          .birth(userProfileDto.getBirth())
                          .address(userProfileDto.getAddress())
                          .phoneNumber(userProfileDto.getPhoneNumber())
                          .familyCnt(userProfileDto.getFamilyCnt())
                          .curPets(userProfileDto.getCurPets())
                          .petExperience(userProfileDto.getPetExperience())
                          .hasAllergy(userProfileDto.isHasAllergy())
                          .build();
    }


}
