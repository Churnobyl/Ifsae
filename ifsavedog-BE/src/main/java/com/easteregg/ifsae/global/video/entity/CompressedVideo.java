package com.easteregg.ifsae.global.video.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.File;

@Getter @Setter
@NoArgsConstructor
public class CompressedVideo {

    private File compressedVideo;
    private String thumbnailPath;
}
