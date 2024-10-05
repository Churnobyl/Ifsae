import { useUserStateStore } from '@/stores/auth/userStateStore';
import { useEffect, useState } from 'react';
import UserMyPage from './UserMyPage';
import { instance } from '@/apis/axios';
import { ENDPOINT } from '@/apis/ApiConstants';
import CenterMyPage from '@/pages/CenterMyPage';
import { ShelterDetailType } from '@/types/shelter/ShelterDetailType';

const MyPage = () => {
  const role = useUserStateStore((state) => state.role);

  const [isGeneralSelected, setIsGeneralSelected] = useState(true);
  const [shelterData, setShelterData] = useState<ShelterDetailType>({
    id: 0,
    name: '',
    address: '',
    phone: '',
    content: '',
    canBeDonated: true,
  });

  useEffect(() => {
    if (!isGeneralSelected && role === 'ROLE_CENTER') {
      const getShelterData = async () => {
        const response = await instance.get(ENDPOINT.GET_MY_SHELTER);
        setShelterData(response.data);
      };
      getShelterData();
    }
  }, [isGeneralSelected, role, shelterData.id]);

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
