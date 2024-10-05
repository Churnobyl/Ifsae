package com.easteregg.ifsae.domain.recommend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserSurveyRequest {

    private int exerciseTime;

    private int barkingTolerance;

    private int groomingEffort;

    private int preferredSize;

    private int cohabitationWithOtherDogs;

    private int exerciseLevel;

    private int trainingExperience;

    private int childFriendliness;
}
