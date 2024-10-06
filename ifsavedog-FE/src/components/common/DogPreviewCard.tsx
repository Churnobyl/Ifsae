import { DogType } from '@/types/dog/DogType';

interface DogProps {
  dog: DogType;
}

const DogPreviewCard = ({ dog }: DogProps) => {
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
    <div className="relative p-4 rounded-lg shadow-md flex items-center space-x-4 bg-base">
      <img
        src={dog.image}
        alt={dog.name}
        className="w-12 h-12 rounded-full object-cover"
      />

      <div className="flex-grow">
        <h2 className="px-0.2 font-bold text-black">{dog.name}</h2>
        <p className="text-sm text-darkGray">
          {dog.age}살 / {dog.species} / {getGenderText(dog.gender)}
        </p>
      </div>

      <div className="mt-auto rounded-md bg-darkbase">
        <button className="px-3 py-1 text-sm-bold text-white rounded-md self-end">
          상세보기
        </button>
      </div>
    </div>
  );
};

export default DogPreviewCard;
