import VideoCard from '@/components/video/VideoCard';
import { useEffect, useRef, useState } from 'react';

const CenterVideoListPage = () => {
  const [videos, setVideos] = useState<
    Array<{ videoId: number; thumbnailUrl: string | null; title: string }>
  >([
    {
      videoId: 1,
      thumbnailUrl: 'https://via.placeholder.com/150',
      title: 'Video 1',
    },
    {
      videoId: 2,
      thumbnailUrl: 'https://via.placeholder.com/150',
      title: 'Video 2',
    },
    {
      videoId: 3,
      thumbnailUrl: 'https://via.placeholder.com/150',
      title: 'Video 3',
    },
    {
      videoId: 4,
      thumbnailUrl: 'https://via.placeholder.com/150',
      title: 'Video 4',
    },
    {
      videoId: 5,
      thumbnailUrl: 'https://via.placeholder.com/150',
      title: 'Video 5',
    },
  ]);

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loader = useRef<HTMLDivElement | null>(null);

  // 페이지가 변경될 때마다 새로운 비디오 목록을 가져옴
  useEffect(() => {
    if (hasError || !hasMore) return; // 오류 또는 더 이상 데이터가 없으면 중지

    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.example.com/videos?page=${page}&limit=10`,
        );

        const data = await response.json();

        // 받아온 데이터가 비어 있는지 확인
        if (data.videos.length === 0) {
          setHasMore(false); // 데이터가 더 이상 없으면 hasMore를 false로 설정
        } else {
          setVideos((prev) => [...prev, ...data.videos]);
        }
      } catch (error) {
        console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
        setHasError(true); // 오류 발생 시 상태를 true로 설정하여 추가 요청 방지
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [page, hasError, hasMore]);

  // 무한 스크롤 감지
  useEffect(() => {
    if (!loader.current || hasError || !hasMore) return; // 오류 또는 데이터가 더 이상 없으면 observer 중지

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading) {
          setPage((prev) => prev + 1); // 다음 페이지로 이동
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(loader.current);

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [loading, hasError, hasMore]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-11/12">
        <div className="text-2xl font-semibold mb-4">
          센터가 보는 비디오 리스트 페이지
        </div>

        <div className="grid grid-cols-2">
          {videos.map((video) => (
            <div className="flex items-center justify-center">
              <VideoCard
                key={video.videoId}
                videoId={video.videoId}
                thumbnailUrl={video.thumbnailUrl}
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

        {/* 더 이상 로드할 데이터가 없는 경우 메시지 표시 */}
        {!hasMore && (
          <div className="text-center py-4">
            더 이상 불러올 데이터가 없습니다.
          </div>
        )}

        {/* 로딩 요소 (스크롤 끝에 위치) */}
        <div ref={loader} className="h-10"></div>
      </div>
    </div>
  );
};

export default CenterVideoListPage;
