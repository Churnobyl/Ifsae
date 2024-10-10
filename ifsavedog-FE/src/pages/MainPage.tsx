import {
  getLastPageNumApi,
  getRecommendListApi,
} from '@/apis/recommend/recommendApi';
import MainPrevVideo from '@/components/video/MainPrevVideo';
import { DogType } from '@/types/dog/DogType';
import { MainPrevVideoInterface } from '@/types/post/MainPrevVideoInterface';
import { useEffect, useRef, useState } from 'react';

const MainPage = () => {
  // const [count, setCount] = useState<number>();
  const [lastPage, setLastPage] = useState<number | null>(null);
  const [postList, setPostList] = useState<MainPrevVideoInterface[]>([]);
  const [hasError, setHasError] = useState(false); // 에러 상태 관리 변수
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchLastPage = async () => {
      try {
        const response = await getLastPageNumApi();
        setLastPage(response.data.lastPage > 20 ? 1 : response.data.lastPage);
      } catch (error) {
        console.error('Failed to fetch last page:', error);
        setHasError(true); // 에러 발생 시 상태 변경
      }
    };

    fetchLastPage();
  }, []);

  // 마지막 페이지 번호를 기반으로 postList를 받아오는 useEffect
  useEffect(() => {
    const fetchPostList = async () => {
      if (lastPage !== null && !hasError) {
        // 에러가 없을 때만 요청 수행
        try {
          const response = await getRecommendListApi(lastPage);
          setPostList((prevList) => [...prevList, ...response.data]);
        } catch (error) {
          console.error('Failed to fetch post list:', error);
          setHasError(true); // 에러 발생 시 상태 변경
        }
      }
    };

    fetchPostList();
  }, [hasError, lastPage]); // hasError 상태가 변경될 때도 실행

  // Intersection Observer를 사용하여 스크롤이 마지막에 도달했을 때 lastPage를 증가
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && lastPage !== null && !hasError) {
          setLastPage((prevPage) => {
            const nextPage = prevPage !== null ? prevPage + 1 : 1;
            return nextPage > 20 ? 1 : nextPage;
          });
        }
      },
      { threshold: 1.0 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef!.current) observer.unobserve(observerRef!.current);
    };
  }, [hasError, lastPage]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-11/12 flex flex-col items-center">
        {postList.map((video) => (
          <MainPrevVideo
            key={video.id}
            id={video.id}
            thumbnailUrl={video.thumbnailUrl}
            like={video.like}
            title={video.title}
            dogs={video.dogs as DogType[]}
          />
        ))}
      </div>

      <div
        ref={observerRef}
        className="w-full h-10 flex justify-center items-center mt-4"
      >
        더 불러 오기
      </div>
    </div>
  );
};

export default MainPage;
