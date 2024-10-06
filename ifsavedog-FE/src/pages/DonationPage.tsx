import DonationItemList from '@/components/Donation/DonationItemList';
import testImage from '@/assets/logo.webp';

interface Dog {
  id: number;
  name: string;
  image: string;
}

interface Donation {
  id: number;
  name: string;
  date: string;
  amount: number;
  dog: Dog;
}

const groupByMonth = (donations: Donation[]) => {
  return donations.reduce(
    (grouped, donation) => {
      const month = new Date(donation.date).toLocaleString('ko-KR', {
        month: 'long',
        year: 'numeric',
      });

      if (!grouped[month]) {
        grouped[month] = {
          totalAmount: 0,
          donations: [],
        };
      }

      grouped[month].totalAmount += donation.amount;
      grouped[month].donations.push(donation);

      return grouped;
    },
    {} as { [month: string]: { totalAmount: number; donations: Donation[] } },
  );
};

const DonationPage = () => {
  const donationData: Donation[] = [
    {
      id: 1,
      dog: {
        id: 101,
        name: '순자',
        image: testImage,
      },
      name: '순자',
      date: '2023-08-24',
      amount: 6000,
    },
    {
      id: 2,
      dog: {
        id: 102,
        name: '아이조아...',
        image: testImage,
      },
      name: '아이조아...',
      date: '2023-08-24',
      amount: 6000,
    },
    {
      id: 3,
      dog: {
        id: 101,
        name: '루루',
        image: testImage,
      },
      name: '루루',
      date: '2023-08-24',
      amount: 6000,
    },
    {
      id: 4,
      dog: {
        id: 103,
        name: '하늘',
        image: testImage,
      },
      name: '하늘',
      date: '2023-07-15',
      amount: 5000,
    },
    {
      id: 5,
      dog: {
        id: 104,
        name: '달이',
        image: testImage,
      },
      name: '달이',
      date: '2023-07-22',
      amount: 7000,
    },
  ];

  const groupedDonations = groupByMonth(donationData);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="px-4 py-4 bg-white shadow-md">
        <h1 className="text-lg font-semibold text-gray-700">후원 목록</h1>
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
