import DonationItemList from '@/components/donation/DonationItemList';
import testImage from '@/assets/logo.webp';

interface Donation {
  name: string;
  date: string;
  amount: number;
  image: string;
  dogId: number;
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
      dogId: 1,
      date: '2023-08-24',
      amount: 6000,
      name: '순자',
      image: testImage,
    },
    {
      date: '2023-08-24',
      amount: 6000,
      dogId: 2,
      name: '루루',
      image: testImage,
    },
    {
      dogId: 3,
      date: '2023-08-24',
      amount: 6000,
      name: '루루',
      image: testImage,
    },
    {
      dogId: 4,
      date: '2023-07-15',
      amount: 5000,
      name: '하늘',
      image: testImage,
    },
    {
      dogId: 5,
      date: '2023-07-22',
      amount: 7000,
      name: '달이',
      image: testImage,
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
