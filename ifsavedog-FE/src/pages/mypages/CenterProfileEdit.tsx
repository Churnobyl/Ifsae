import { Input } from '@/components/index';
import { CgRename } from 'react-icons/cg';
import { FaPhone, FaHome } from 'react-icons/fa';
import { useState } from 'react';

const CenterProfileEdit = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    content: '',
    canBeDonated: false,
  });

  // Input 변경 핸들러
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="w-full break-all flex flex-col items-center">
      <div className="w-10/12 overflow-auto">
        <div className="py-4 text-black font-semibold text-2xl">
          센터 프로필 수정
        </div>

        <form className="w-full">
          <Input
            label="이름"
            name="name"
            value={formData.name}
            placeholder="센터 이름"
            onChange={handleChange}
            icon={CgRename}
            type="text"
          />

          <Input
            label="주소"
            name="address"
            value={formData.address}
            placeholder="센터 주소"
            onChange={handleChange}
            icon={FaHome}
            type="text"
          />

          <Input
            label="전화번호"
            name="phone"
            value={formData.phone}
            placeholder="010-1234-5678"
            onChange={handleChange}
            icon={FaPhone}
            type="text"
          />

          <div className="flex flex-col w-full my-2">
            <label
              htmlFor="content"
              className="text-gray-700 font-semibold mb-1"
            >
              기타 정보
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              placeholder="회원들에게 센터를 어필해주세요"
              onChange={handleChange}
              className="w-full bg-lightGray h-40 p-3 rounded-2xl outline-none resize-none"
              style={{ overflowY: 'auto' }}
            />
          </div>

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
  );
};

export default CenterProfileEdit;
