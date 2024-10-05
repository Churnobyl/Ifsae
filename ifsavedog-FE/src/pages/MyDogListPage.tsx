import { useState } from 'react';
import DogPreviewCardList from '@/components/common/DogPreviewCardList';
import SearchComponent from '@/components/common/Search';
import testImage from '@/assets/logo.webp';

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
];

const MyDogListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // [TODO]
  // - API 연결 이후 setDogList 추가하여 리스트 갱신 기능 추가
  const [dogList] = useState(exampleDogList);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between items-center px-4 py-4 bg-white shadow-md">
        <h1 className="text-lg font-semibold text-gray-700">
          센터 강아지 관리{' '}
          <span className="text-green-500">{dogList.length}</span>
        </h1>
      </header>

      <div>
        <SearchComponent
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
      </div>

      <div className="p-4">
        <DogPreviewCardList dogList={dogList} />
      </div>
    </div>
  );
};

export default MyDogListPage;
