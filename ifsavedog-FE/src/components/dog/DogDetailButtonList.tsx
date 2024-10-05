import { useState } from 'react';
import { FaHeart, FaRegHeart, FaDonate, FaPaw } from 'react-icons/fa';
import SquareButton from '@/components/common/SquareButton';

const DogDetailButtonList = () => {
  const [isFollowed, setIsFollowed] = useState(false);

  const toggleFollow = () => {
    setIsFollowed(!isFollowed);
  };

  return (
    <div className="flex justify-between mt-4 space-x-4 max-w-xl mx-auto">
      {/* 후원하기 버튼 */}
      <SquareButton
        label="후원하기"
        icon={<FaDonate className="w-6 h-6 text-black" />} // 아이콘 크기 줄이고 색상 검정으로 변경
        onClick={() => alert('후원하기 클릭됨')}
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
        } // 팔로우 상태에 따른 하트 아이콘
        onClick={toggleFollow}
      />

      {/* 입양하기 버튼 */}
      <SquareButton
        label="입양하기"
        icon={<FaPaw className="w-6 h-6 text-black" />} // 입양 아이콘 크기 및 색상 수정
        onClick={() => alert('입양하기 클릭됨')}
      />
    </div>
  );
};

export default DogDetailButtonList;
