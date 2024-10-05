import React, { useEffect, useRef, useState } from 'react';
import AdoptionCard from '@/components/adoption/AdoptionCard';
import DogPreview from '@/components/common/DogPreviewBox';
import TestImage from '@/assets/logo.webp';
import LeftArrow from '@/assets/icon/scroll-arrow-left.svg';
import RightArrow from '@/assets/icon/scroll-arrow-right.svg';
import { DogType } from '@/types/dog/DogType';

interface DonationInfo {
  name: string;
  age: number;
  duration: number;
  image: string;
  category: 'adoption' | 'donation';
}

const AdoptionPage = () => {
  const cardList: DonationInfo[] = [
    {
      name: '루루',
      age: 2,
      duration: 3,
      image: TestImage,
      category: 'adoption',
    },
  ];

  const recommenedList: DogType[] = [
    { id: 1, name: '초코', age: 1, image: TestImage },
    { id: 2, name: '코코', age: 2, image: TestImage },
    { id: 3, name: '보리', age: 3, image: TestImage },
    { id: 4, name: '바니', age: 4, image: TestImage },
    { id: 5, name: '말티', age: 5, image: TestImage },
  ];

  const followList: DogType[] = [
    { id: 1, name: '초코', age: 1, image: TestImage },
    { id: 2, name: '코코', age: 2, image: TestImage },
    { id: 3, name: '보리', age: 3, image: TestImage },
    { id: 4, name: '바니', age: 4, image: TestImage },
    { id: 5, name: '말티', age: 5, image: TestImage },
  ];

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

  return (
    <div>
      <h2 className="text-3xl">😀 맞춤 입양 추천</h2>
      <div className="p-4">
        <div>
          {cardList.map((donationInfo) => (
            <AdoptionCard
              key={donationInfo.name}
              name={donationInfo.name}
              age={donationInfo.age}
              duration={donationInfo.duration}
              image={donationInfo.image}
              category={donationInfo.category}
            />
          ))}
        </div>

        <div className="relative">
          <div className="list-title">😀 당신을 기다려요</div>
          {isRecommenedScrollable.left && (
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full">
              <img src={LeftArrow} className="w-6 h-6 opacity-50" />
            </div>
          )}
          {isRecommenedScrollable.right && (
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full">
              <img src={RightArrow} className="w-6 h-6 opacity-50" />
            </div>
          )}
          <div
            ref={recommenedRef}
            className="mt-4 overflow-x-auto scrollbar-hide"
          >
            <div className="flex space-x-4">
              {recommenedList.map((dog) => (
                <div className="flex-none w-1/3" key={dog.name}>
                  <DogPreview
                    id={dog.id}
                    name={dog.name}
                    age={dog.age}
                    image={dog.image}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="list-title">😀 내가 팔로우하는 강아지</div>
          {isFollowScrollable.left && (
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full">
              <img src={LeftArrow} className="w-6 h-6 opacity-50" />
            </div>
          )}
          {isFollowScrollable.right && (
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full">
              <img src={RightArrow} className="w-6 h-6 opacity-50" />
            </div>
          )}
          <div ref={followRef} className="mt-4 overflow-x-auto scrollbar-hide">
            <div className="flex space-x-4">
              {followList.map((dog) => (
                <div className="flex-none w-1/3" key={dog.name}>
                  <DogPreview
                    id={dog.id}
                    name={dog.name}
                    age={dog.age}
                    image={dog.image}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptionPage;
