interface Dog {
  id: number;
  name: string;
  age: number;
  gender: 'MALE' | 'FEMALE' | 'NEUTRAL';
  dogStatus: 'NOT_ADOPTED' | 'ADOPTED';
  species: string;
  info: string;
  image: string;
  shelterId: number;
  shelterName: string;
  followCnt: number;
}

const DogDetail = ({ dog }: { dog: Dog }) => {
  const getGenderText = (gender: 'MALE' | 'FEMALE' | 'NEUTRAL') => {
    switch (gender) {
      case 'MALE':
        return '남';
      case 'FEMALE':
        return '여';
      case 'NEUTRAL':
        return '중성화';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-xl mx-auto">
      {/* 위쪽 영역: 이미지와 텍스트 */}
      <div className="flex items-center">
        {/* 강아지 이미지 */}
        <img
          src={dog.image}
          alt={dog.name}
          className="w-20 h-20 rounded-full object-cover"
        />

        {/* 세로줄 */}
        <div className="h-20 border-l border-gray-300 mx-4"></div>

        {/* 강아지 텍스트 정보 - 오른쪽에 배치 */}
        <div className="text-right flex-1">
          <div className="text-lg font-semibold">{dog.name}</div>
          <div className="text-sm text-gray-600">{dog.shelterName}</div>
          <div className="text-sm text-gray-600">
            {dog.species} / {dog.age}세 / {getGenderText(dog.gender)}
          </div>
          <div className="text-sm text-gray-600">
            {dog.dogStatus === 'ADOPTED' ? '입양됨' : '입양 대기 중'}
          </div>
        </div>
      </div>

      {/* 아래쪽 영역: 강아지 설명 */}
      <div className="mt-4 bg-base p-3 rounded-md">
        <p className="text-sm text-gray-700 break-all">{dog.info}</p>
      </div>
    </div>
  );
};

export default DogDetail;
