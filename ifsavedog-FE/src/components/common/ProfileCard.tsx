interface ProfileCardProps {
  profileImgUrl?: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  content?: string;
  isUserProfile?: boolean;
}

const ProfileCard = ({
  profileImgUrl,
  name,
  email,
  phone,
  address,
  content,
  isUserProfile,
}: ProfileCardProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-black">
      <div
        className={`w-11/12 flex flex-row justify-around bg-whiteGray m-2 p-4 rounded-lg ${isUserProfile ? 'mb-4' : ''}`}
      >
        {/* 프로필 이미지 */}
        <img
          src={profileImgUrl}
          alt="Profile Image"
          className="w-20 h-20 rounded-full"
        />

        {/* 유저 프로필이면 닉네임과 이메일, 센터 프로필이면 이름과 주소 */}
        <div className={`space-y-1 ${isUserProfile ? '' : 'text-sm'}`}>
          <p className="text-lg font-semibold">{name}</p>
          {isUserProfile ? (
            <p className="text-gray-500">{email}</p>
          ) : (
            <>
              <p>{address}</p>
              <p className="text-gray">{phone}</p>
            </>
          )}
        </div>
      </div>

      {!isUserProfile && content && (
        <div className="w-11/12 bg-whiteGray m-2 p-4 rounded-lg mb-4">
          <div className="flex justify-center">
            <p className="w-5/6 text-sm">{content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
