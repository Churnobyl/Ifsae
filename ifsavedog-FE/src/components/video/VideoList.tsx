import VideoCard from './VideoCard';
import DefaultThumbnail from '@/assets/running-dog.png';

const VideoList = () => {
  const videoData = Array(10).fill({
    videoId: 1234,
    thumbnailUrl: DefaultThumbnail,
    title: '산책하는 강아지',
  });

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {videoData.map((video) => (
        <VideoCard
          videoId={video.id}
          thumbnailUrl={video.thumbnailUrl}
          title={video.title}
        />
      ))}
    </div>
  );
};

export default VideoList;
