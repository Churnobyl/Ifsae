import DogPreviewCardList from '@/components/common/DogPreviewCardList';
import testImage from '@/assets/logo.webp';

const exampleDogList = [
  {
    id: 1,
    name: '루루',
    location: '다리 밑에서 발견',
    gender: '중성화',
    breed: '믹스',
    age: '1살',
    image: testImage,
  },
  {
    id: 2,
    name: '코코',
    location: '공원에서 발견',
    gender: '남',
    breed: '푸들',
    age: '1살',
    image: testImage,
  },
  {
    id: 3,
    name: '보리',
    location: '강가에서 발견',
    gender: '여',
    breed: '믹스',
    age: '2살',
    image: testImage,
  },
];

const FollowPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between items-center px-4 py-4 bg-white shadow-md">
        <h1 className="text-lg font-semibold text-gray-700">
          팔로우한 친구{' '}
          <span className="text-green-500">{exampleDogList.length}</span>
        </h1>
        <button className="px-4 py-2 bg-green-500 text-white rounded-md">
          삭제하기
        </button>
      </header>

      <div className="p-4">
        <DogPreviewCardList dogList={exampleDogList} />
      </div>
    </div>
  );
};

export default FollowPage;
