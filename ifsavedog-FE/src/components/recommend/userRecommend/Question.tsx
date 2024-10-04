import CircleRadioButtons from '@/components/recommend/userRecommend/CircleRadioButtons';

const Question = ({ question }: { question: string }) => {
  return (
    <div>
      {question}
      <CircleRadioButtons />
    </div>
  );
};

export default Question;
