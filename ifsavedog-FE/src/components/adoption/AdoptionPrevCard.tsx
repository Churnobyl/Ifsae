import { useState } from 'react';

interface AdoptionPrevCardProps {
  id: number;
  name: string;
  profileImgUrl: string;
  adoptionStatus?: string;
  shelterName?: string;
  type: 'USER' | 'DOG';
}

const AdoptionPrevCard = ({
  // id,
  name,
  profileImgUrl,
  adoptionStatus,
  shelterName,
  // type,
}: AdoptionPrevCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  // 상세보기 버튼 클릭 핸들러
  const handleToggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  return (
    <div className="bg-base rounded-md flex flex-col">
      <div className="flex flex-row justify-between space-x-2 p-3">
        <img
          src={profileImgUrl}
          alt={`${name}의 프로필 이미지`}
          className="w-14 h-14 object-cover rounded-full m-2"
        />

        <div className="w-1/2 overflow-hidden">
          <div className="font-semibold">{name}</div>
          <div className="text-sm">{adoptionStatus}</div>
        </div>

        {/* 상세보기 버튼 */}
        <div className="flex items-end">
          <button
            onClick={handleToggleDetails}
            className="w-20 h-7 text-sm bg-darkbase text-white p-1 rounded transition"
          >
            {showDetails ? '접기' : '상세보기'}
          </button>
        </div>
      </div>

      {showDetails && (
        <div className="p-2 border-t">
          <div className="text-sm">
            <strong>센터 이름:</strong> {shelterName}
          </div>
          <div className="text-sm">
            <strong>입양 상태:</strong> {adoptionStatus || '정보 없음'}
          </div>
        </div>
      )}
    </div>
  );
};
export default AdoptionPrevCard;
