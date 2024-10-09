interface DogMiniProfileProps {
  id?: number;
  profileImgUrl: string;
  name: string;
}

const DogMiniProfile = ({ profileImgUrl, name }: DogMiniProfileProps) => {
  return (
    <div className="py-2 mx-1 w-full h-full flex flex-col items-center justify-center">
      <img
        src={profileImgUrl}
        alt={`${name}'s profile`}
        className="rounded-full w-11 h-11 mx-2"
      />
      <div className="text-xs flex justify-center overflow-hidden text-ellipsis">
        강아지 이름
      </div>
    </div>
  );
};

export default DogMiniProfile;
