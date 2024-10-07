import {
  userSurveyMapper,
  useUserSurveyStore,
} from '@/stores/user/userSurveyStore';
import { UserSurveyType } from '@/types/user/UserSurveyType';
import { ChangeEvent } from 'react';

type CircleRadioButtonsProps = {
  questionName: keyof UserSurveyType;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const CircleRadioButtons = ({
  questionName,
  onChange,
}: CircleRadioButtonsProps) => {
  const userSurveyStore = useUserSurveyStore();
  const questionValue = userSurveyStore.userInput[questionName];

  // 해당 questionName에 대한 질문 및 성향 정보 가져오기
  const [questionText, leftTrait, rightTrait] = userSurveyMapper[questionName];

  return (
    <div className="mb-4">
      <div className={'text-lg'}>{questionText}</div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex gap-8">
          {[1, 2, 3, 4, 5].map((value) => (
            <label key={value} className="items-center cursor-pointer text-lg">
              <input
                className={'text-lg'}
                type="radio"
                name={questionName}
                value={value}
                checked={questionValue === value}
                onChange={onChange}
              />
            </label>
          ))}
        </div>
      </div>
      <div className={'flex justify-between'}>
        <div className={'text-xs'}>{leftTrait}</div>
        <div className={'text-xs'}>{rightTrait}</div>
      </div>
    </div>
  );
};

export default CircleRadioButtons;
