import { getDogListByShelterIdApi } from '@/apis/dog/dogApi';
import { Input } from '@/components/index';
import { useMyShelterDetailStore } from '@/stores/shelter/myShelterDetailStore';
import { DogListDtoType } from '@/types/dog/DogListDtoType';
import { PostRequestType } from '@/types/post/PostRequestType';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

const CreatePostPage = () => {
  const myShelterStateStore = useMyShelterDetailStore();
  const [request, setRequest] = useState<PostRequestType>({
    title: '',
    content: '',
    shelterId: myShelterStateStore.id,
    dogIds: [],
  });
  const [dogList, setDogList] = useState<DogListDtoType[]>([]);
  console.log(dogList);

  const getDogList = useCallback(async () => {
    const response = await getDogListByShelterIdApi(myShelterStateStore.id);
    setDogList(response.data);
  }, [myShelterStateStore.id]);

  // Input 반영
  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setRequest((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [],
  );

  /**
   * 포스트 제출 로직
   */
  const handleCreatePost = useCallback(async () => {}, []);

  useEffect(() => {
    getDogList();
  }, [getDogList]);

  return (
    <main className="flex flex-col items-center gap-3 justify-center h-full w-full">
      <div className="login text-2xl">글쓰기</div>
      <div className="login-form flex flex-col gap-1 w-26">
        <div>
          <Input
            name={'title'}
            placeholder="제목"
            value={request.title}
            onChange={handleInputChange}
          />
          <Input
            name={'content'}
            placeholder="내용"
            value={request.content}
            onChange={handleInputChange}
          />
        </div>
        <button
          className="text-white w-full h-10 bg-main rounded-md border-none"
          onClick={handleCreatePost}
        >
          <span>글쓰기</span>
        </button>
      </div>
    </main>
  );
};

export default CreatePostPage;
