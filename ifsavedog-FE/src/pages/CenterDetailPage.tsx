import ProfileCard from '@/components/common/ProfileCard';
import CenterProfileImg from '@/assets/center-profile.png';
import { ShelterDetailType } from '@/types/shelter/ShelterDetailType';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DogType } from '@/types/dog/DogType';
import testImage from '@/assets/rolling-cottonball.jpg';
import DogPreview from '@/components/common/DogPreviewBox';
import LeftArrow from '@/assets/icon/leftarrow.svg';
import RightArrow from '@/assets/icon/rightarrow.svg';

const CenterDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [shelterDetail, setShelterDetail] = useState<ShelterDetailType | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  const dogList = [
    {
      id: 1,
      name: '루루',
      age: 1,
      gender: 'FEMALE',
      species: '포메라니안',
      image: testImage,
    },
    {
      id: 2,
      name: '코코',
      age: 1,
      gender: 'MALE',
      species: '푸들',
      image: testImage,
    },
    {
      id: 3,
      name: '보리',
      age: 2,
      gender: 'FEMALE',
      species: '믹스',
      image: testImage,
    },
    // {
    //   id: 4,
    //   name: '보리',
    //   age: 2,
    //   gender: 'FEMALE',
    //   species: '믹스',
    //   image: testImage,
    // },
  ] as DogType[];

  const dogRef = useRef<HTMLDivElement | null>(null);

  const [isDogScrollable, setIsDogScrollable] = useState({
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
    const getShelterDetail = async () => {
      setLoading(true);

      try {
        const response = await axios.get<ShelterDetailType>(
          `/api/shelters/${id}`,
        );
        setShelterDetail(response.data);
      } catch (error) {
        console.error('Failed to fetch shelter details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getShelterDetail();
    }
  }, [id]);

  useEffect(() => {
    const handleCheckScrollability = () => {
      checkScrollable(dogRef, setIsDogScrollable);
    };

    if (dogRef.current) {
      dogRef.current.addEventListener('scroll', handleCheckScrollability);
    }

    handleCheckScrollability();

    window.addEventListener('resize', handleCheckScrollability);

    return () => {
      window.removeEventListener('resize', handleCheckScrollability);

      if (dogRef.current) {
        dogRef.current.removeEventListener('scroll', handleCheckScrollability);
      }
    };
  }, [shelterDetail]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!shelterDetail) {
    return <div>센터 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <ProfileCard
        profileImgUrl={shelterDetail.shelterProfileImg || CenterProfileImg}
        name={shelterDetail.name || '테스트용 텍스트'}
        address={shelterDetail.address || '테스트용 텍스트'}
        phone={shelterDetail.phone || '테스트용 텍스트'}
        content={shelterDetail.content || '테스트용 텍스트'}
      />

      <div className="w-11/12 relative">
        <div className="text-lg font-semibold list-title">😀 강아지</div>
        {isDogScrollable.left && (
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full z-10 cursor-pointer">
            <img src={LeftArrow} className="w-6 h-6 opacity-50" />
          </div>
        )}
        {isDogScrollable.right && (
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full z-10 cursor-pointer">
            <img src={RightArrow} className="w-6 h-6 opacity-50" />
          </div>
        )}
        <div
          ref={dogRef}
          className="mt-1 overflow-x-auto scrollbar-hide relative"
        >
          <div className="flex space-x-2">
            {dogList.map((dog) => (
              <div className="flex-none" key={dog.id}>
                <DogPreview
                  id={dog.id}
                  name={dog.name}
                  age={dog.age}
                  image={dog.image}
                  gender={'FEMALE'}
                  species={''}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CenterDetailPage;
