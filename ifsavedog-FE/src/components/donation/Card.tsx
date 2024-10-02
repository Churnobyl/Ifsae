import React from 'react';

type CardType = {
  name: string;
  age: number;
  duration: number;
  image: string;
}

const Card = ({ name, age, duration, image }: CardType) => {
  return (
    <div className="bg-yellow-400 rounded-lg p-4 shadow-md">
      <div className="flex items-center">
        <img src={image} alt="강아지 사진" className="w-16 h-16 rounded-full" />
        <div className="ml-4">
          <h3 className="text-lg font-bold">임시보호 카드</h3>
          <p>이름: {name}</p>
          <p>나이: {age}</p>
          <p>함께한 기간: {duration}일</p>
        </div>
      </div>
    </div>
  );
};

export default Card;