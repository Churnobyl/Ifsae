import VideoCard from './VideoCard';
import DefaultThumbnail from '@/assets/running-dog.png';

const VideoList = () => {
  const videoData = Array(10).fill({
    videoId: 1234,
    thumbnailUrl: DefaultThumbnail,
    title: '산책하는 강아지',
    isOner: true,
  });

  return (
    <div className="w-full p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videoData.map((video) => (
        <VideoCard
          videoId={video.id}
          thumbnailUrl={video.thumbnailUrl}
          title={video.title}
          isOner={video.isOner}
        />
      ))}
    </div>
  );
};

export default VideoList;
