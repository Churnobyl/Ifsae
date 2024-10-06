import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DogDetail from '@/components/dog/DogDetail';
import DogDetailButtonList from '@/components/dog/DogDetailButtonList';
import PostPreviewBoxList from '@/components/dog/PostPreviewBoxList';
import { DogDetailType } from '@/types/dog/DogDetailType';
import { dogDetailApi } from '@/apis/dog/dogApi'; // dogDetailApi import
import testImage from '@/assets/logo.webp';

const DogDetailPage = () => {
  const { id } = useParams<{ id: string }>(); // URL에서 id 파라미터를 가져옴
  const [dog, setDog] = useState<DogDetailType | null>(null); // 강아지 정보를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 더미 게시글 데이터
  const posts = [
    { id: 1, title: '포스팅 1', imageUrl: testImage },
    { id: 2, title: '포스팅 2', imageUrl: testImage },
    { id: 3, title: '포스팅 3', imageUrl: testImage },
    { id: 4, title: '포스팅 4', imageUrl: testImage },
    { id: 5, title: '포스팅 5', imageUrl: testImage },
    { id: 6, title: '포스팅 6', imageUrl: testImage },
  ];

  // 강아지 정보를 불러오는 useEffect
  useEffect(() => {
    const fetchDogDetail = async () => {
      try {
        // API 호출을 통해 강아지 상세 정보를 가져옴
        const response = await dogDetailApi(Number(id)); // 예시로 id가 1인 강아지 정보를 가져옴
        setDog(response.data); // API 응답을 dog 상태에 저장
        setLoading(false); // 로딩 완료
        console.log(response.data.dogStatus);
      } catch (error) {
        console.error('Error fetching dog detail:', error);
        setLoading(false);
      }
    };

    fetchDogDetail(); // 강아지 정보만 불러오기
  }, [id]); // 빈 배열: 컴포넌트가 처음 렌더링될 때 한 번만 호출

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 UI
  }

  if (!dog) {
    return <div>강아지 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <div className="overflow-x-hidden overflow-y-auto">
      <div className="max-w-xl mx-auto p-6 pt-2">
        <DogDetail dog={dog} />{' '}
        {/* API로 불러온 강아지 정보를 DogDetail 컴포넌트에 전달 */}
        <DogDetailButtonList
          follow={false} // 팔로우 여부 전달
          dogStatus={dog.dogStatus} // 강아지 상태 전달
        />
      </div>
      <div className="w-full px-0 mx-0">
        <PostPreviewBoxList posts={posts} />{' '}
        {/* 더미 게시글 목록을 그대로 사용 */}
      </div>
    </div>
  );
};

export default DogDetailPage;
