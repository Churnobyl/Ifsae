type DogPreviewType = {
  name: string;
  age: number;
  image: string;
};

const DogPreview = ({ name, age, image }: DogPreviewType) => {
  return (
    <div className="bg-white rounded-lg p-2 shadow-md">
      <img
        src={image}
        alt="강아지 사진"
        className="w-full h-32 object-cover rounded-lg"
      />
      <div className="mt-2 text-center">
        <p className="font-bold">{name}</p>
        <p>나이: {age}</p>
      </div>
    </div>
  );
};

export default DogPreview;
