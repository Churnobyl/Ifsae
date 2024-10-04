import Question from '@/components/recommend/userRecommend/Question';

const UserRecommendPage = () => {
  const questionList = [
    '운동 시간',
    '짖는 정도',
    '털 관리',
    '선호하는 크기',
    '다른 강아지들과의 공동생활 여부',
    '운동 정도',
    '훈련 경험',
    '아이와의 친화력',
  ];

  return (
    <div>
      {questionList.map((question) => (
        <Question />
      ))}
    </div>
  );
};

export default UserRecommendPage;
