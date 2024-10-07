import { useNavigate } from 'react-router-dom';

interface DonationItem {
  name: string;
  date: string;
  amount: number;
  image: string;
  dogId: number;
}

const DonationItem = ({ dogId, name, date, amount, image }: DonationItem) => {
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
        src={image}
        alt={name}
        className="w-12 h-12 rounded-full object-cover mr-4"
      />
      <div className="flex-grow">
        <h3 className="font-bold text-gray-700">{name}</h3>
        <p className="text-sm text-lightGray">
          {new Date(date).toLocaleDateString('ko-KR')}
        </p>
      </div>
      <span className="text-sm text-black">총 {amount} 원</span>
    </div>
  );
};

export default DonationItem;
