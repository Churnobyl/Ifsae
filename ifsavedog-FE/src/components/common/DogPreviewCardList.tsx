import DogPreviewCard from '@/components/common/DogPreviewCard';

interface Dog {
  id: number;
  name: string;
  location: string;
  gender: string;
  breed: string;
  age: number;
  image: string;
}

interface DogList {
  dogList: Dog[];
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
