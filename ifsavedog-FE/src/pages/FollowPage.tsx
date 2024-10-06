import DogPreviewCardList from '@/components/common/DogPreviewCardList';
import testImage from '@/assets/logo.webp';
import { DogType } from '@/types/dog/DogType';

const exampleDogList = [
  {
    id: 1,
    name: '루루',
    age: 1,
    gender: 'FEMALE',
    species: '포메라니안',
    image: testImage,
  },
  {
    id: 2,
    name: '코코',
    age: 1,
    gender: 'MALE',
    species: '푸들',
    image: testImage,
  },
  {
    id: 3,
    name: '보리',
    age: 2,
    gender: 'FEMALE',
    species: '믹스',
    image: testImage,
  },
] as DogType[];

const FollowPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between items-center px-4 py-4 bg-white shadow-md">
        <h1 className="text-lg font-semibold text-gray-700">
          팔로우한 친구{' '}
          <span className="text-green-500">{exampleDogList.length}</span>
        </h1>
      </header>

      <div className="p-4">
        <DogPreviewCardList dogList={exampleDogList} />
      </div>
    </div>
  );
};

export default FollowPage;
