import { useEffect, useState } from 'react';
import DonationItemList from '@/components/donation/DonationItemList';
import { userDonationListApi } from '@/apis/donation/donationApi';

interface Donation {
  dogId: number;
  dogName: string;
  dogImage: string;
  contribution: number;
  donateDate: string;
}

// 월별로 후원 데이터를 그룹화하는 함수
const groupByMonth = (donations: Donation[]) => {
  return donations.reduce(
    (grouped, donation) => {
      const month = new Date(donation.donateDate).toLocaleString('ko-KR', {
        month: 'long',
        year: 'numeric',
      });

      if (!grouped[month]) {
        grouped[month] = {
          totalAmount: 0,
          donations: [],
        };
      }
      grouped[month].totalAmount += donation.contribution;
      grouped[month].donations.push(donation);

      return grouped;
    },
    {} as { [month: string]: { totalAmount: number; donations: Donation[] } },
  );
};

const DonationPage = () => {
  const [donationData, setDonationData] = useState<Donation[]>([]); // 후원 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  // 후원 목록을 API로부터 불러오는 함수
  // 유저 아이디로 후원 목록 불러오기가 필요함
  useEffect(() => {
    const fetchDonationList = async () => {
      try {
        const response = await userDonationListApi(); // API 호출
        setDonationData(response.data); // 후원 데이터 상태 업데이트
      } catch (error) {
        setError('후원 목록을 불러오는 중 오류가 발생했습니다.');
        console.error('Error fetching donation list:', error);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchDonationList(); // 컴포넌트 렌더링 시 API 호출
  }, []);

  // 로딩 상태 처리
  if (loading) {
    return <div>Loading...</div>;
  }

  // 에러 상태 처리
  if (error) {
    return <div>{error}</div>;
  }

  // 월별로 그룹화된 후원 데이터를 렌더링
  const groupedDonations = groupByMonth(donationData);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="px-4 py-4 bg-white shadow-md">
        <h1 className="text-lg font-semibold text-gray-700">내 후원 목록</h1>
      </header>

      <div className="p-4 space-y-6">
        {Object.keys(groupedDonations).map((month) => (
          <DonationItemList
            key={month}
            month={month}
            totalAmount={groupedDonations[month].totalAmount}
            donations={groupedDonations[month].donations}
          />
        ))}
      </div>
    </div>
  );
};

export default DonationPage;
