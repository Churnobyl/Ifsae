import { useEffect, useState } from 'react';
import { shelterPostListApi } from '@/apis/post/postApi';
import { useMyShelterDetailStore } from '@/stores/shelter/myShelterDetailStore';
import VideoCard from '@/components/video/VideoCard'; // VideoCard import

const CenterVideoListPage = () => {
  const myShelterDetailStore = useMyShelterDetailStore();
  const { id } = myShelterDetailStore;

  const [allVideos, setAllVideos] = useState<
    Array<{ id: number; imageUrl: string | null; title: string }>
  >([]); // 전체 비디오 데이터를 저장
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // 처음 한 번 API를 통해 전체 비디오 목록을 받아옴
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await shelterPostListApi(id); // API 호출
        const data = response.data; // 전체 데이터를 한 번에 받아옴
        setAllVideos(data); // 전체 데이터를 상태에 저장
      } catch (error) {
        console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [id]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-11/12">
        <header className="w-11/12 flex justify-between items-center py-4 bg-white">
          <h1 className="text-xl font-semibold">
            내 영상 목록 <span>{allVideos.length}</span>
          </h1>
        </header>

        <div className="grid grid-cols-2">
          {allVideos.map((video) => (
            <div key={video.id} className="flex items-center justify-center">
              <VideoCard
                videoId={video.id}
                thumbnailUrl={video.imageUrl}
                title={video.title}
                type="myVideo"
              />
            </div>
          ))}
        </div>

        {/* 로딩 중 표시 */}
        {loading && <div className="text-center py-4">로딩 중...</div>}

        {/* 오류 발생 시 메시지 표시 */}
        {hasError && (
          <div className="text-center py-4">
            데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요.
          </div>
        )}
      </div>
    </div>
  );
};

export default CenterVideoListPage;
