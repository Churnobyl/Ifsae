import UserMyPage from './UserMyPage';
import CenterMyPage from './CenterMyPage';
import { useEffect, useState } from 'react';
import { useUserStateStore } from '@/stores/auth/userStateStore';
import axios from 'axios';

const MyPage = () => {
  const role = useUserStateStore((state) => state.role);

  const [isGeneralSelected, setIsGeneralSelected] = useState(true);
  const [shelterData, setShelterData] = useState(null);

  useEffect(() => {
    if (!isGeneralSelected && role === 'ROLE_CENTER') {
      const getShelterData = async () => {
        const response = await axios.get('/api/user/my-shelter');
        setShelterData(response.data);
      };
      getShelterData();
    }
  }, [isGeneralSelected, role]);

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
        <CenterMyPage shelterData={shelterData} />
      )}
    </>
  );
};

export default MyPage;
