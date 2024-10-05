const DogFaces = () => {
  return (
    <div className="flex w-40 overflow-hidden">
      {' '}
      {/* Set the width and hide overflow */}
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center z-10 -ml-4"
          style={{ zIndex: 10 - index }} /* Adjust z-index for stacking */
        >
          Dog face
        </div>
      ))}
    </div>
  );
};

export default DogFaces;
