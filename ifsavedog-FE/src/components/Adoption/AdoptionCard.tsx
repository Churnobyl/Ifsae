import classNames from "classnames";

interface CardType {
  name: string;
  age: number;
  duration: number;
  image: string;
  category: 'donation' | 'adoption';
}

const Card = ({ name, age, duration, image, category }: CardType) => {
  const bgColor = category === 'donation' ? 'bg-lightGray' : 'bg-lightBlue';
  const borderColor = category === 'donation' ? 'bg-lightGray' : 'bg-lightBlue';
  const textColor = category === 'donation' ? 'bg-lightGray' : 'bg-lightBlue';
  const subTextColor =
    category === 'donation' ? 'bg-lightGray' : 'bg-lightBlue';
  return (
    <div
      className={classNames('rounded-lg shadow-md p-6 h-32 flex items-center', bgColor, borderColor)}
    >
      <div className="flex items-center space-x-6">
        <img
          src={image}
          alt={name}
          className="w-20 h-20 rounded-full border-2 border-white shadow-md"
        />
        <div>
          <h3 className={`text-lg font-bold ${textColor}`}>{name}</h3>
          <p className={`text-sm ${subTextColor}`}>나이: {age}살</p>
          <p className={`text-sm ${subTextColor}`}>함께한 기간: {duration}일</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
