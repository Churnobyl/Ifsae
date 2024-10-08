import VideoCard from '@/components/video/VideoCard';

// Video 타입 정의
interface Video {
  videoId: number;
  thumbnailUrl?: string | null;
  title: string;
  type: 'likeVideo' | 'myVideo' | 'shelterVideo';
}

interface VideoListProps {
  videoList: Video[]; // videoList를 props로 받음
}

const VideoList = ({ videoList }: VideoListProps) => {
  return (
    <div className="w-full flex justify-center">
      {' '}
      {/* 그리드를 화면 가운데 정렬 */}
      <div className="grid grid-cols-2 gap-4 w-full">
        {' '}
        {/* 가로 중앙 정렬 및 고정된 너비 */}
        {videoList.map((video) => (
          <VideoCard
            key={video.videoId} // 각 컴포넌트에 고유한 key 추가
            videoId={video.videoId} // videoId로 수정
            thumbnailUrl={video.thumbnailUrl}
            title={video.title}
            type={video.type}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoList;
