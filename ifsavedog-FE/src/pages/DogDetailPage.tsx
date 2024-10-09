import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DogDetail from '@/components/dog/DogDetail';
import DogDetailButtonList from '@/components/dog/DogDetailButtonList';
import PostPreviewBoxList from '@/components/dog/PostPreviewBoxList';
import { DogDetailType } from '@/types/dog/DogDetailType';
import { dogDetailApi, dogPostApi } from '@/apis/dog/dogApi'; // API import

const DogDetailPage = () => {
  const { id } = useParams<{ id: string }>(); // URL에서 id 파라미터를 가져옴
  const [dog, setDog] = useState<DogDetailType | null>(null); // 강아지 정보를 저장할 상태
  const [posts, setPosts] = useState([]); // 게시글 목록 상태 추가
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 강아지 정보와 게시글을 불러오는 useEffect
  useEffect(() => {
    const fetchDogDetailAndPosts = async () => {
      try {
        // 강아지 정보 가져오기
        const response = await dogDetailApi(Number(id));
        setDog(response.data);

        // 강아지 게시글 목록 가져오기
        const postResponse = await dogPostApi(Number(id)); // 게시글 목록 API 호출
        setPosts(postResponse.data); // 게시글 목록을 상태에 저장

        setLoading(false); // 로딩 완료
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // 오류 발생 시에도 로딩 완료로 전환
      }
    };

    fetchDogDetailAndPosts(); // 강아지 정보 및 게시글 목록을 불러오는 함수 호출
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 UI
  }

  if (!dog) {
    return <div>강아지 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <div className="overflow-x-hidden overflow-y-auto">
      <div className="max-w-xl mx-auto p-6 pt-2">
        <DogDetail dog={dog} />
        <DogDetailButtonList
          dogStatus={dog.dogStatus}
          dogId={dog.id}
          dog={dog}
        />{' '}
        {/* dog 정보 전달 */}
      </div>
      <div className="w-full px-0 mx-0">
        <PostPreviewBoxList posts={posts} />
      </div>
    </div>
  );
};

export default DogDetailPage;
