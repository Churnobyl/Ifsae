package com.easteregg.ifsae.domain.user.service;

import com.easteregg.ifsae.domain.shelter.dto.ShelterDetailDto;
import com.easteregg.ifsae.domain.user.dto.SignupDto;
import com.easteregg.ifsae.domain.user.dto.UpdateUserBasicInfoDto;
import com.easteregg.ifsae.domain.user.dto.UserInfo;
import com.easteregg.ifsae.domain.user.dto.UserProfileDto;
import com.easteregg.ifsae.domain.user.entity.User;
import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    boolean isEmailExisted(String email);

    boolean isNicknameExisted(String nickname);

    void saveNewUser(SignupDto.Request request);

    User getUserByEmail(String userEmail);

    UserInfo getUserInfo(User user);

    User getUserById(Long id);

    void updateUserBasicInfo(UpdateUserBasicInfoDto updateUserBasicInfoDto, User user);

    void updateUserProfileInfo(UserProfileDto userProfileDto, User user);

    String updateUserProfileImg(User user, MultipartFile profileImg) throws IOException;

    void saveUser(User user);

    ShelterDetailDto getMyShelter(long userId);
}

