import CircleRadioButtons from '@/components/recommend/userRecommend/CircleRadioButtons';
import { ChangeEvent } from 'react';
import { UserSurveyType } from '@/types/user/UserSurveyType';

type QuestionProps = {
  questionName: keyof UserSurveyType;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Question = ({ questionName, onChange }: QuestionProps) => {
  return <CircleRadioButtons questionName={questionName} onChange={onChange} />;
};

export default Question;
