import CenterProfileImg from '@/assets/center-profile.png';
import EditProfileICon from '@/assets/icon/edit-profile.svg';
import PawIcon from '@/assets/icon/paw-print.svg';
import ManageVideoIcon from '@/assets/icon/video-camera.svg';
import ProfileCard from '@/components/common/ProfileCard';
import { PATH } from '@/routers/pathConstants';
import { useMyShelterDetailStore } from '@/stores/shelter/myShelterDetailStore';
import { FaHandHoldingHeart } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const CenterMyPage = () => {
  const myShelterDetailStore = useMyShelterDetailStore();
  const { name, address, phone, content, shelterProfileImg } =
    myShelterDetailStore;

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center text-black">
        <ProfileCard
          profileImgUrl={
            shelterProfileImg ? shelterProfileImg : CenterProfileImg
          }
          name={name ? name : '정보 불러오기 실패'}
          address={address ? address : '정보 불러오기 실패'}
          phone={phone ? phone : '010-0000-0000'}
          content={content ? content : '                     '}
        />

        <div className="w-11/12 flex items-center justify-center border-t border-b border-lightGray py-4 px-2 mb-6">
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
          <Link to={'/' + PATH.CREATE_POST}>
            <div className="flex items-center mb-4 cursor-pointer">
              <FaPencil size={24} className="mr-2" />
              <p className="text-lg font-semibold">글쓰기</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CenterMyPage;
