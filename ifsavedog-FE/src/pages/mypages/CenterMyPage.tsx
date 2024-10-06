import CenterProfileImg from '@/assets/center-profile.png';
import EditProfileICon from '@/assets/icon/edit-profile.svg';
import ManageVideoIcon from '@/assets/icon/video-camera.svg';
import PawIcon from '@/assets/icon/paw-print.svg';
import { FaHandHoldingHeart } from 'react-icons/fa';
import { ShelterDetailType } from '@/types/shelter/ShelterDetailType';

const CenterMyPage = ({ shelterData }: { shelterData: ShelterDetailType }) => {
  const { name, address, phone, content } = shelterData;

  return (
    <>
      <div className="flex flex-col items-center justify-center text-black">
        <div className="w-11/12 bg-whiteGray m-2 p-4 rounded-lg mb-6">
          <div className="flex flex-row mb-4 justify-around">
            <img
              src={CenterProfileImg}
              alt="Center Profile Image"
              className="w-20 h-20 rounded-full mr-4"
            />
            <div className="space-y-[1px]">
              <p className="text-lg font-semibold">{name}</p>
              <p className="text-sm">{address}</p>
              <p className="text-sm text-gray">{phone}</p>
            </div>
          </div>

          <div className="flex justify-center">
            <p className="w-5/6 text-sm">{content}</p>
          </div>
        </div>

        <div className="w-11/12 flex items-center justify-center border-t border-b border-lightGray py-6 px-2 mb-6">
          <div className="flex justify-around items-center">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-whiteGray rounded-xl flex flex-col items-center justify-center">
                <img src={ManageVideoIcon} alt="like" className="w-8 h-8" />
                <p className="text-sm font-medium text-gray-600">
                  센터 영상 관리
                </p>
              </div>
            </div>
            <div className="w-[1px] h-[24px] bg-black rounded-full mx-2"></div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-whiteGray rounded-xl flex flex-col items-center justify-center">
                <img src={EditProfileICon} alt="like" className="w-8 h-8" />
                <p className="text-sm font-medium text-gray-600">프로필 수정</p>
              </div>
            </div>
            <div className="w-[1px] h-[24px] bg-black rounded-full mx-2"></div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-whiteGray rounded-xl flex flex-col items-center justify-center">
                <img src={PawIcon} alt="like" className="w-8 h-8" />
                <p className="text-sm font-medium text-gray-600">강아지 관리</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-2 w-11/12">
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
