import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart, FaDonate, FaPaw } from 'react-icons/fa';
import SquareButton from '@/components/common/SquareButton';
import { checkFollowApi, followApi, unFollowApi } from '@/apis/dog/dogApi'; // 팔로우 관련 API import
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import { DogDetailType } from '@/types/dog/DogDetailType';

interface DogDetailButtonListProps {
  dogStatus: 'ADOPTED' | 'NOT_ADOPTED' | 'DEAD'; // dogStatus는 ADOPTED와 NOT_ADOPTED로 타입 지정
  dogId: number; // 강아지 ID를 받아옴
  dog: DogDetailType; // dog 정보를 받아옴 (타입은 실제 데이터에 맞게 수정 필요)
}

const DogDetailButtonList = ({
  dogStatus,
  dogId,
  dog,
}: DogDetailButtonListProps) => {
  const [isFollowed, setIsFollowed] = useState(false); // 팔로우 여부 상태
  const [isProcessing, setIsProcessing] = useState(false); // 요청 중인지 여부 관리
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 팔로우 여부 확인 함수 (처음 렌더링 시 호출)
  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        const response = await checkFollowApi(dogId); // 팔로우 상태 확인 API 호출
        setIsFollowed(response.data.isFollowed); // 팔로우 상태 업데이트
      } catch (error) {
        console.error('팔로우 상태를 확인하는 중 오류 발생:', error);
      }
    };

    fetchFollowStatus(); // 처음 렌더링 시 팔로우 여부 확인
  }, [dogId]);

  // 팔로우 상태 변경 함수
  const toggleFollow = async () => {
    if (isProcessing) return; // 중복 요청 방지

    setIsProcessing(true); // 요청 시작
    try {
      if (isFollowed) {
        await unFollowApi(dogId); // 언팔로우 API 호출
      } else {
        await followApi(dogId); // 팔로우 API 호출
      }
      setIsFollowed(!isFollowed); // 팔로우 상태 업데이트
    } catch (error) {
      console.error('팔로우/언팔로우 중 오류 발생:', error);
    } finally {
      setIsProcessing(false); // 요청 완료
    }
  };

  const canAdopt = dogStatus === 'NOT_ADOPTED'; // 입양 가능 여부

  // 후원하기 버튼 클릭 시 후원 페이지로 이동
  const handleDonateClick = () => {
    navigate('/donation/create-donation', { state: { dog } }); // dog 정보를 상태로 전달하며 후원 페이지로 이동
  };

  return (
    <div className="flex justify-between mt-4 space-x-4 max-w-xl mx-auto">
      {/* 후원하기 버튼 */}
      <SquareButton
        label={canAdopt ? '후원하기' : '후원종료'}
        icon={<FaDonate className="w-6 h-6 text-black" />}
        onClick={handleDonateClick} // 후원하기 클릭 시 페이지 이동
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
        onClick={toggleFollow} // 팔로우 상태 변경 함수 호출
        disabled={isProcessing} // 요청 중일 때 버튼 비활성화
      />

      {/* 입양하기 버튼 */}
      <SquareButton
        label={canAdopt ? '입양하기' : '입양종료'}
        icon={<FaPaw className="w-6 h-6 text-black" />}
        onClick={() => alert('입양하기 클릭됨')}
        disabled={!canAdopt} // 입양된 경우 비활성화
      />
    </div>
  );
};

export default DogDetailButtonList;
