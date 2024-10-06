import { useState } from 'react';
import { FaHeart, FaRegHeart, FaDonate, FaPaw } from 'react-icons/fa';
import SquareButton from '@/components/common/SquareButton';

interface DogDetailButtonListProps {
  follow: boolean; // 팔로우 여부는 boolean으로 처리
  dogStatus: 'ADOPTED' | 'NOT_ADOPTED' | 'DEAD'; // dogStatus는 ADOPTED와 NOT_ADOPTED로 타입 지정
}

const DogDetailButtonList = ({
  follow,
  dogStatus,
}: DogDetailButtonListProps) => {
  const [isFollowed, setIsFollowed] = useState(follow); // 팔로우 여부

  const toggleFollow = () => {
    setIsFollowed(!isFollowed);
  };

  // 후원 및 입양 종료 여부 확인
  const canAdopt = dogStatus === 'NOT_ADOPTED';

  return (
    <div className="flex justify-between mt-4 space-x-4 max-w-xl mx-auto">
      {/* 후원하기 버튼 */}
      <SquareButton
        label={canAdopt ? '후원하기' : '후원종료'} // ADOPTED 상태면 "후원 종료"로 변경
        icon={<FaDonate className="w-6 h-6 text-black" />}
        onClick={() => alert('후원하기 클릭됨')}
        disabled={!canAdopt} // 입양된 경우 비활성화
      />

      {/* 팔로우 버튼 */}
      <SquareButton
        label={isFollowed ? '팔로잉' : '팔로우'}
        icon={
          isFollowed ? (
            <FaHeart className="w-6 h-6 text-black" />
          ) : (
            <FaRegHeart className="w-6 h-6 text-black" />
          )
        }
        onClick={toggleFollow}
      />

      {/* 입양하기 버튼 */}
      <SquareButton
        label={canAdopt ? '입양하기' : '입양종료'} // ADOPTED 상태면 "입양 종료"로 변경
        icon={<FaPaw className="w-6 h-6 text-black" />}
        onClick={() => alert('입양하기 클릭됨')}
        disabled={!canAdopt} // 입양된 경우 비활성화
      />
    </div>
  );
};

export default DogDetailButtonList;
