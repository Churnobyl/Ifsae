import FollowItem from './FollowItem';

interface Dog {
  id: number;
  name: string;
  location: string;
  gender: string;
  breed: string;
  age: string;
}

interface FollowList {
  dogList: Dog[];
}

const FollowList = ({ dogList }: FollowList) => {
  return (
    <div className="space-y-4">
      {dogList.map((dog) => (
        <FollowItem key={dog.id} dog={dog} />
      ))}
    </div>
  );
};

export default FollowList;
