import {
  getLastPageNumApi,
  getRecommendListApi,
} from '@/apis/recommend/recommendApi';
import MainPrevVideo from '@/components/video/MainPrevVideo';
import { DogType } from '@/types/dog/DogType';
import { MainPrevVideoInterface } from '@/types/post/MainPrevVideoInterface';
import { useEffect, useRef, useState } from 'react';

const MainPage = () => {
  const [lastPage, setLastPage] = useState<number | null>(null);
  const lastSlideRef = useRef<HTMLDivElement | null>(null);
  const [postList, setPostList] = useState<MainPrevVideoInterface[]>([]);
  const [hasError, setHasError] = useState(false); // 에러 상태 관리 변수
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLastPage = async () => {
      try {
        const response = await getLastPageNumApi();
        const newLastPage =
          response.data.lastPage > 20 ? 1 : response.data.lastPage;
        setLastPage(newLastPage);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch last page:', error);
        setHasError(true);
      }
    };

    fetchLastPage();
  }, []);

  useEffect(() => {
    const fetchPostList = async () => {
      if (lastPage !== null && !hasError) {
        try {
          const response = await getRecommendListApi(lastPage);
          setPostList((prevSlides) => [...prevSlides, ...response.data]);
          setIsLoading(false);
        } catch (error) {
          console.error('Failed to fetch post list:', error);
          setHasError(true);
          setIsLoading(false);
        }
      }
    };

    fetchPostList();
  }, [lastPage, hasError]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading && lastPage !== null) {
        setIsLoading(true);
        setLastPage((prevPage) => (prevPage ? prevPage + 1 : null));
      }
    });

    if (lastSlideRef.current) {
      observer.observe(lastSlideRef.current);
    }

    return () => {
      if (lastSlideRef!.current) {
        observer.unobserve(lastSlideRef!.current);
      }
    };
  }, [isLoading, lastPage, lastSlideRef]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-11/12 flex flex-col items-center">
        {postList.map((video, index) => (
          <MainPrevVideo
            key={video.id}
            id={video.id}
            thumbnailUrl={video.thumbnailUrl}
            like={video.like}
            title={video.title}
            dogs={video.dogs as DogType[]}
            ref={index === postList.length - 1 ? lastSlideRef : null}
          />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
