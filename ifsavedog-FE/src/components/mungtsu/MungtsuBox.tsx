import DogFaces from '@/components/mungtsu/selectPanel/DogFaces';
import SelectIcon from '@/components/mungtsu/selectPanel/SelectIcon';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { FaShareAlt } from 'react-icons/fa';
import {
  FaCommentDots,
  FaRegCirclePause,
  FaRegCirclePlay,
} from 'react-icons/fa6';

const sampleUrl =
  'https://www.shutterstock.com/shutterstock/videos/1107237865/preview/stock-footage-portraits-of-happy-people-looking-at-camera-in-one-footage-beautiful-faces-of-young-women-and.mp4';

const MungtsuBox = () => {
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
      className="flex relative flex-col w-full h-full mb-4 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ zIndex: 10 }}
    >
      <div
        className="video w-full h-full flex justify-center items-center bg-veryBlack"
        onClick={handlePlayPause}
        style={{ zIndex: 20 }}
      >
        <video ref={videoRef} className="w-full h-full" muted loop>
          <source src={sampleUrl} />
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
        style={{ zIndex: 999 }}
      >
        <div className="flex flex-col p-4 w-full justify-stretch">
          <div className={'flex flex-row text-white items-center'}>
            <div className="w-8">
              <img
                src={'/src/assets/center-profile.png'}
                className={'w-full h-full object-cover rounded-full'}
                alt=""
              />
            </div>
            <div>아이조아보육원</div>
          </div>
          <div className={'text-white overflow-hidden'}>
            밥먹고 똥싸는 강아지 모음
          </div>
        </div>
        <div className={'flex flex-col items-end p-4 gap-4'}>
          <SelectIcon label={'50'} icon={AiOutlineLike} /> {/** 좋아요 */}
          <SelectIcon label={'40'} icon={FaCommentDots} /> {/** 댓글 */}
          <SelectIcon label={'공유'} icon={FaShareAlt} /> {/** 공유 */}
          <DogFaces />
        </div>
      </div>
    </div>
  );
};

export default MungtsuBox;
