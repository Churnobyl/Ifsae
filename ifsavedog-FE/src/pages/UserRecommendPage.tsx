import { useUserSurveyStore } from '@/stores/user/userSurveyStore';
import { ChangeEvent, useCallback } from 'react';
import Question from '@/components/recommend/userRecommend/Question';
import { UserSurveyType } from '@/types/user/UserSurveyType';
import MainLayout from '@/layouts/MainLayout';

const UserRecommendPage = () => {
  const userSurveyStore = useUserSurveyStore();

  const userInputList = userSurveyStore.userInput;
  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      userSurveyStore.setUserInput({ [name]: parseInt(value, 10) });
    },
    [userSurveyStore],
  );

  // 모든 질문에 답변이 주어졌는지 확인
  const isAllAnswered = Object.values(userInputList).every(
    (value) => value >= 1 && value <= 5,
  );

  return (
    <div className="w-full h-11/12 flex flex-col items-center overflow-auto">
      <div className="w-11/12 flex flex-col items-center">
        <div className="text-xl font-semibold p-2">
          여러분의 선호도를 입력해주세요!
        </div>
        <div className={'w-11/12  flex flex-col p-2'}>
          {(Object.keys(userInputList) as Array<keyof UserSurveyType>).map(
            (questionName) => (
              <Question
                key={questionName}
                questionName={questionName}
                onChange={handleInputChange}
              />
            ),
          )}
        </div>
        <button
          disabled={!isAllAnswered}
          className="w-20 h-8 bg-main text-black rounded-lg mb-4"
        >
          제출
        </button>
      </div>
    </div>
  );
};

export default UserRecommendPage;
