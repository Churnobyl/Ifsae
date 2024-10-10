import { useUserSurveyStore } from '@/stores/user/userSurveyStore';
import { ChangeEvent, useCallback } from 'react';
import Question from '@/components/recommend/userRecommend/Question';
import { UserSurveyType } from '@/types/user/UserSurveyType';
import { createSurveyApi } from '@/apis/user/userApi';
import { useNavigate } from 'react-router-dom';

const UserRecommendPage = () => {
  const userSurveyStore = useUserSurveyStore();
  const userInputList = userSurveyStore.userInput;
  const navigate = useNavigate();

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

  // 제출 버튼 클릭 핸들러
  const handleSubmit = async () => {
    try {
      // userInputList를 createSurveyApi에 전달하여 POST 요청 전송
      await createSurveyApi(userInputList);

      alert('응답이 성공적으로 제출되었습니다!');
      navigate('main');
    } catch (error) {
      // 요청이 실패하면 에러 메시지 업데이트
      alert('제출 실패');
      console.error('Error submitting survey:', error);
    }
  };

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
          onClick={handleSubmit} // 제출 버튼에 클릭 핸들러 추가
          className={`w-20 h-8 ${
            isAllAnswered ? 'bg-main text-black' : 'bg-gray text-black'
          } rounded-lg mb-4`}
        >
          제출
        </button>
      </div>
    </div>
  );
};

export default UserRecommendPage;
