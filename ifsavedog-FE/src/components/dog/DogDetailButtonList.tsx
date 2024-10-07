import { FaHeart, FaRegHeart, FaDonate, FaPaw } from 'react-icons/fa';
import SquareButton from '@/components/common/SquareButton';
import { useNavigate } from 'react-router-dom';

interface DogDetailButtonListProps {
  follow: boolean; // 팔로우 여부는 boolean으로 처리
  dogStatus: 'ADOPTED' | 'NOT_ADOPTED' | 'DEAD'; // dogStatus는 ADOPTED와 NOT_ADOPTED로 타입 지정
  dogId: number; // 강아지 ID 추가
  onToggleFollow: () => void; // 팔로우 상태를 변경하는 함수
  isProcessing: boolean; // 버튼 비활성화 여부
}

const DogDetailButtonList = ({
  follow,
  dogStatus,
  dogId, // dogId를 받아옴
  onToggleFollow,
  isProcessing,
}: DogDetailButtonListProps) => {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅 사용

  // 후원하기 버튼 클릭 시 이동
  const onDonateClick = () => {
    if (dogStatus === 'NOT_ADOPTED') {
      navigate(`/donate/${dogId}`); // dogId를 경로에 포함하여 이동
    }
  };

  // 입양하기 버튼 클릭 시 이동
  const onAdoptClick = () => {
    if (dogStatus === 'NOT_ADOPTED') {
      navigate(`/adopt/${dogId}`); // dogId를 경로에 포함하여 이동
    }
  };

  const canAdopt = dogStatus === 'NOT_ADOPTED'; // 입양 가능 여부
  const canDonate = dogStatus === 'NOT_ADOPTED'; // 후원 가능 여부 (입양되지 않은 경우)

  return (
    <div className="flex justify-between mt-4 space-x-4 max-w-xl mx-auto">
      {/* 후원하기 버튼 */}
      <SquareButton
        label={canDonate ? '후원하기' : '후원종료'}
        icon={<FaDonate className="w-6 h-6 text-black" />}
        onClick={onDonateClick} // 클릭 시 페이지 이동
        disabled={!canDonate} // 입양된 경우 비활성화
      />

      {/* 팔로우 버튼 */}
      <SquareButton
        label={follow ? '팔로잉' : '팔로우'}
        icon={
          follow ? (
            <FaHeart className="w-6 h-6 text-black" />
          ) : (
            <FaRegHeart className="w-6 h-6 text-black" />
          )
        }
        onClick={onToggleFollow} // 팔로우 상태 변경 함수 호출
        disabled={isProcessing} // 요청 중일 때 버튼 비활성화
      />

      {/* 입양하기 버튼 */}
      <SquareButton
        label={canAdopt ? '입양하기' : '입양종료'}
        icon={<FaPaw className="w-6 h-6 text-black" />}
        onClick={onAdoptClick} // 클릭 시 페이지 이동
        disabled={!canAdopt} // 입양된 경우 비활성화
      />
    </div>
  );
};

export default DogDetailButtonList;
