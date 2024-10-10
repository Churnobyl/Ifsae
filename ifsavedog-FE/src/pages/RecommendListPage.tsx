import { useEffect, useState } from 'react';
import DogPreviewCardList from '@/components/common/DogPreviewCardList';
import { getRecommendDogListApi } from '@/apis/recommend/recommendApi'; // API import
import { DogType } from '@/types/dog/DogType';

const RecommendListPage = () => {
  const [dogList, setDogList] = useState<DogType[]>([]); // 강아지 목록 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태
  const [page, setPage] = useState(1); // 현재 페이지 상태
  const [hasMore, setHasMore] = useState(true); // 더 로드할 데이터가 있는지 여부
  const maxPage = 25; // 마지막 페이지 번호 (25)

  // 입양 추천 강아지 목록을 불러오는 함수
  const fetchRecommendDogList = async (pageNum: number) => {
    setLoading(true); // 로딩 시작
    try {
      const response = await getRecommendDogListApi(pageNum); // 페이지 번호만 전달
      const newDogs = response.data; // API 응답에서 강아지 목록 가져오기

      if (newDogs.length === 0 || pageNum >= maxPage) {
        setHasMore(false); // 더 이상 데이터가 없거나 마지막 페이지에 도달하면
      }

      setDogList((prevDogs) => [...prevDogs, ...newDogs]); // 기존 강아지 목록에 새 목록 추가
    } catch (error) {
      setError('추천 강아지 목록을 불러오는 중 오류가 발생했습니다.');
      console.error('Error fetching recommend dog list:', error);
    } finally {
      setLoading(false); // 로딩 완료
    }
  };

  // 페이지 변경될 때마다 API 호출
  useEffect(() => {
    if (page === 1 || !loading) {
      fetchRecommendDogList(page);
    }
  }, [hasMore, loading, page]);

  // "더 보기" 클릭 시 페이지 번호 증가
  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // 첫 페이지 로딩 처리
  if (loading && page === 1 && dogList.length === 0) {
    return <div>Loading...</div>; // 첫 페이지 로딩 중일 때
  }

  // 에러 처리
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
          <>
            <DogPreviewCardList dogList={dogList} /> {/* 강아지 목록 표시 */}
            {hasMore && !loading && (
              <button
                className="mt-4 p-2 bg-blue-500 text-white rounded"
                onClick={handleLoadMore}
              >
                더 보기
              </button>
            )}
            {loading && <div>Loading more...</div>} {/* 추가 로딩 표시 */}
          </>
        ) : (
          <div>추천 강아지가 없습니다.</div> // 강아지 목록이 없을 때
        )}
      </div>
    </div>
  );
};

export default RecommendListPage;
