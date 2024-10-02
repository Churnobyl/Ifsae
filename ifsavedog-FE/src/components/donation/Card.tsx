type CardType = {
  name: string;
  age: number;
  duration: number;
  image: string;
};

const Card = ({ name, age, duration, image }: CardType) => {
  return (
    <div className="bg-yellow-400 rounded-lg p-8 h-48 shadow-md"> {/* 패딩과 높이 추가 */}
      <div className="flex items-center">
        <img src={image} alt="강아지 사진" className="w-24 h-24 rounded-full" /> {/* 이미지 크기 키움 */}
        <div className="ml-4">
          <h3 className="text-xl font-bold">후원 카드</h3> {/* 글자 크기 키움 */}
          <p>이름: {name}</p>
          <p>나이: {age}</p>
          <p>함께한 기간: {duration}일</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
