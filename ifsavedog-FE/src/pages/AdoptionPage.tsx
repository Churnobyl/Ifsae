import React, { useEffect, useRef, useState } from 'react';
import AdoptionCard from '@/components/adoption/AdoptionCard';
import DogPreview from '@/components/common/DogPreviewBox';
import testImage from '@/assets/logo.webp';
import LeftArrow from '@/assets/icon/leftarrow.svg';
import RightArrow from '@/assets/icon/rightarrow.svg';
import { DogType } from '@/types/dog/DogType';
import { followDogListApi } from '@/apis/dog/dogApi'; // API import
import { getRecommendDogListApi } from '@/apis/recommend/recommendApi';
import { useNavigate } from 'react-router-dom';

interface DonationInfo {
  id: number;
  dog: DogType;
  duration: number;
  category: 'donation' | 'adoption';
}

const AdoptionPage = () => {
  const cardList: DonationInfo[] = [
    {
      id: 1,
      dog: {
        id: 1,
        name: '루루',
        age: 1,
        gender: 'FEMALE',
        species: '포메라니안',
        image: testImage,
      },
      duration: 3,
      category: 'adoption',
    },
  ];

  const navigate = useNavigate();
  const [recommenedList, setRecommenedList] = useState<DogType[]>([]);
  const [followList, setFollowList] = useState<DogType[]>([]); // 팔로우 강아지 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  const recommenedRef = useRef<HTMLDivElement | null>(null);
  const followRef = useRef<HTMLDivElement | null>(null);
  const [isRecommenedScrollable, setIsRecommenedScrollable] = useState({
    left: false,
    right: false,
  });
  const [isFollowScrollable, setIsFollowScrollable] = useState({
    left: false,
    right: false,
  });

  const handleRecommendListClick = () => {
    navigate('/recommend/dogs');
  };

  const handleFollowListClick = () => {
    navigate('/follow');
  };

  const checkScrollable = (
    ref: React.RefObject<HTMLDivElement>,
    setScrollable: React.Dispatch<
      React.SetStateAction<{ left: boolean; right: boolean }>
    >,
  ) => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      setScrollable({
        left: scrollLeft > 0,
        right: scrollLeft + clientWidth < scrollWidth,
      });
    }
  };

  useEffect(() => {
    const handleCheckScrollability = () => {
      checkScrollable(recommenedRef, setIsRecommenedScrollable);
      checkScrollable(followRef, setIsFollowScrollable);
    };

    if (recommenedRef.current) {
      recommenedRef.current.addEventListener(
        'scroll',
        handleCheckScrollability,
      );
    }
    if (followRef.current) {
      followRef.current.addEventListener('scroll', handleCheckScrollability);
    }

    handleCheckScrollability();

    window.addEventListener('resize', handleCheckScrollability);
    return () => {
      window.removeEventListener('resize', handleCheckScrollability);
      if (recommenedRef!.current) {
        recommenedRef!.current.removeEventListener(
          'scroll',
          handleCheckScrollability,
        );
      }
      if (followRef!.current) {
        followRef!.current.removeEventListener(
          'scroll',
          handleCheckScrollability,
        );
      }
    };
  }, []);

  // API로 추천 강아지 목록을 가져오는 함수
  useEffect(() => {
    const fetchRecommenedList = async () => {
      try {
        const response = await getRecommendDogListApi(); // API 호출
        setRecommenedList(response.data); // 받아온 강아지 목록 상태 업데이트
      } catch (error) {
        setError('추천 강아지 목록을 불러오는 중 오류가 발생했습니다.');
        console.error('Error fetching recommened list:', error);
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchRecommenedList(); // 컴포넌트 렌더링 시 API 호출
  }, []);

  // API로 팔로우 목록을 가져오는 함수
  useEffect(() => {
    const fetchFollowList = async () => {
      try {
        const response = await followDogListApi(); // API 호출
        setFollowList(response.data); // 받아온 강아지 목록 상태 업데이트
      } catch (error) {
        setError('팔로우한 강아지 목록을 불러오는 중 오류가 발생했습니다.');
        console.error('Error fetching follow list:', error);
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchFollowList(); // 컴포넌트 렌더링 시 API 호출
  }, []);

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 UI
  }

  if (error) {
    return <div>{error}</div>; // 에러 발생 시 표시할 UI
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-11/12 mb-4">
        <div className=" font-semibold text-2xl m-2 mb-3">
          😀 맞춤 입양 추천
        </div>
        {cardList.map((donationInfo) => (
          <AdoptionCard
            key={donationInfo.id}
            id={donationInfo.id}
            dog={donationInfo.dog}
            duration={donationInfo.duration}
            category={donationInfo.category}
          />
        ))}
      </div>

      <div className="w-11/12 relative">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold list-title">
            😀 당신을 기다려요
          </div>
          <button
            onClick={handleRecommendListClick}
            className="text-s bg-base text-black font-semibold mr-4"
          >
            전체 보기
          </button>
        </div>
        {isRecommenedScrollable.left && (
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full">
            <img src={LeftArrow} className="w-6 h-6 opacity-50" />
          </div>
        )}
        <div
          ref={recommenedRef}
          className="mt-1 overflow-x-auto scrollbar-hide"
        >
          <div className="flex space-x-2">
            {recommenedList.map((dog) => (
              <div className="flex-none" key={dog.id}>
                <DogPreview
                  id={dog.id}
                  name={dog.name}
                  age={dog.age}
                  image={dog.image}
                  gender={dog.gender}
                  species={dog.species}
                />
              </div>
            ))}
          </div>
        </div>
        {isRecommenedScrollable.right && (
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full">
            <img src={RightArrow} className="w-6 h-6 opacity-50" />
          </div>
        )}
      </div>

      <div className="w-11/12 relative">
        <div className="flex items-center justify-between">
          <div className=" text-lg font-semibold list-title">
            😀 내가 팔로우 하는 강아지
          </div>
          <button
            onClick={handleFollowListClick}
            className="text-s bg-base text-black font-semibold mr-4"
          >
            전체 보기
          </button>
        </div>

        {isFollowScrollable.left && (
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full">
            <img src={LeftArrow} className="w-6 h-6 opacity-50" />
          </div>
        )}
        <div ref={followRef} className="mt-1 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-2">
            {followList.length > 0 ? (
              followList.map((dog) => (
                <div className="flex-none" key={dog.id}>
                  <DogPreview
                    id={dog.id}
                    name={dog.name}
                    age={dog.age}
                    image={dog.image}
                    gender={dog.gender}
                    species={dog.species}
                  />
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>
        </div>
        {isFollowScrollable.right && (
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full">
            <img src={RightArrow} className="w-6 h-6 opacity-50" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdoptionPage;
