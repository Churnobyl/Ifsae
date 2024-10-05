<<<<<<< HEAD
interface Dog {
  id: number;
  name: string;
  age: number;
  image: string;
}
=======
import { DogType } from '@/types/dog/DogType';
>>>>>>> ead8e1968aa7094bc36a3dc47406c9e3fbc3a897

const DogPreviewBox = ({ name, age, image }: DogType) => {
  return (
    <div className="bg-white rounded-lg p-2 shadow-md">
      <img
        src={image}
        alt={name}
        className="w-full h-32 object-cover rounded-lg"
      />
      <div className="mt-2 text-center">
        <p className="font-bold">{name}</p>
        <p>나이: {age}</p>
      </div>
    </div>
  );
};

export default DogPreviewBox;
