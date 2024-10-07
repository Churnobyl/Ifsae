import classNames from 'classnames';
import { DogType } from '@/types/dog/DogType';

interface CardType {
  id: number;
  dog: DogType;
  duration: number;
  category: 'donation' | 'adoption';
}

const AdoptionCard = ({ dog, duration, category }: CardType) => {
  const { name, age, image } = dog;
  const bgColor = category === 'donation' ? 'bg-main' : 'bg-pointYellow';
  const borderColor = category === 'donation' ? 'bg-main' : 'bg-pointYellow';
  const textColor = category === 'donation' ? 'bg-main' : 'bg-pointYellow';
  const subTextColor = category === 'donation' ? 'bg-main' : 'bg-pointYellow';
  return (
    <div className="w-full flex items-center justify-center">
      <div
        className={classNames(
          'w-11/12 rounded-lg shadow-md p-2 flex flex-row items-center justify-between',
          bgColor,
          borderColor,
        )}
      >
        <div className="min-w-36 p-4 text-black">
          <div className="my-1 font-bold text-xl ">
            {category === 'donation' ? '후원 카드' : '입양 카드'}
          </div>
          <h3 className={`text-lg font-bold ${textColor}`}>{name}</h3>
          <p className={`text-sm ${subTextColor}`}>나이: {age}살</p>
          <p className={`text-sm ${subTextColor}`}>함께한 기간: {duration}일</p>
        </div>
        <img
          src={image}
          alt={name}
          className="w-32 h-36 m-2 object-cover overflow-hidden"
        />
      </div>
    </div>
  );
};

export default AdoptionCard;
