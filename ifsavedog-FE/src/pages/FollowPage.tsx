import DogPreviewCardList from '@/components/common/DogPreviewCardList';
import testImage from '@/assets/logo.webp';
import { DogDetailType } from '@/types/dog/DogDetailType';

const exampleDogList = [
  {
    id: 1,
    name: '루루',
    location: '다리 밑에서 발견',
    gender: '중성화',
    breed: '믹스',
    age: 1,
    image: testImage,
  },
  {
    id: 2,
    name: '코코',
    location: '공원에서 발견',
    gender: '남',
    breed: '푸들',
    age: 1,
    image: testImage,
  },
  {
    id: 3,
    name: '보리',
    location: '강가에서 발견',
    gender: '여',
    breed: '믹스',
    age: 2,
    image: testImage,
  },
] as DogDetailType[];

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
