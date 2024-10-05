import { Input } from '@/components/common/Input/Input';
import MainLayout from '@/layouts/MainLayout';
import { useState } from 'react';
import { FaPhone, FaHome, FaBirthdayCake, FaDog } from 'react-icons/fa';
import { FaPeopleRoof } from 'react-icons/fa6';

const UserProfileEdit = () => {
  const [formData, setFormData] = useState({
    housingType: '',
    birth: '',
    address: '',
    phoneNumber: '',
    familyCnt: '',
    curPets: '',
    petExperience: '',
    hasAllergy: false,
  });

  // Input 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <MainLayout showTopbar={true} showBottombar={true}>
      <div className="w-full break-all flex flex-col items-center">
        <div className="w-10/12 overflow-hidden">
          <div className="py-4 text-black font-semibold text-2xl">
            프로필 수정
          </div>
          <form className="w-full">
            {/* 생년 */}
            <Input
              label="태어난 년도"
              name="birth"
              value={formData.birth.toString()}
              placeholder="태어난 년도"
              onChange={handleChange}
              icon={FaBirthdayCake}
              type="number"
            />

            {/* 주소 */}
            <Input
              label="주소"
              name="address"
              value={formData.address}
              placeholder="OO도 OO시 상세주소"
              onChange={handleChange}
              icon={FaHome}
              type="text"
            />

            {/* 전화번호 */}
            <Input
              label="전화번호"
              name="phoneNumber"
              value={formData.phoneNumber}
              placeholder="010-1234-5678"
              onChange={handleChange}
              icon={FaPhone}
              type="text"
            />

            {/* 가족 수 */}
            <Input
              label="가족 수"
              name="familyCnt"
              value={formData.familyCnt.toString()}
              placeholder="가족 수 ex) 3"
              onChange={handleChange}
              icon={FaPeopleRoof}
              type="number"
            />

            {/* 현재 키우고 있는 반려동물 */}
            <Input
              label="현재 반려동물 수 & 성격"
              name="curPets"
              value={formData.curPets}
              placeholder="간단한 설명을 작성해주세요"
              onChange={handleChange}
              icon={FaDog}
              type="text"
            />

            {/* 반려동물 경험 */}
            <Input
              label="반려동물 경험 (기간, 마리 수, 종)"
              name="petExperience"
              value={formData.petExperience}
              placeholder="간단하게 작성해주세요"
              onChange={handleChange}
              type="text"
            />

            {/* 알러지 유무 (체크박스) */}
            <div className="flex items-center">
              <label
                htmlFor="hasAllergy"
                className="m-1 text-gray-700 font-medium"
              >
                알러지 유무
              </label>
              <input
                id="hasAllergy"
                name="hasAllergy"
                type="checkbox"
                onChange={handleChange}
                className="w-4 h-4 rounded"
              />
            </div>

            {/* 저장 버튼 */}
            <div className="m-3 flex justify-center">
              <button
                type="button"
                className="px-6 py-1 bg-main text-white font-semibold rounded-xl hover:bg-hoverGreen"
              >
                저장
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserProfileEdit;
