import { useEffect, useState } from 'react';
import DogPreviewCardList from '@/components/common/DogPreviewCardList';
import { followDogListApi } from '@/apis/dog/dogApi'; // API import
import { DogType } from '@/types/dog/DogType';

const FollowPage = () => {
  const [dogList, setDogList] = useState<DogType[]>([]); // 강아지 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  // 팔로우한 강아지 목록을 불러오는 함수
  useEffect(() => {
    const fetchFollowDogList = async () => {
      try {
        const response = await followDogListApi(); // API 호출
        setDogList(response.data); // 강아지 목록 상태 업데이트
      } catch (error) {
        setError('팔로우한 강아지 목록을 불러오는 중 오류가 발생했습니다.');
        console.error('Error fetching follow dog list:', error);
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
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between items-center px-4 py-4 bg-white shadow-md">
        <h1 className="text-lg font-semibold text-gray-700">
          팔로우한 친구 <span className="text-green-500">{dogList.length}</span>
        </h1>
      </header>

      <div className="p-4">
        {dogList.length > 0 ? (
          <DogPreviewCardList dogList={dogList} /> // 강아지 목록 표시
        ) : (
          <div>팔로우한 친구가 없습니다.</div> // 강아지 목록이 없을 때
        )}
      </div>
    </div>
  );
};

export default FollowPage;
