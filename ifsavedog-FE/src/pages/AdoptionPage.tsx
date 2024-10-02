import TestImage from '@/assets/logo.webp';
import Card from '@/components/donation/Card';
import DogPreview from '@/components/donation/DogPreview';

const AdoptionPage = () => {
  const cardList = [{ name: '루루', age: 2, duration: 3, image: TestImage }];

  const dogList = [
    { name: '초코', age: 1, image: TestImage },
    { name: '코코', age: 2, image: TestImage },
    { name: '보리', age: 3, image: TestImage },
  ];

  return (
    <div className="p-4">
      <div>
        {cardList.map((donationInfo) => (
          <Card
            key={donationInfo.name}
            name={donationInfo.name}
            age={donationInfo.age}
            duration={donationInfo.duration}
            image={donationInfo.image}
          ></Card>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {dogList.map((dog) => (
          <DogPreview
            key={dog.name}
            name={dog.name}
            age={dog.age}
            image={dog.image}
          />
        ))}
      </div>
    </div>
  );
};

export default AdoptionPage;
