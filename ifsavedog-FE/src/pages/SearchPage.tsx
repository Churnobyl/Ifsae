import { Input } from '@/components/common/Input/Input';
import { ChangeEvent, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

interface Video {
  id: number;
  thumbnailImg: string;
  title: string;
}

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const videoData: Video[] = [
    {
      id: 1,
      thumbnailImg: 'https://via.placeholder.com/150',
      title: 'JavaScript Tutorial',
    },
    {
      id: 2,
      thumbnailImg: 'https://via.placeholder.com/150',
      title: 'React Crash Course',
    },
    {
      id: 3,
      thumbnailImg: 'https://via.placeholder.com/150',
      title: 'Understanding TypeScript',
    },
    {
      id: 4,
      thumbnailImg: 'https://via.placeholder.com/150',
      title: 'CSS Flexbox Guide',
    },
    {
      id: 5,
      thumbnailImg: 'https://via.placeholder.com/150',
      title: 'Next.js Introduction',
    },
  ];

  // 검색어에 따른 필터링된 비디오 데이터
  const filteredVideos = videoData.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // 검색어 변경 시 상태 업데이트
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl overflow-y-auto">
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={video.thumbnailImg}
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
