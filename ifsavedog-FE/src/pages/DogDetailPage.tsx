import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DogDetail from '@/components/dog/DogDetail';
import DogDetailButtonList from '@/components/dog/DogDetailButtonList';
import PostPreviewBoxList from '@/components/dog/PostPreviewBoxList';
import { DogDetailType } from '@/types/dog/DogDetailType';
import {
  dogDetailApi,
  dogPostApi,
  followApi,
  unFollowApi,
  checkFollowApi,
} from '@/apis/dog/dogApi'; // API import

const DogDetailPage = () => {
  const { id } = useParams<{ id: string }>(); // URL에서 id 파라미터를 가져옴
  const [dog, setDog] = useState<DogDetailType | null>(null); // 강아지 정보를 저장할 상태
  const [posts, setPosts] = useState([]); // 게시글 목록 상태 추가
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [isFollowed, setIsFollowed] = useState(false); // 팔로우 상태 관리 추가
  const [isProcessing, setIsProcessing] = useState(false); // API 요청 중인지 여부 관리

  // 팔로우 상태 변경 함수
  const toggleFollow = async () => {
    if (isProcessing) return; // 중복 요청 방지

    setIsProcessing(true); // 요청 시작
    try {
      if (isFollowed) {
        await unFollowApi(Number(id)); // 언팔로우 API 호출
      } else {
        await followApi(Number(id)); // 팔로우 API 호출
      }
      setIsFollowed(!isFollowed); // 팔로우 상태 업데이트
    } catch (error) {
      console.error('팔로우/언팔로우 중 오류 발생:', error);
    } finally {
      setIsProcessing(false); // 요청 완료
    }
  };

  // 강아지 정보와 팔로우 상태 및 게시글을 불러오는 useEffect
  useEffect(() => {
    const fetchDogDetailAndPosts = async () => {
      // 팔로우 상태 확인 함수 (처음 렌더링 시 호출)
      const fetchFollowStatus = async () => {
        try {
          const response = await checkFollowApi(Number(id)); // 팔로우 상태 확인 API 호출
          setIsFollowed(response.data.isFollowed); // 서버로부터 받은 팔로우 상태 업데이트
        } catch (error) {
          console.error('팔로우 상태를 확인하는 중 오류 발생:', error);
        }
      };

      try {
        // 강아지 정보 가져오기
        const response = await dogDetailApi(Number(id));
        setDog(response.data);

        // 팔로우 여부 확인
        await fetchFollowStatus();

        // 강아지 게시글 목록 가져오기
        const postResponse = await dogPostApi(Number(id)); // 게시글 목록 API 호출
        setPosts(postResponse.data); // 게시글 목록을 상태에 저장

        setLoading(false); // 로딩 완료
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // 오류 발생 시에도 로딩 완료로 전환
      }
    };

    fetchDogDetailAndPosts(); // 강아지 정보, 팔로우 상태 및 게시글 목록을 불러오는 함수 호출
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
          follow={isFollowed} // 팔로우 상태 전달
          dogStatus={dog.dogStatus}
          dogId={dog.id} // dogId 전달
          onToggleFollow={toggleFollow} // 팔로우/언팔로우 함수 전달
          isProcessing={isProcessing} // 버튼 비활성화 상태 전달
        />
      </div>
      <div className="w-full px-0 mx-0">
        <PostPreviewBoxList posts={posts} /> {/* 불필요한 onPostClick 제거 */}
      </div>
    </div>
  );
};

export default DogDetailPage;
