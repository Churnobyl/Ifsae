import { forwardRef, useEffect, useRef, useState } from 'react';
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
        className="w-full h-full mb-4 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ zIndex: 10, position: 'relative' }}
        ref={ref}
      >
        <div
          className="video w-full h-full flex justify-center items-center bg-veryBlack z-20"
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
            <SelectIcon label={String(likeCnt)} icon={AiOutlineLike} />{' '}
            <SelectIcon label={String(comments.length)} icon={FaCommentDots} />{' '}
            <SelectIcon label={'공유'} icon={FaShareAlt} />
            <DogFaces direction={'RIGHT'} dogs={dogFaces} />
          </div>
        </div>
      </div>
    );
  },
);

export default MungtsuBox;
