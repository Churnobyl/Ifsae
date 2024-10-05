import { useNavigate } from 'react-router-dom';

interface DonationUser {
  id: number;
  name: string;
  image: string;
  dog: {
    id: number;
    name: string;
  };
  amount: number;
}

interface DonationUserProps {
  donationUser: DonationUser;
}

const DonationUserPreviewCard = ({ donationUser }: DonationUserProps) => {
  const navigate = useNavigate();

  {
    /* [TODO]
    강아지 이름 클릭 시 상세보기 페이지로 이동 
    */
  }
  const handleDogClick = () => {
    navigate(`/dogs/${donationUser.dog.id}`);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 rounded-lg shadow-md flex items-center space-x-4 bg-base">
      <img
        src={donationUser.image}
        alt={donationUser.name}
        className="w-12 h-12 rounded-full object-cover"
      />

      <div className="flex-grow">
        <h2 className="font-bold text-black">{donationUser.name}</h2>

        <button
          onClick={handleDogClick}
          className="text-sm text-green-500 hover:underline"
        >
          {donationUser.dog.name}
        </button>
      </div>

      <div className="text-right">
        <p className="font-semibold text-green-500">{donationUser.amount}원</p>
      </div>
    </div>
  );
};

export default DonationUserPreviewCard;
