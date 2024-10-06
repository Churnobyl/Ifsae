import DonationItem from '@/components/Donation/DonationItem';

interface Donation {
  id: number;
  name: string;
  date: string;
  amount: number;
  dog: Dog;
}

interface Dog {
  id: number;
  name: string;
  image: string;
}

interface DonationItemList {
  month: string;
  totalAmount: number;
  donations: Donation[];
}

const DonationItemList = ({
  month,
  totalAmount,
  donations,
}: DonationItemList) => {
  return (
    <div className="bg-subBase p-4 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-black">{month}</h2>
        <span className="text-lg text-green-500">{totalAmount} 원</span>
      </div>

      {donations.map((donation) => (
        <DonationItem
          key={donation.id}
          dog={donation.dog}
          name={donation.name}
          date={donation.date}
          amount={donation.amount}
          image={donation.dog.image}
        />
      ))}
    </div>
  );
};

export default DonationItemList;
