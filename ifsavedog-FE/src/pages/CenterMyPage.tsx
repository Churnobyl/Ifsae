import CenterProfileImg from '@/assets/center-profile.png';
import EditProfileICon from '@/assets/icon/edit-profile.svg';
import ManageVideoIcon from '@/assets/icon/video-camera.svg';
import PawIcon from '@/assets/icon/paw-print.svg';
import { FaHandHoldingHeart } from 'react-icons/fa';

const CenterMyPage = () => {
  const centerId = 12345678;
  const centerName = '임시 보호소 이름';
  const address = '서울특별시 강남구 언주로99길 33';
  const phoneNum = '010-0000-0000';
  const content =
    '귀여운 아이들을 5명의 전문 관리사가 케어하는 203m^2 보호소입니다.';
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
              <p className="text-lg font-semibold">{centerName}</p>
              <p className="text-sm">{address}</p>
              <p className="text-sm text-lightGray">{phoneNum}</p>
            </div>
          </div>
          <div>
            <p className="text-sm">{content}</p>
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
