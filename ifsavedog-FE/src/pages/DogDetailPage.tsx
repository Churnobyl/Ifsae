import DogDetail from '@/components/dog/DogDetail';
import DogDetailButtonList from '@/components/dog/DogDetailButtonList';
import PostPreviewBoxList from '@/components/dog/PostPreviewBoxList';
import testImage from '@/assets/logo.webp';
import { DogDetailType } from '@/types/dog/DogDetailType';

const DogDetailPage = () => {
  const dog: DogDetailType = {
    id: 1,
    name: '루루',
    gender: 'FEMALE',
    species: '포메라니안',
    dogStatus: 'NOT_ADOPTED',
    age: 1,
    info: '활발하고 애교 많은 포메라니안입니다!',
    image: testImage,
    shelterId: 1,
    shelterName: '아이조아 요양보호소',
    followCnt: 1,
  };

  const posts = [
    { id: 1, title: '포스팅 1', imageUrl: testImage },
    { id: 2, title: '포스팅 2', imageUrl: testImage },
    { id: 3, title: '포스팅 3', imageUrl: testImage },
    { id: 4, title: '포스팅 4', imageUrl: testImage },
    { id: 5, title: '포스팅 5', imageUrl: testImage },
    { id: 6, title: '포스팅 6', imageUrl: testImage },
  ];

  return (
    <div className="overflow-x-hidden overflow-y-auto">
      {' '}
      {/* 가로 스크롤 제거 */}
      {/* DogDetail과 DogDetailButtonList는 중앙에 여백이 있음 */}
      <div className="max-w-xl mx-auto p-6 pt-2">
        <DogDetail dog={dog} />
        <DogDetailButtonList />
      </div>
      {/* PostPreviewBoxList는 여백 없이 꽉 차게 */}
      <div className="w-full px-0 mx-0">
        <PostPreviewBoxList posts={posts} />
      </div>
    </div>
  );
};

export default DogDetailPage;
