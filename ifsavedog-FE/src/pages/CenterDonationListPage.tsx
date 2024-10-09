import React, { useState } from 'react';
import DonationUserPreviewCard from '@/components/user/DonationUserPreviewCard';
import testImage from '@/assets/logo.webp';

const exampleDonationUsers = [
  {
    id: 1,
    name: '서경덕',
    image: testImage,
    dog: {
      id: 1,
      name: '루루',
    },
    amount: 6000,
  },
  {
    id: 2,
    name: '류성윤',
    image: testImage,
    dog: {
      id: 2,
      name: '코코',
    },
    amount: 6000,
  },
];

const CenterDonationListPage = () => {
  const [selectedMonth, setSelectedMonth] = useState('2024-08'); // 초기 상태는 2024년 8월

  /* [TODO]
   *  나중에 월 선택하면 API 요청을 받도록 구현
   */
  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMonth(event.target.value);
  };

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
        {exampleDonationUsers.map((user) => (
          <DonationUserPreviewCard key={user.id} donationUser={user} />
        ))}
      </div>
    </div>
  );
};

export default CenterDonationListPage;
