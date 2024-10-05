interface Dog {
  id: number;
  name: string;
  location: string;
  gender: string;
  breed: string;
  age: number;
  image: string;
}

interface DogProps {
  dog: Dog;
}

const DogPreviewCard = ({ dog }: DogProps) => {
  return (
    <div className="relative p-4 rounded-lg shadow-md flex items-center space-x-4 bg-base">
      <img
        src={dog.image}
        alt={dog.name}
        className="w-12 h-12 rounded-full object-cover"
      />

      <div className="flex-grow">
        <h2 className="px-0.2 font-bold text-black">{dog.name}</h2>
        <p className="text-sm text-darkGray">{dog.location}</p>
        <p className="text-sm text-darkGray">
          {dog.age}살 / {dog.breed} / {dog.gender}
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
