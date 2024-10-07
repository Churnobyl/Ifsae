import { DogType } from '@/types/dog/DogType';

const DogPreviewBox = ({ name, age, image }: DogType) => {
  return (
    <div className="w-32 h-32 bg-white overflow-hidden">
      <img src={image} alt={name} className="w-full h-2/3 object-cover" />
      <p className="font-semibold text-black px-1">
        {name} · {age}
      </p>
    </div>
  );
};

export default DogPreviewBox;
