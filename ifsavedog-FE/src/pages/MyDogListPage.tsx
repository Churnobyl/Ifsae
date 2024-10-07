import { useEffect, useState } from 'react';
import DogPreviewCardList from '@/components/common/DogPreviewCardList';
import SearchComponent from '@/components/common/Search';
import { shelterDogListApi } from '@/apis/dog/dogApi';
import { DogType } from '@/types/dog/DogType';

const MyDogListPage = () => {
  // [TODO]
  // - 로그인 유저 정보를 통해 shelterId를 찾아와서 사용
  const shelterId = 1;
  const [searchQuery, setSearchQuery] = useState('');
  const [dogList, setDogList] = useState<DogType[]>([]); // 강아지 목록 상태
  const [filteredDogList, setFilteredDogList] = useState<DogType[]>([]); // 검색어로 필터링된 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  // 강아지 목록을 API로부터 불러오는 함수
  useEffect(() => {
    const fetchDogList = async () => {
      try {
        const response = await shelterDogListApi(shelterId); // shelterId를 이용해 API 호출
        setDogList(response.data); // API로부터 받은 강아지 목록 상태 업데이트
        setFilteredDogList(response.data); // 처음엔 전체 리스트로 필터링 초기화
      } catch (error) {
        setError('강아지 목록을 불러오는 중 오류가 발생했습니다.');
        console.error('Error fetching dog list:', error);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchDogList(); // 컴포넌트 렌더링 시 API 호출
  }, [shelterId]);

  // 검색어가 변경될 때마다 강아지 목록을 필터링
  useEffect(() => {
    if (searchQuery) {
      const filtered = dogList.filter((dog) =>
        dog.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredDogList(filtered);
    } else {
      setFilteredDogList(dogList); // 검색어가 없으면 전체 목록을 보여줌
    }
  }, [searchQuery, dogList]);

  // 검색어 변경 처리 함수
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // 로딩 중일 때 표시할 UI
  if (loading) {
    return <div>Loading...</div>;
  }

  // 에러 발생 시 표시할 UI
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between items-center px-4 py-4 bg-white shadow-md">
        <h1 className="text-lg font-semibold text-gray-700">
          센터 강아지 관리{' '}
          <span className="text-green-500">{filteredDogList.length}</span>
        </h1>
      </header>

      <div>
        <SearchComponent
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
      </div>

      <div className="p-4">
        {filteredDogList.length > 0 ? (
          <DogPreviewCardList dogList={filteredDogList} /> // 필터링된 강아지 목록 렌더링
        ) : (
          <div>강아지가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default MyDogListPage;
