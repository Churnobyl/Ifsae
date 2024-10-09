import { shelterDogListApi } from '@/apis/dog/dogApi';
import { Input } from '@/components/index';
import { useMyShelterDetailStore } from '@/stores/shelter/myShelterDetailStore';
import { DogListDtoType } from '@/types/dog/DogListDtoType';
import { PostRequestType } from '@/types/post/PostRequestType';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import '../../../node_modules/video-react/dist/video-react.css';
import { createPostApi } from '@/apis/post/postApi';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/routers/pathConstants';
import { Player } from 'video-react';

const CreatePostPage = () => {
  const myShelterStateStore = useMyShelterDetailStore();
  const [request, setRequest] = useState<PostRequestType>({
    title: '',
    content: '',
    shelterId: myShelterStateStore.id,
    dogIds: [],
  });
  const [dogList, setDogList] = useState<DogListDtoType[]>([]);

  const [selectedDogs, setSelectedDogs] = useState<DogListDtoType[]>([]);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const getDogList = useCallback(async () => {
    const response = await shelterDogListApi(myShelterStateStore.id);

    if (response.data.length === 0) {
      navigate('/' + PATH.MYPAGE);
    }
    setDogList(response.data);
  }, [myShelterStateStore.id, navigate]);

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

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const fileUrl = URL.createObjectURL(file);
        setVideoPreview(fileUrl);
      }
    },
    [],
  );

  const handleDogSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedDogId = parseInt(event.target.value);
    const selectedDog = dogList.find((dog) => dog.id === selectedDogId);
    if (selectedDog) {
      setSelectedDogs((prev) => [...prev, selectedDog]);
      setDogList((prev) => prev.filter((dog) => dog.id !== selectedDogId));
      setRequest((prev) => ({
        ...prev,
        dogIds: [...prev.dogIds, selectedDogId],
      }));
    }
  };

  const handleDogRemove = (id: number) => {
    const removedDog = selectedDogs.find((dog) => dog.id === id);
    if (removedDog) {
      setDogList((prev) => [...prev, removedDog]);
      setSelectedDogs((prev) => prev.filter((dog) => dog.id !== id));
      setRequest((prev) => ({
        ...prev,
        dogIds: prev.dogIds.filter((dogId) => dogId !== id),
      }));
    }
  };

  const handleUploadClick = () => {
    if (videoPreview === null) {
      fileInputRef.current?.click();
    }
  };

  const handleOtherVideoClick = () => {
    fileInputRef.current?.click();
  };
  const handleCreatePost = useCallback(async () => {
    const videoFile = fileInputRef.current?.files?.[0];
    try {
      if (videoFile !== undefined) {
        await createPostApi(request, videoFile);
        navigate('/' + PATH.MAIN);
      }
    } catch (error) {
      console.error('포스트 생성 오류:', error);
    }
  }, [navigate, request]);

  useEffect(() => {
    getDogList();
  }, [getDogList]);

  return (
    <main className="flex flex-col items-center gap-3 h-full w-full">
      <div className="login text-2xl">글쓰기</div>
      <div
        className="w-4/5 flex items-center justify-center cursor-pointer"
        onClick={handleUploadClick}
      >
        {videoPreview ? (
          <Player playsInline src={videoPreview} aspectRatio="1:1" />
        ) : (
          <span>클릭하여 비디오를 업로드하세요</span>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      {videoPreview && (
        <div>
          <span
            className="text-blue-500 cursor-pointer"
            onClick={handleOtherVideoClick}
          >
            다른 영상 올리기
          </span>
        </div>
      )}

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
      </div>
      <div className="flex items-center justify-center flex-wrap gap-3 mt-5 w-5/6">
        {selectedDogs.map((dog) => (
          <div key={dog.id} className="relative w-12 h-12">
            <img
              src={dog.image}
              alt={dog.name}
              className="w-full h-full object-cover rounded-full"
            />
            <div
              className="absolute top-0 right-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center cursor-pointer"
              onClick={() => handleDogRemove(dog.id)}
            >
              X
            </div>
          </div>
        ))}
      </div>

      {/* 강아지 선택 Select Box */}
      <select onChange={handleDogSelect} className="mt-5">
        <option value="">강아지를 선택하세요</option>
        {dogList.map((dog) => (
          <option key={dog.id} value={dog.id}>
            {dog.name}
          </option>
        ))}
      </select>
      <div className="flex flex-col items-center gap-3 h-full w-full">
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
