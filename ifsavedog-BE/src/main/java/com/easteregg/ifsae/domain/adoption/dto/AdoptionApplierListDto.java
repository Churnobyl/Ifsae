package com.easteregg.ifsae.domain.adoption.dto;

import com.easteregg.ifsae.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AdoptionApplierListDto {

    private Long id;

    private String userName;

    private String userImage;

    public static AdoptionApplierListDto fromUser(User user) {
        return AdoptionApplierListDto.builder()
                                     .id(user.getId())
                                     .userName(user.getNickname())
                                     .userImage(user.getProfileImgUrl())
                                     .build();
    }

}
