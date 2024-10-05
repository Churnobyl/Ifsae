import DogPreviewCard from '@/components/common/DogPreviewCard';
import { DogDetailType } from '@/types/dog/DogDetailTye';

interface DogList {
  dogList: DogDetailType[];
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
