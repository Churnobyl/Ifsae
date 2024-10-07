import DonationItem from '@/components/donation/DonationItem';

interface Donation {
  dogId: number;
  dogName: string;
  dogImage: string;
  contribution: number;
  donateDate: string;
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
          dogId={donation.dogId}
          dogName={donation.dogName}
          donateDate={donation.donateDate}
          contribution={donation.contribution}
          dogImage={donation.dogImage}
        />
      ))}
    </div>
  );
};

export default DonationItemList;
