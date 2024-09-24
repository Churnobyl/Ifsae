package com.easteregg.ifsae.domain.post.dto;

import com.easteregg.ifsae.domain.user.dto.UserDto;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class PostLikeDto {
    private Long id;
    private UserDto userDto;
}
