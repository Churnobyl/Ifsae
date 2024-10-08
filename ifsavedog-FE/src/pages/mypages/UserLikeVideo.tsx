import { useEffect, useState } from 'react';
import VideoList from '@/components/video/VideoList';
import DefaultThumbnail from '@/assets/running-dog.png'; // 더미 데이터를 위한 이미지 임포트
import { likePostListApi } from '@/apis/post/postApi'; // API 호출 함수 임포트

// Post 데이터 타입 정의 (API에서 반환하는 DTO 구조에 맞게 수정)
interface Post {
  id: number;
  title: string;
  imageUrl: string | null; // imageUrl이 있을 수도 있고 없을 수도 있으므로 null 허용
}

// Video 타입 정의
interface Video {
  videoId: number;
  thumbnailUrl: string;
  title: string;
  type: 'likeVideo' | 'myVideo' | 'shelterVideo';
}

const UserLikeVideo = () => {
  // videoData 상태 설정 (Video[] 타입)
  const [videoData, setVideoData] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 컴포넌트가 마운트될 때 API 호출
  useEffect(() => {
    const fetchLikedVideos = async () => {
      try {
        const response = await likePostListApi(); // API 호출
        const posts: Post[] = response.data || []; // postList가 undefined일 경우 빈 배열로 처리

        // postList 데이터를 videoData 형식에 맞게 변환
        const formattedData: Video[] = posts.map((post) => ({
          videoId: post.id,
          thumbnailUrl: post.imageUrl || DefaultThumbnail, // imageUrl이 없으면 기본 썸네일 사용
          title: post.title,
          type: 'likeVideo',
        }));

        setVideoData(formattedData); // 상태에 데이터 저장
        setLoading(false); // 로딩 상태 완료
      } catch (error) {
        console.error('Failed to fetch liked videos:', error);
        setLoading(false); // 에러 발생 시에도 로딩 완료로 변경
      }
    };

    fetchLikedVideos(); // API 호출 함수 실행
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="w-10/12 overflow-auto">
        <div className="flex flex-row justify-start items-center">
          <div className="py-2 mr-1 text-black font-semibold text-2xl">
            내가 좋아요 한 영상
          </div>
          <div className="py-3 text-black text-lg self-end">
            {videoData.length}
          </div>{' '}
          {/* 좋아요 한 영상 수 */}
        </div>

        <div>
          {loading ? ( // 로딩 중일 때 메시지 표시
            <p>로딩 중...</p>
          ) : (
            <VideoList videoList={videoData} /> // 불러온 데이터 전달
          )}
        </div>
      </div>
    </div>
  );
};

export default UserLikeVideo;
