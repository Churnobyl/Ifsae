import { useNavigate } from 'react-router-dom';

interface DonationItem {
  dogId: number;
  dogName: string;
  dogImage: string;
  contribution: number;
  donateDate: string;
}

const DonationItem = ({
  dogId,
  dogName,
  donateDate,
  contribution,
  dogImage,
}: DonationItem) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/dog/${dogId}`);
  };

  return (
    <div
      className="flex items-center bg-white p-4 rounded-lg mb-2 shadow-md cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={dogImage}
        alt={dogName}
        className="w-12 h-12 rounded-full object-cover mr-4"
      />
      <div className="flex-grow">
        <h3 className="font-bold text-gray-600">{dogName}</h3>
        <p className="text-sm text-gray">
          {new Date(donateDate).toLocaleDateString('ko-KR')}
        </p>
      </div>
      <span className="text-sm text-black">총 {contribution} 원</span>
    </div>
  );
};

export default DonationItem;
