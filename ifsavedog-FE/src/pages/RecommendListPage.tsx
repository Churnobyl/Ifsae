import { useEffect, useRef, useState, useCallback } from 'react';
import DogPreviewCardList from '@/components/common/DogPreviewCardList';
import { getRecommendDogListApi } from '@/apis/recommend/recommendApi'; // API import
import { DogType } from '@/types/dog/DogType';

const RecommendListPage = () => {
  const [dogList, setDogList] = useState<DogType[]>([]); // 강아지 목록 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태
  const [page, setPage] = useState(1); // 현재 페이지 상태
  const [hasMore, setHasMore] = useState(true); // 더 로드할 데이터가 있는지 여부
  const maxPage = 25; // 마지막 페이지 번호

  const observer = useRef<IntersectionObserver | null>(null); // Intersection Observer ref

  // 입양 추천 강아지 목록을 불러오는 함수
  const fetchRecommendDogList = async (pageNum: number) => {
    setLoading(true); // 로딩 시작
    try {
      const response = await getRecommendDogListApi(pageNum); // 페이지 번호 전달
      const newDogs = response.data; // API 응답에서 강아지 목록 가져오기

      // 데이터를 받아온 후 데이터가 없거나 마지막 페이지에 도달한 경우 더 이상 데이터를 로드하지 않도록 설정
      if (newDogs.length === 0 || pageNum >= maxPage) {
        setHasMore(false);
      }

      // 기존 강아지 목록에 새로 받아온 목록을 추가
      setDogList((prevDogs) => [...prevDogs, ...newDogs]);
    } catch (error) {
      setError('추천 강아지 목록을 불러오는 중 오류가 발생했습니다.');
      console.error('Error fetching recommend dog list:', error);
    } finally {
      setLoading(false); // 로딩 완료
    }
  };

  // 페이지 변경될 때마다 API 호출
  useEffect(() => {
    if (hasMore && !loading) {
      fetchRecommendDogList(page);
    }
  }, [hasMore, loading, page]); // 페이지 상태가 변경될 때마다 호출

  // 마지막에서 4번째 강아지가 화면에 들어올 때 다음 페이지 호출
  const lastDogElementRef = useCallback(
    (node: HTMLElement | null) => {
      // node 타입을 HTMLElement | null로 지정
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1); // 페이지 증가
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  // 첫 페이지 로딩 처리
  if (loading && page === 1 && dogList.length === 0) {
    return <div>Loading...</div>; // 첫 페이지 로딩 중일 때
  }

  // 에러 처리
  if (error) {
    return <div>{error}</div>;
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
            {dogList.map((dog, index) => {
              if (dogList.length - 4 === index) {
                // 마지막에서 네 번째 항목일 때 ref 설정
                return (
                  <div key={dog.id} ref={lastDogElementRef}>
                    <DogPreviewCardList dogList={[dog]} />
                  </div>
                );
              } else {
                return <DogPreviewCardList key={dog.id} dogList={[dog]} />;
              }
            })}
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
