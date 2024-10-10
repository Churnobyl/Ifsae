import { useNavigate } from 'react-router-dom';
import { DogType } from '@/types/dog/DogType';

const DogPreviewBox = ({ id, name, age, image }: DogType) => {
  const navigate = useNavigate();

  // 클릭 시 강아지 상세 페이지로 이동하는 함수
  const handleClick = () => {
    navigate(`/dog/${id}`); // 강아지 ID를 경로에 포함하여 이동
  };

  return (
    <div
      className="w-32 h-32 bg-white overflow-hidden cursor-pointer"
      onClick={handleClick} // 클릭 시 페이지 이동
    >
      <img src={image} alt={name} className="w-full h-2/3 object-cover" />
      <p className="font-semibold text-black px-1">
        {name} · {age}살
      </p>
    </div>
  );
};

export default DogPreviewBox;
