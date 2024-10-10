import React, { useEffect, useState } from 'react';
import DonationUserPreviewCard from '@/components/user/DonationUserPreviewCard';
import { centerDonationListApi } from '@/apis/donation/donationApi'; // API import
import testImage from '@/assets/logo.webp';

interface DonationUser {
  userId: number;
  userNickName: string;
  userProfileImage: string;
  dogId: number;
  dogName: string;
  contribution: number;
  donateDate: string; // API에서 넘어오는 날짜
}

const CenterDonationListPage = () => {
  const [selectedMonth, setSelectedMonth] = useState('2024-08'); // 초기 상태는 2024년 8월
  const [donationUsers, setDonationUsers] = useState<DonationUser[]>([]); // 후원자 목록 상태
  const [filteredUsers, setFilteredUsers] = useState<DonationUser[]>([]); // 필터링된 후원자 목록
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  // 후원자 목록을 불러오는 함수
  const fetchDonationUsers = async () => {
    setLoading(true);
    try {
      const response = await centerDonationListApi(); // API 호출로 모든 데이터 가져오기
      setDonationUsers(response.data); // 받은 데이터로 상태 업데이트
    } catch (error) {
      setError('후원자 목록을 불러오는 중 오류가 발생했습니다.');
      console.error('Error fetching donation users:', error);
    } finally {
      setLoading(false); // 로딩 완료
    }
  };

  // 컴포넌트가 처음 렌더링될 때 API 호출
  useEffect(() => {
    fetchDonationUsers();
  }, []);

  // 선택한 월을 기준으로 후원자 목록 필터링
  useEffect(() => {
    const filtered = donationUsers.filter((user) => {
      const donateDate = new Date(user.donateDate); // 후원 날짜를 Date 객체로 변환
      const yearMonth = donateDate.toISOString().slice(0, 7); // YYYY-MM 형식으로 변환
      return yearMonth === selectedMonth; // 선택한 달과 일치하는지 확인
    });

    setFilteredUsers(filtered); // 필터링된 데이터를 상태에 저장
  }, [selectedMonth, donationUsers]);

  // 월 선택 변경 핸들러
  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMonth(event.target.value); // 선택한 월 업데이트
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="px-4 py-4 bg-white shadow-md flex justify-between items-center">
        <h1 className="text-lg font-semibold text-gray-700">
          센터 후원자 목록
        </h1>
      </header>

      {/* 월 선택 input 필드 */}
      <div className="px-2 py-2 flex items-center justify-center space-x-2">
        <label htmlFor="month-select"></label>
        <input
          type="month"
          id="month-select"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="p-1 rounded-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 max-w-5xl mx-auto">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <DonationUserPreviewCard
              key={user.userId}
              donationUser={{
                id: user.userId,
                name: user.userNickName,
                image: user.userProfileImage || testImage, // 이미지가 없을 경우 기본 이미지 사용
                dog: {
                  id: user.dogId,
                  name: user.dogName,
                },
                amount: user.contribution,
              }}
            />
          ))
        ) : (
          <div>선택한 월에 후원자가 없습니다.</div> // 선택한 월에 후원자 목록이 없을 때
        )}
      </div>
    </div>
  );
};

export default CenterDonationListPage;
