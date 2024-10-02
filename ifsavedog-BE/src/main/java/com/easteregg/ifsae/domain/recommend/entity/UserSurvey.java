package com.easteregg.ifsae.domain.recommend.entity;

import com.easteregg.ifsae.domain.user.entity.User;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserSurvey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    // 1. 운동 시간
    private int exerciseScore; // 예: 1점 = 30분 이하, 5점 = 2시간 이상

    // 2. 짖는 정도
    private int barkingTolerance; // 예: 1점 = 조용해야함, 5점 = 상관없음

    // 3. 털 관리
    private int groomingEffort; // 예: 1점 = 관리가 쉬운 털, 5점 = 관리가 어려운 털

    // 4. 선호하는 크기
    private int preferredSize; // 예: 1점 = 소형, 3점 = 중형, 5점 = 대형

    // 5. 다른 강아지들과의 공동생활 여부
    private int cohabitationWithOtherDogs; // 예: 1점 = 있음, 5점 = 없음

    // 6. 운동 강도
    private int exerciseLevel; // 예: 1점 = 낮음, 5점 = 매우 높음

    // 7. 훈련 경험
    private int trainingExperience; // 예: 1점 = 없음, 5점 = 훈련 경험 많음

    // 8. 아이와의 친화력
    private int childFriendliness; // 예: 1점 = 아이와 상호작용 어려움, 5점 = 매우 친화적

}
