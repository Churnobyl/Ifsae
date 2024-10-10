import { DogType } from '@/types/dog/DogType';
import DogFaces from '../mungtsu/selectPanel/DogFaces';

interface MainPrevVideoProps {
  id: number;
  thumbnailUrl: string;
  like: number;
  title: string;
  dogs: DogType[];
}

const MainPrevVideo = ({
  //   id,
  thumbnailUrl,
  like,
  title,
  dogs,
}: MainPrevVideoProps) => {
  const dogNames = dogs.map((dog) => dog.name).join(' • ');
  const truncatedDogNames =
    dogNames.length > 20 ? `${dogNames.slice(0, 17)}...` : dogNames;

  const dogFacesData = dogs.map((dog) => ({
    dogId: dog.id,
    imgUrl: dog.image,
  }));

  return (
    <div className="w-full bg-lightGray rounded-md m-4 shadow-lg">
      <div>
        {/* 비디오 썸네일 */}
        <div className="w-full h-64 overflow-hidden rounded-md mb-2">
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover bg-main"
          />
        </div>

        {/* 비디오 정보 */}
        <div className="w-full flex flex-col">
          <div className="w-full flex items-start">
            <DogFaces dogs={dogFacesData} />
          </div>
          <div className="p-2 pt-0">
            <div className="text-lg font-bold mb-1">{title}</div>

            <div className="flex flex-row items-center justify-between text-sm">
              <div>{truncatedDogNames}</div>
              <div>👍 {like}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPrevVideo;
