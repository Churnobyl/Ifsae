import CenterProfileImg from '@/assets/center-profile.png';
import EditProfileICon from '@/assets/icon/edit-profile.svg';
import ManageVideoIcon from '@/assets/icon/video-camera.svg';
import PawIcon from '@/assets/icon/paw-print.svg';
import { FaHandHoldingHeart } from 'react-icons/fa';

interface ShelterData {
  id: number;
  name: string;
  address: string;
  phone: string;
  content: string;
  canBeDonated: boolean;
}

interface CenterMyPageProps {
  shelterData?: ShelterData | null;
}

const CenterMyPage: React.FC<CenterMyPageProps> = ({ shelterData }) => {
  if (!shelterData) {
    return <p>데이터를 불러오는 중...</p>;
  }

  return (
    <>
      <div className="w-[320px] text-black">
        <div className="flex flex-col items-center bg-whiteGray m-2 p-4 rounded-lg mb-6">
          <div className="flex flex-row mb-4">
            <img
              src={CenterProfileImg}
              alt="Center Profile Image"
              className="w-20 h-20 rounded-full mr-4"
            />
            <div className="space-y-[1px]">
              <p className="text-lg font-semibold">{shelterData.name}</p>
              <p className="text-sm">{shelterData.address}</p>
              <p className="text-sm text-lightGray">{shelterData.phone}</p>
            </div>
          </div>
          <div>
            <p className="text-sm">{shelterData.content}</p>
          </div>
        </div>

        <div className="border-t border-b border-lightGray py-6 px-2 mb-6">
          <div className="flex justify-around items-center">
            <div className="flex flex-col items-center">
              <div className="w-[90px] h-[90px] bg-whiteGray rounded-xl flex flex-col items-center justify-center">
                <img
                  src={ManageVideoIcon}
                  alt="like"
                  className="w-[35px] h-[35px]"
                />
                <p className="text-sm font-medium text-gray-600">
                  센터 영상 관리
                </p>
              </div>
            </div>
            <div className="w-[1px] h-[24px] bg-black rounded-full mx-2"></div>
            <div className="flex flex-col items-center">
              <div className="w-[90px] h-[90px] bg-whiteGray rounded-xl flex flex-col items-center justify-center">
                <img
                  src={EditProfileICon}
                  alt="like"
                  className="w-[35px] h-[35px]"
                />
                <p className="text-sm font-medium text-gray-600">프로필 수정</p>
              </div>
            </div>
            <div className="w-[1px] h-[24px] bg-black rounded-full mx-2"></div>
            <div className="flex flex-col items-center">
              <div className="w-[90px] h-[90px] bg-whiteGray rounded-xl flex flex-col items-center justify-center">
                <img src={PawIcon} alt="like" className="w-[35px] h-[35px]" />
                <p className="text-sm font-medium text-gray-600">강아지 관리</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-2">
          <div className="flex items-center mb-4">
            <FaHandHoldingHeart size={24} className="mr-2" />
            <p className="text-lg font-semibold">후원자 관리</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CenterMyPage;
