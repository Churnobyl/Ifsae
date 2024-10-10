import { useState } from 'react';

interface DogProps {
  dogId: number;
  imgUrl: string;
}

interface DogFacesProps {
  dogs: DogProps[];
}

const DogFaces = ({ dogs }: DogFacesProps) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div
      className={`flex w-full items-center cursor-pointer transition-all duration-300 ease-in-out ${
        collapsed ? 'ml-8' : ''
      }`}
      onClick={() => setCollapsed(!collapsed)}
    >
      {dogs.map((dog, index) => (
        <div
          key={index}
          className={`w-10 h-10 rounded-full flex overflow-x-auto scrollbar-hide justify-center items-center transition-all duration-300 ease-in-out transform ${
            // 첫 4개의 이미지에는 애니메이션 적용 안 함
            index < 4
              ? `${collapsed ? '-ml-6' : 'ml-2'}`
              : `${collapsed ? 'opacity-0 scale-75' : 'opacity-100 scale-100 ml-2'}`
          }`}
          style={{
            zIndex: collapsed ? 10 - index : 'auto',
            transitionDelay: index >= 4 ? `${(index - 4) * 50}ms` : '0ms',
          }}
        >
          <img
            src={dog.imgUrl}
            className="w-full h-full object-cover rounded-full"
            alt={`dog ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
};

export default DogFaces;
