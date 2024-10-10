import MainPrevVideo from '@/components/video/MainPrevVideo';
import { DogType } from '@/types/dog/DogType';

const MainPage = () => {
  const videoData = [
    {
      id: 1,
      thumbnailUrl: 'https://example.com/video1.jpg',
      like: 150,
      title: 'Golden Retriever Playing',
      dogs: [
        {
          id: 1,
          name: 'Buddy',
          age: 2,
          gender: 'MALE',
          species: 'Dog',
          image: 'https://example.com/dog1.jpg',
        },
        {
          id: 2,
          name: 'Lucy',
          age: 3,
          gender: 'FEMALE',
          species: 'Dog',
          image: 'https://example.com/dog2.jpg',
        },
      ],
    },
    {
      id: 2,
      thumbnailUrl: 'https://example.com/video2.jpg',
      like: 200,
      title: 'Poodles Jumping',
      dogs: [
        {
          id: 3,
          name: 'Charlie',
          age: 4,
          gender: 'MALE', // 수정
          species: 'Dog',
          image: 'https://example.com/dog3.jpg',
        },
        {
          id: 4,
          name: 'Max',
          age: 2,
          gender: 'MALE',
          species: 'Dog',
          image: 'https://example.com/dog4.jpg',
        },
      ],
    },
    {
      id: 3,
      thumbnailUrl: 'https://example.com/video3.jpg',
      like: 120,
      title: 'Beagles Howling',
      dogs: [
        {
          id: 5,
          name: 'Daisy',
          age: 1,
          gender: 'FEMALE',
          species: 'Dog',
          image: 'https://example.com/dog5.jpg',
        },
        {
          id: 6,
          name: 'Rocky',
          age: 5,
          gender: 'MALE',
          species: 'Dog',
          image: 'https://example.com/dog6.jpg',
        },
      ],
    },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-11/12 flex flex-col items-center">
        {videoData.map((video) => (
          <MainPrevVideo
            key={video.id}
            id={video.id}
            thumbnailUrl={video.thumbnailUrl}
            like={video.like}
            title={video.title}
            dogs={video.dogs as DogType[]}
          />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
