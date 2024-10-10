import { useEffect, useState } from 'react';
import AdoptionPrevCard from '@/components/adoption/AdoptionPrevCard';
import { userAdoptionListApi } from '@/apis/adoption/adoptionApi'; // API import

interface Adoption {
  adoptionId: number;
  shelterId: number;
  shelterProfileImageUrl: string;
  shelterName: string;
  dogProfileImageUrl: string;
  dogName: string;
  adoptionStatus: string;
}

const MyAdoptionListPage = () => {
  const [adoptionList, setAdoptionList] = useState<Adoption[]>([]); // 입양 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  // 입양 리스트를 불러오는 함수
  const fetchAdoptionList = async () => {
    setLoading(true);
    try {
      console.log('---');
      const response = await userAdoptionListApi(); // API 호출
      setAdoptionList(response.data); // 데이터 상태 업데이트
      console.log(response.data);
    } catch (error) {
      setError('입양 리스트를 불러오는 중 오류가 발생했습니다.');
      console.error('Error fetching adoption list:', error);
    } finally {
      setLoading(false); // 로딩 완료
    }
  };

  // 컴포넌트가 처음 렌더링될 때 API 호출
  useEffect(() => {
    fetchAdoptionList();
  }, []);

  // 로딩 상태 처리
  if (loading) {
    return <div>Loading...</div>;
  }

  // 에러 처리
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full flex flex-col items-center text-black">
      <div className="w-11/12">
        <div className="text-2xl font-semibold px-2">입양 신청 현황</div>

        <div className="space-y-3 my-3">
          {adoptionList.length > 0 ? (
            adoptionList.map((adoption) => (
              <AdoptionPrevCard
                key={adoption.adoptionId}
                id={adoption.adoptionId} // 입양 ID
                name={adoption.dogName} // 강아지 이름
                profileImgUrl={adoption.dogProfileImageUrl} // 강아지 프로필 이미지
                adoptionStatus={adoption.adoptionStatus} // 입양 상태
                shelterName={adoption.shelterName} // 보호소 이름
                type="DOG" // 강아지 타입 고정
              />
            ))
          ) : (
            <div>입양 신청 현황이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAdoptionListPage;
