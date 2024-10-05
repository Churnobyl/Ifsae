import DefaultThumbnail from '@/assets/running-dog.png';
import DotMenu from '@/assets/icon/dot-menu.svg';

// props 타입 정의
interface VideoCardProps {
  videoId: string;
  thumbnailUrl?: string | null;
  title: string;
}

const VideoCard = ({ videoId, thumbnailUrl, title }: VideoCardProps) => {
  const thumbnailSrc = thumbnailUrl ? thumbnailUrl : DefaultThumbnail;

  return (
    <div
      className="w-[140px] h-[130px] rounded-lg overflow-hidden bg-white"
      id={videoId}
    >
      <img
        src={thumbnailSrc}
        alt="thumbnail"
        className="w-full h-[98px] rounded-lg object-cover"
      />
      <div className="py-1 flex justify-between items-center">
        <p className="text-[10px] font-medium text-black">{title}</p>
        <button className="">
          <div>
            <img src={DotMenu} alt="menu" className="w-2 h-4" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
