import { useEffect, useState } from 'react';
import DogPreviewCardList from '@/components/common/DogPreviewCardList';
import { getRecommendDogListApi } from '@/apis/recommend/recommendApi'; // API import
import { DogType } from '@/types/dog/DogType';

const RecommendListPage = () => {
  const [dogList, setDogList] = useState<DogType[]>([]); // 강아지 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  // 입양 추천 강아지 목록을 불러오는 함수
  useEffect(() => {
    const fetchFollowDogList = async () => {
      try {
        const response = await getRecommendDogListApi(); // API 호출
        setDogList(response.data); // 강아지 목록 상태 업데이트
      } catch (error) {
        setError('팔로우한 강아지 목록을 불러오는 중 오류가 발생했습니다.');
        console.error('Error fetching recommend dog list:', error);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchFollowDogList(); // 컴포넌트 렌더링 시 API 호출
  }, []);

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 UI
  }

  if (error) {
    return <div>{error}</div>; // 에러 발생 시 표시할 UI
  }

  return (
    <div className="w-full min-h-screen text-black flex flex-col items-center">
      <header className="w-11/12 flex justify-between items-center py-4 bg-white">
        <h1 className="text-xl font-semibold">추천 친구</h1>
      </header>

      <div className="w-11/12">
        {dogList.length > 0 ? (
          <DogPreviewCardList dogList={dogList} /> // 강아지 목록 표시
        ) : (
          <div></div> // 강아지 목록이 없을 때
        )}
      </div>
    </div>
  );
};

export default RecommendListPage;
