import AdoptionPrevCard from '@/components/adoption/AdoptionPrevCard';

const MyAdoptionListPage = () => {
  const adoptionList = [
    {
      id: 1,
      name: '루루',
      profileImgUrl: 'https://example.com/dog1.jpg',
      adoptionStatus: '입양 대기',
      shelterName: '서울 보호센터',
      type: 'DOG',
    },
    {
      id: 2,
      name: '초코',
      profileImgUrl: 'https://example.com/dog2.jpg',
      adoptionStatus: '입양 진행 중',
      shelterName: '부산 보호센터',
      type: 'DOG',
    },
    {
      id: 3,
      name: '미미',
      profileImgUrl: 'https://example.com/dog3.jpg',
      adoptionStatus: '입양 완료',
      shelterName: '대구 보호센터',
      type: 'DOG',
    },
  ];

  return (
    <div className="w-full flex flex-col items-center text-black">
      <div className="w-11/12">
        <div className="text-2xl font-semibold px-2">내 입양 리스트 페이지</div>

        <div className="space-y-3 my-3">
          {adoptionList.map((dog) => (
            <AdoptionPrevCard
              key={dog.id}
              id={dog.id}
              name={dog.name}
              profileImgUrl={dog.profileImgUrl}
              adoptionStatus={dog.adoptionStatus}
              shelterName={dog.shelterName}
              type="DOG"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAdoptionListPage;
