const dogFaces = [
  '/src/assets/dogFace/1.jfif',
  '/src/assets/dogFace/2.jfif',
  '/src/assets/dogFace/3.jfif',
  '/src/assets/dogFace/4.jfif',
];

const DogFaces = () => {
  return (
    <div className="flex w-18">
      {dogFaces.map((dogface, index) => (
        <div
          key={index}
          className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center z-10 -ml-4"
          style={{ zIndex: 10 - index }}
        >
          <img
            src={dogface}
            className={'w-full h-full object-cover rounded-full'}
            alt=""
          />
        </div>
      ))}
    </div>
  );
};

export default DogFaces;
