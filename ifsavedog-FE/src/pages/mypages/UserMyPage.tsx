import DefaultProfileImg from '@/assets/icon/profile.svg';
import HeartIcon from '@/assets/icon/heart.svg';
import EditProfileICon from '@/assets/icon/edit-profile.svg';
import RankingIcon from '@/assets/icon/ranking-podium.svg';
import { FaRegEdit } from 'react-icons/fa';
import { BsFillPeopleFill } from 'react-icons/bs';
import { FaHandHoldingHeart } from 'react-icons/fa';
import { useUserStateStore } from '@/stores/auth/userStateStore';
import ProfileCard from '@/components/common/ProfileCard';
import { useNavigate } from 'react-router-dom';

const UserMyPage = () => {
  const userStateStore = useUserStateStore();
  const { email, nickname, grade, profileImgUrl } = userStateStore;
  const navigate = useNavigate();

  // 좋아요 한 영상 버튼 클릭 핸들러
  const handleLikeVideoClick = () => {
    navigate('/mypage/like-video'); // 버튼 클릭 시 이동
  };

  // 프로필 수정 버튼 클릭 핸들러
  const handleEditProfileClick = () => {
    navigate('/mypage/edit-profile'); // 버튼 클릭 시 이동
  };

  // 팔로우 목록 클릭 핸들러
  const handleFollowClick = () => {
    navigate('/follow'); // 버튼 클릭 시 이동
  };

  // 후원 목록 클릭 핸들러
  const handleDonationListClick = () => {
    navigate('/mypage/donation'); // 버튼 클릭 시 이동
  };

  return (
    <div className="flex flex-col items-center justify-center text-black">
      <ProfileCard
        profileImgUrl={profileImgUrl ? profileImgUrl : DefaultProfileImg}
        name={nickname}
        email={email}
        isUserProfile={true}
      />

      <div className="w-11/12 flex items-center justify-center border-t border-b border-lightGray py-4 px-2 mb-6">
        <div className="flex justify-around items-center">
          <div className="flex flex-col items-center">
            <div
              className="w-24 h-24 bg-whiteGray rounded-xl flex flex-col items-center justify-center cursor-pointer"
              onClick={handleLikeVideoClick}
            >
              <img src={HeartIcon} alt="like" className="w-8 h-8" />
              <p className="text-sm font-medium">좋아요 한 영상</p>
            </div>
          </div>

          <div className="w-[1px] h-[24px] bg-black rounded-full mx-2"></div>

          <div className="flex flex-col items-center">
            <div
              className="w-24 h-24 bg-whiteGray rounded-xl flex flex-col items-center justify-center"
              onClick={handleEditProfileClick}
            >
              <img src={EditProfileICon} alt="like" className="w-8 h-8" />
              <p className="text-sm font-medium">프로필 수정</p>
            </div>
          </div>

          <div className="w-[1px] h-[24px] bg-black rounded-full mx-2"></div>

          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-whiteGray rounded-xl flex flex-col items-center justify-center">
              <img src={RankingIcon} alt="like" className="w-8 h-8" />
              <p className="text-sm font-medium">{grade}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 w-11/12">
        <div className="flex items-center mb-4">
          <BsFillPeopleFill
            size={24}
            className="mr-2"
            onClick={handleFollowClick}
          />
          <p className="text-lg font-semibold" onClick={handleFollowClick}>
            팔로우
          </p>
        </div>
        <div className="flex items-center mb-4">
          <FaRegEdit size={24} className="mr-2" />
          <p className="text-lg font-semibold">입양 신청 목록</p>
        </div>
        <div className="flex items-center mb-4">
          <FaHandHoldingHeart
            size={24}
            className="mr-2"
            onClick={handleDonationListClick}
          />
          <p
            className="text-lg font-semibold"
            onClick={handleDonationListClick}
          >
            후원 현황 목록
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserMyPage;
