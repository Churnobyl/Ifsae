import { useUserStateStore } from '@/stores/auth/userStateStore';
import { useState } from 'react';
import CenterMyPage from './CenterMyPage';
import UserMyPage from './UserMyPage';

const MyPage = () => {
  const role = useUserStateStore((state) => state.role);
  const [isGeneralSelected, setIsGeneralSelected] = useState(true);

  return (
    <>
      {role === 'ROLE_CENTER' && (
        <div className="flex flex-row justify-center items-center text-black mb-4">
          <div
            onClick={() => setIsGeneralSelected(true)}
            className={`w-1/2 px-4 py-2 text-center cursor-pointer 
            ${isGeneralSelected ? 'border-b-2' : 'text-lightGray'}`}
          >
            일반
          </div>
          <div
            onClick={() => setIsGeneralSelected(false)}
            className={`w-1/2 px-4 py-2 text-center cursor-pointer"
          ${isGeneralSelected ? 'text-lightGray' : 'border-b-2'}`}
          >
            센터
          </div>
        </div>
      )}

      {role === 'ROLE_GENERAL' ? (
        <UserMyPage />
      ) : isGeneralSelected ? (
        <UserMyPage />
      ) : (
        <CenterMyPage />
      )}
    </>
  );
};

export default MyPage;
