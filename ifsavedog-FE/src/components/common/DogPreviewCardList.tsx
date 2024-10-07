import DogPreviewCard from '@/components/common/DogPreviewCard';
import { DogType } from '@/types/dog/DogType';

interface DogList {
  dogList: DogType[];
}

const DogPreviewCardList = ({ dogList }: DogList) => {
  return (
    <div className="space-y-4">
      {dogList.map((dog) => (
        <DogPreviewCard key={dog.id} dog={dog} />
      ))}
    </div>
  );
};

export default DogPreviewCardList;
