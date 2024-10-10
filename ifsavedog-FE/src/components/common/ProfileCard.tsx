import { updateShelterProfileImageApi } from '@/apis/shelter/shelterApi';
import { updateUserProfileImageApi } from '@/apis/user/userApi';
import { useUserStateStore } from '@/stores/auth/userStateStore';
import { useMyShelterDetailStore } from '@/stores/shelter/myShelterDetailStore';
import { ChangeEvent, useCallback, useRef } from 'react';

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
  const userStateStore = useUserStateStore();
  const shelterStateStore = useMyShelterDetailStore();
  const imageRef = useRef<HTMLImageElement>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const newImageUrl = URL.createObjectURL(file);
        if (imageRef.current) {
          imageRef.current.src = newImageUrl;
        }

        try {
          let response = null;

          if (isUserProfile) {
            response = await updateUserProfileImageApi(file);
            userStateStore.setProfileImgUrl(response.data);
          } else {
            response = await updateShelterProfileImageApi(file);
            shelterStateStore.setShelterProfileImg(response.data);
          }
        } catch (error) {
          console.error('오류:', error);
        }
      }
    },
    [isUserProfile, shelterStateStore, userStateStore],
  );

  return (
    <div className="w-full flex flex-col items-center justify-center text-black">
      <div
        className={`w-11/12 flex flex-row justify-around bg-whiteGray m-2 p-4 rounded-lg ${isUserProfile ? 'mb-4' : ''}`}
      >
        {/* 프로필 이미지 */}
        <div
          onClick={() => {
            imageInputRef.current?.click();
          }}
        >
          <img
            ref={imageRef}
            src={profileImgUrl}
            alt="Profile Image"
            className="w-20 h-20 rounded-full object-cover"
          />
        </div>

        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />

        {/* 유저 프로필이면 닉네임과 이메일, 센터 프로필이면 이름과 주소 */}
        <div className={`w-2/3 space-y-1 ${isUserProfile ? '' : 'text-sm'}`}>
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
