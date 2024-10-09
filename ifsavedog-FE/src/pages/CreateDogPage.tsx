import { HTTP_STATUS } from '@/apis/ApiConstants';
import { dogCreateApi } from '@/apis/dog/dogApi';
import { SelectInput } from '@/components/common/Input/SelectInput';
import { Input } from '@/components/index';
import { PATH } from '@/routers/pathConstants';
import { DogCreateDtoType } from '@/types/dog/DogCreateDtoType';
import { DogGenderEnum } from '@/types/dog/DogGenderEnum';
import axios from 'axios';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { FaCircleInfo, FaDog, FaPagelines } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const CreateDogPage = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [dogCreateDto, setDogCreateDto] = useState<DogCreateDtoType>({
    name: '',
    age: 0,
    gender: '',
    dogStatus: 'NOT_ADOPTED',
    species: '',
    info: '',
  });

  const [errMessage, setErrMessage] = useState<string>('');

  const [imageFile, setImageFile] = useState<File>();
  const navigate = useNavigate();

  const handleImageChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      setImageFile(file);

      if (file) {
        const newImageUrl = URL.createObjectURL(file);
        if (imageRef.current) {
          imageRef.current.src = newImageUrl;
        }
      }
    },
    [],
  );

  // Input 반영
  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      setDogCreateDto((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [],
  );

  /**
   * 개 정보 전송 로직
   */
  const handleCreateDog = useCallback(async () => {
    try {
      if (imageFile) {
        const response = await dogCreateApi(dogCreateDto, imageFile); // api 호출
        // 성공
        if (response.status === HTTP_STATUS.CREATED) {
          setErrMessage(''); // 에러메시지 삭제
          navigate('/' + PATH.MAIN); // MAIN페이지로 이동
        }
      } else {
        throw Promise.reject(new Error('이미지가 없습니다.'));
      }
    } catch (error) {
      // 에러 발생
      if (axios.isAxiosError(error)) {
        setErrMessage(error.response!.data.errorMessage);
      }
    }
  }, [dogCreateDto, imageFile, navigate]);

  return (
    <div className="w-full flex flex-col items-center justify-center text-black">
      <div className="login text-2xl">강아지 등록하기</div>
      <div className={'flex flex-row w-4/5 items-center justify-around'}>
        {/* 프로필 이미지 */}
        <div
          onClick={() => {
            imageInputRef.current?.click();
          }}
        >
          <img
            ref={imageRef}
            src={'/src/assets/logo.svg'}
            alt="Profile Image"
            className="w-40 h-40 rounded-full"
          />

          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>
        <div className={'flex flex-col'}>
          <Input
            name={'name'}
            placeholder={'이름'}
            icon={FaDog}
            value={dogCreateDto.name}
            onChange={handleInputChange}
          />
          <Input
            name={'age'}
            placeholder={'나이'}
            icon={FaPagelines}
            value={String(dogCreateDto.age)}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className={'flex flex-col w-4/5'}>
        <SelectInput
          name={'gender'}
          value={dogCreateDto.gender}
          placeholder={'성별'}
          options={[
            {
              label: DogGenderEnum.MALE.toString(),
              value: DogGenderEnum.MALE.toString(),
            },
            {
              label: DogGenderEnum.FEMALE.toString(),
              value: DogGenderEnum.FEMALE.toString(),
            },
            {
              label: DogGenderEnum.NEUTRAL.toString(),
              value: DogGenderEnum.NEUTRAL.toString(),
            },
          ]}
          onChange={handleInputChange}
        />
        <Input
          name={'species'}
          placeholder={'품종'}
          value={dogCreateDto.species}
          onChange={handleInputChange}
        />
        <Input
          name={'info'}
          placeholder={'추가적인 정보'}
          icon={FaCircleInfo}
          value={dogCreateDto.info}
          onChange={handleInputChange}
        />
      </div>
      <button
        className="text-white w-4/5 h-10 bg-main rounded-md border-none"
        onClick={handleCreateDog}
      >
        <span>등록하기</span>
      </button>
      <div className="err-message-box h-4 text-red text-sm">{errMessage}</div>
    </div>
  );
};

export default CreateDogPage;
