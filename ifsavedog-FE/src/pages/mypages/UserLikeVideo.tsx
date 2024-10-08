import VideoList from '@/components/video/VideoList';
import DefaultThumbnail from '@/assets/running-dog.png'; // 더미 데이터를 위한 이미지 임포트

const UserLikeVideo = () => {
  // 더미 데이터 생성
  const videoData = Array(10).fill({
    videoId: '1234',
    thumbnailUrl: DefaultThumbnail,
    title: '산책하는 강아지',
    type: 'likeVideo',
  });

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="w-10/12 overflow-auto">
        <div className="flex flex-row justify-start items-center">
          <div className="py-2 mr-1 text-black font-semibold text-2xl">
            내가 좋아요 한 영상
          </div>
          <div className="py-3 text-black text-lg self-end">13</div>{' '}
          {/* 좋아요 한 영상 수 */}
        </div>

        <div>
          <VideoList videoList={videoData} /> {/* 더미 데이터 전달 */}
        </div>
      </div>
    </div>
  );
};

export default UserLikeVideo;
