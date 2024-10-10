import ProfileCard from '@/components/common/ProfileCard';
import CenterProfileImg from '@/assets/center-profile.png';
import { ShelterDetailType } from '@/types/shelter/ShelterDetailType';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DogType } from '@/types/dog/DogType';
import DogPreview from '@/components/common/DogPreviewBox';
import LeftArrow from '@/assets/icon/leftarrow.svg';
import RightArrow from '@/assets/icon/rightarrow.svg';
import VideoCard from '@/components/video/VideoCard';
import { getShelterDetailApi } from '@/apis/shelter/shelterApi'; // API import
import { shelterDogListApi } from '@/apis/dog/dogApi';
import { shelterPostListApi } from '@/apis/post/postApi';
import { PostPreviewType } from '@/types/post/PostPreviewType';

const CenterDetailPage = () => {
  const { id } = useParams<{ id: string }>(); // URL에서 shelter ID 파라미터를 가져옴
  const [shelterDetail, setShelterDetail] = useState<ShelterDetailType | null>(
    null,
  ); // 센터 상세 정보
  const [dogList, setDogList] = useState<DogType[]>([]); // 강아지 목록 정보
  const [videoList, setVideoList] = useState<PostPreviewType[]>([]); // 영상 리스트 정보
  const [loadingShelter, setLoadingShelter] = useState(true); // 센터 상세 정보 로딩 상태
  const [loadingDogs, setLoadingDogs] = useState(true); // 강아지 목록 로딩 상태
  const [loadingVideos, setLoadingVideos] = useState(true); // 영상 목록 로딩 상태
  const dogRef = useRef<HTMLDivElement | null>(null); // 강아지 목록 Ref
  const videoRef = useRef<HTMLDivElement | null>(null); // 비디오 목록 Ref

  const [isDogScrollable, setIsDogScrollable] = useState({
    left: false,
    right: false,
  });
  const [isVideoScrollable, setIsVideoScrollable] = useState({
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

  // 센터 상세 정보 가져오기
  useEffect(() => {
    const fetchShelterDetail = async () => {
      setLoadingShelter(true);
      try {
        const shelterResponse = await getShelterDetailApi(Number(id));
        setShelterDetail(shelterResponse.data);
      } catch (error) {
        console.error('Failed to fetch shelter details:', error);
      } finally {
        setLoadingShelter(false);
      }
    };

    if (id) {
      fetchShelterDetail();
    }
  }, [id]);

  // 강아지 목록 가져오기
  useEffect(() => {
    const fetchDogList = async () => {
      setLoadingDogs(true);
      try {
        const dogResponse = await shelterDogListApi(Number(id));
        setDogList(dogResponse.data);
      } catch (error) {
        console.error('Failed to fetch dog list:', error);
      } finally {
        setLoadingDogs(false);
      }
    };

    if (id) {
      fetchDogList();
    }
  }, [id]);

  // 영상 리스트 가져오기
  useEffect(() => {
    const fetchVideoList = async () => {
      setLoadingVideos(true);
      try {
        const videoResponse = await shelterPostListApi(Number(id));
        setVideoList(videoResponse.data);
      } catch (error) {
        console.error('Failed to fetch video list:', error);
      } finally {
        setLoadingVideos(false);
      }
    };

    if (id) {
      fetchVideoList();
    }
  }, [id]);

  useEffect(() => {
    const handleCheckScrollability = () => {
      checkScrollable(dogRef, setIsDogScrollable);
      checkScrollable(videoRef, setIsVideoScrollable);
    };

    if (dogRef.current) {
      dogRef.current.addEventListener('scroll', handleCheckScrollability);
    }
    if (videoRef.current) {
      videoRef.current.addEventListener('scroll', handleCheckScrollability);
    }

    handleCheckScrollability();
    window.addEventListener('resize', handleCheckScrollability);

    return () => {
      window.removeEventListener('resize', handleCheckScrollability);
      if (dogRef!.current) {
        dogRef!.current.removeEventListener('scroll', handleCheckScrollability);
      }
      if (videoRef!.current) {
        videoRef!.current.removeEventListener(
          'scroll',
          handleCheckScrollability,
        );
      }
    };
  }, [shelterDetail]);

  if (loadingShelter) {
    return <div>센터 정보를 불러오는 중...</div>;
  }

  if (!shelterDetail) {
    return <div>센터 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <ProfileCard
        profileImgUrl={shelterDetail.shelterProfileImg || CenterProfileImg}
        name={shelterDetail.name}
        address={shelterDetail.address}
        phone={shelterDetail.phone}
        content={shelterDetail.content}
      />

      <div className="w-11/12 relative">
        {/** 영상 리스트 */}
        <div>
          <div className="text-lg font-semibold">😀 영상 더보기</div>

          {isVideoScrollable.left && (
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full">
              <img src={LeftArrow} className="w-6 h-6 opacity-50" />
            </div>
          )}

          <div ref={videoRef} className="mt-1 overflow-x-auto scrollbar-hide">
            <div className="flex space-x-2">
              {loadingVideos ? (
                <div>영상을 불러오는 중...</div>
              ) : (
                videoList.map((video) => (
                  <div className="flex-none" key={video.id}>
                    <VideoCard
                      videoId={video.id}
                      thumbnailUrl={video.imageUrl}
                      title={video.title}
                      type="shelterVideo"
                    />
                  </div>
                ))
              )}
            </div>
          </div>

          {isVideoScrollable.right && (
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full">
              <img src={RightArrow} className="w-6 h-6 opacity-50" />
            </div>
          )}
        </div>
      </div>

      <div className="w-11/12 relative">
        <div>
          <div className="text-lg font-semibold list-title">
            😀 강아지 더보기
          </div>

          {isDogScrollable.left && (
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full">
              <img src={LeftArrow} className="w-6 h-6 opacity-50" />
            </div>
          )}

          <div
            ref={dogRef}
            className="mt-1 overflow-x-auto scrollbar-hide relative"
          >
            <div className="flex space-x-2">
              {loadingDogs ? (
                <div>강아지 목록을 불러오는 중...</div>
              ) : (
                dogList.map((dog) => (
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
              )}
            </div>
          </div>

          {isDogScrollable.right && (
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2  rounded-full">
              <img src={RightArrow} className="w-6 h-6 opacity-50" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CenterDetailPage;
