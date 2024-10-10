import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import DogFaces from '@/components/mungtsu/selectPanel/DogFaces';
import SelectIcon from '@/components/mungtsu/selectPanel/SelectIcon';
import config from '@/constants/Environments';
import { MungtsuResponseType } from '@/types/post/MungtsuResponseType';
import { AiOutlineLike } from 'react-icons/ai';
import { FaShareAlt } from 'react-icons/fa';
import {
  FaCommentDots,
  FaRegCirclePause,
  FaRegCirclePlay,
} from 'react-icons/fa6';
import {
  checkPostLikeApi,
  createPostLikeApi,
  deletePostLikeApi,
} from '@/apis/post/postApi';

interface DogFace {
  dogId: number;
  imgUrl: string;
}

const MungtsuBox = forwardRef<HTMLDivElement, { slide: MungtsuResponseType }>(
  ({ slide }, ref) => {
    const { title, videoUrl, shelter, dogs, comments, likeCnt } = slide;
    const dogFaces: DogFace[] = dogs.map((dog) => ({
      dogId: dog.id,
      imgUrl: dog.image,
    }));

    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [progress, setProgress] = useState(0);
    const [liked, setLiked] = useState(false); // 좋아요 상태 관리
    const [likeCount, setLikeCount] = useState<number>(likeCnt);

    const handlePlayPause = () => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    };

    // 좋아요 상태 확인 함수
    const fetchLikeStatus = useCallback(async () => {
      try {
        const likeStatus = await checkPostLikeApi(slide.id); // 좋아요 상태 확인 API 호출
        setLiked(likeStatus.data.isLiked); // 좋아요 상태 저장 (true/false)
      } catch (error) {
        console.error('좋아요 상태 확인 중 오류 발생:', error);
      }
    }, [slide.id]);

    // 페이지가 로드될 때 게시물 정보와 좋아요 상태 불러오기
    useEffect(() => {
      if (slide.id) {
        fetchLikeStatus(); // 좋아요 상태 확인
      }
    }, [fetchLikeStatus, slide.id]);

    // 좋아요 상태 변경 핸들러
    const likeHandler = async () => {
      try {
        if (liked) {
          await deletePostLikeApi(slide.id); // 좋아요 취소 API 호출
          setLiked(false); // 좋아요 상태 변경
          setLikeCount((prevCount) => prevCount - 1); // 좋아요 수 감소
        } else {
          await createPostLikeApi(slide.id); // 좋아요 추가 API 호출
          setLiked(true); // 좋아요 상태 변경
          setLikeCount((prevCount) => prevCount + 1); // 좋아요 수 증가
        }
      } catch (error) {
        console.error('좋아요 상태 변경 중 오류 발생:', error);
      }
    };

    useEffect(() => {
      const videoElement = videoRef.current;

      const handleTimeUpdate = () => {
        if (videoElement) {
          const progressPercentage =
            (videoElement.currentTime / videoElement.duration) * 100;
          setProgress(progressPercentage);
        }
      };

      const handleVideoEnded = () => {
        setProgress(0);
      };

      if (videoElement) {
        videoElement.addEventListener('timeupdate', handleTimeUpdate);
        videoElement.addEventListener('ended', handleVideoEnded);
      }

      return () => {
        if (videoElement) {
          videoElement.removeEventListener('timeupdate', handleTimeUpdate);
          videoElement.removeEventListener('ended', handleVideoEnded);
        }
      };
    }, []);

    useEffect(() => {
      const videoElement = videoRef.current;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (videoElement) {
                videoElement.currentTime = 0;
                videoElement.play();
                setIsPlaying(true);
              }
            } else {
              if (videoElement) {
                videoElement.pause();
                setIsPlaying(false);
              }
            }
          });
        },
        { threshold: 0.5 },
      );

      if (videoElement) {
        observer.observe(videoElement);
      }

      return () => {
        if (videoElement) {
          observer.unobserve(videoElement);
        }
      };
    }, []);

    useEffect(() => {
      let timeoutId: NodeJS.Timeout;

      const showButtonOnMouseMove = () => {
        setShowButton(true);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setShowButton(false);
        }, 2000);
      };

      window.addEventListener('mousemove', showButtonOnMouseMove);

      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('mousemove', showButtonOnMouseMove);
      };
    }, []);

    useEffect(() => {
      if (isHovered) {
        setShowButton(true);
        const timeoutId = setTimeout(() => {
          setShowButton(false);
        }, 2000);

        return () => {
          clearTimeout(timeoutId);
        };
      }
    }, [isHovered]);

    return (
      <div
        className="relative w-full h-full mb-4 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ zIndex: 10 }}
        ref={ref}
      >
        <div
          className="absolute video w-full h-full flex justify-center items-center bg-veryBlack z-20"
          onClick={handlePlayPause}
        >
          <video ref={videoRef} className="w-full h-full" muted loop>
            <source src={config.s3VideoUrl + videoUrl} />
          </video>
          <button
            className={`absolute text-white text-2xl transition-opacity duration-300 ${
              showButton || !isPlaying ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 30,
              pointerEvents: showButton || !isPlaying ? 'auto' : 'none',
            }}
          >
            {isPlaying ? (
              <FaRegCirclePause size={40} />
            ) : (
              <FaRegCirclePlay size={40} />
            )}
          </button>
          <div
            className="absolute bottom-0 left-0 h-1 bg-red transition-width duration-200 ease-linear"
            style={{ width: `${progress}%`, zIndex: 40 }}
          ></div>
        </div>

        <div
          className="select-panel absolute w-full h-full flex items-end justify-center pointer-events-none"
          style={{ zIndex: 50 }}
        >
          <div className="flex flex-col p-4 w-full justify-stretch">
            <div className={'flex flex-row text-white items-center'}>
              <div className="w-8">
                <img
                  src={shelter.profileImgUrl}
                  className={'w-full h-full object-cover rounded-full'}
                  alt=""
                />
              </div>
              <div>{shelter.name}</div>
            </div>
            <div className={'text-white overflow-hidden'}>{title}</div>
          </div>
          <div className={'flex flex-col items-end p-4 gap-4'}>
            <div
              onClick={(event) => {
                event.stopPropagation();
                likeHandler();
              }}
            >
              <SelectIcon
                label={String(likeCount)}
                icon={AiOutlineLike}
                color={liked ? 'blue' : 'white'}
              />
            </div>
            <div onClick={(event) => event.stopPropagation()}>
              <SelectIcon
                label={String(comments.length)}
                icon={FaCommentDots}
              />
            </div>
            <div onClick={(event) => event.stopPropagation()}>
              <SelectIcon label={'공유'} icon={FaShareAlt} />
            </div>
            <div onClick={(event) => event.stopPropagation()}>
              <DogFaces direction={'RIGHT'} dogs={dogFaces} />
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default MungtsuBox;
