import { HTTP_STATUS } from '@/apis/ApiConstants';
import { createShelterApi } from '@/apis/shelter/shelterApi';
import { Input } from '@/components/index';
import MainLayout from '@/layouts/MainLayout';
import { PATH } from '@/routers/pathConstants';
import { useUserStateStore } from '@/stores/auth/userStateStore';
import { useShelterCreateStore } from '@/stores/shelter/shelterCreateStore';
import axios from 'axios';
import { ChangeEvent, useCallback, useState } from 'react';
import { BiSolidHomeHeart } from 'react-icons/bi';
import { FaPhoneSquare } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { TbBubbleText } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';

const CreateShelterPage = () => {
  const shelterCreateStore = useShelterCreateStore();
  const userStateStore = useUserStateStore();

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      shelterCreateStore.setUserInput({ [name]: value });
    },
    [shelterCreateStore],
  );

  const [isSubmitPending, setIsSubmitPending] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>('');
  const navigate = useNavigate();

  /**
   * 제출 로직
   */
  const handleSignup = useCallback(async () => {
    try {
      setIsSubmitPending(true);
      const response = await createShelterApi(shelterCreateStore.userInput);

      if (response.status === HTTP_STATUS.CREATED) {
        userStateStore.setUserStatus('ACTIVE');
        navigate('/' + PATH.MAIN, { replace: true });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrMessage(error.response!.data.errorMessage);
      }
    } finally {
      setIsSubmitPending(false);
    }
  }, [navigate, shelterCreateStore.userInput, userStateStore]);

  return (
    <MainLayout showTopbar={false} showBottombar={false}>
      <main className="flex flex-col items-center gap-3 h-screen w-full pt-16">
        <div className="text-2xl">센터 가입하기</div>
        <p>당신의 센터를 마음껏 표현해주세요</p>
        <div className="flex flex-col gap-1 w-4/5">
          <Input
            name="name"
            placeholder="센터 이름"
            value={shelterCreateStore.userInput.name}
            onChange={handleInputChange}
            icon={BiSolidHomeHeart}
          />
          <Input
            name="address"
            placeholder="주소"
            value={shelterCreateStore.userInput.address}
            onChange={handleInputChange}
            icon={FaLocationDot}
          />
          <Input
            name="phone"
            placeholder="전화번호"
            value={shelterCreateStore.userInput.phone}
            onChange={handleInputChange}
            icon={FaPhoneSquare}
          />
          <Input
            name="content"
            placeholder="센터 소개"
            value={shelterCreateStore.userInput.content}
            onChange={handleInputChange}
            icon={TbBubbleText}
          />
          <button
            className="text-white w-full h-10 bg-main rounded-md border-none"
            onClick={handleSignup}
            disabled={isSubmitPending}
          >
            <span>제출하기</span>
          </button>

          {isSubmitPending && (
            <div className="flex items-center justify-center">
              <MoonLoader size={30} color={'var(--color-black)'} />
            </div>
          )}
        </div>
        <div className="err-message-box h-4 text-red text-sm">{errMessage}</div>
      </main>
    </MainLayout>
  );
};

export default CreateShelterPage;
