import { searchPostApi } from '@/apis/post/postApi';
import { Input } from '@/components/common/Input/Input';
import { PATH } from '@/routers/pathConstants';
import { PostPreviewType } from '@/types/post/PostPreviewType';
import { ChangeEvent, useCallback, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [videoData, setVideoData] = useState<PostPreviewType[]>([]);
  const navigate = useNavigate();

  // 검색어 변경 시 상태 업데이트
  const handleChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
      await searchPostApi(event.target.value).then((response) => {
        setVideoData(response.data);
      });
    },
    [],
  );

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-11/12 h-full py-4">
        <div className="px-2 text-xl font-semibold">영상 검색</div>
        <Input
          name="search"
          value={searchTerm}
          placeholder="검색하기"
          onChange={handleChange}
          icon={FaSearch}
          type="text"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          {videoData.length > 0 ? (
            videoData.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                onClick={() =>
                  navigate('/' + PATH.VIDEO_DETAIL + '/' + video.id)
                }
              >
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{video.title}</h2>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center col-span-full">No videos found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
