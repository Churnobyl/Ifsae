import DogDetail from '@/components/dog/DogDetail';
import { DogDetailType } from '@/types/dog/DogDetailType';
import axios from 'axios';
import { useState } from 'react';

const dummyDogData: DogDetailType = {
  id: 1,
  name: 'Lucky',
  age: 3,
  gender: 'MALE',
  dogStatus: 'NOT_ADOPTED',
  species: 'Shih Tzu',
  info: '사람을 좋아하고 잘 따르는 강아지입니다. 중성화가 되어 있으며, 다른 동물들과도 잘 지냅니다.',
  image: 'https://example.com/dog.jpg', // 강아지 이미지 URL
  shelterId: 101,
  shelterName: 'Happy Shelter',
  followCnt: 124,
};

const CreateAdoptionPage = () => {
  const [adoptionPurpose, setAdoptionPurpose] = useState('');
  const [absencePlan, setAbsencePlan] = useState('');

  const handleSubmit = async () => {
    const requestData = {
      dogId: dummyDogData.id,
      shelterId: dummyDogData.shelterId,
      adoptionPurpose,
      absencePlan,
    };

    try {
      await axios.post('/api/adoptions', requestData);
      alert('입양 신청이 성공적으로 제출되었습니다.');
    } catch (error) {
      console.error('Failed to submit adoption application', error);
      alert('입양 신청 제출에 실패했습니다.');
    }
  };

  return (
    <div className="w-full flex justify-center text-black">
      <div className="w-11/12">
        <div className="text-xl font-semibold m-2">입양 신청 하기</div>

        <DogDetail dog={dummyDogData} />

        <div className="flex flex-col items-center">
          <div className="w-full">
            {/* 예시 안내문 */}
            <div className="mt-6 m-4 p-4 bg-lightGray rounded-xl">
              <div className="text-lg font-semibold text-gray-700 mb-2">
                입양 목적 작성 예시
              </div>
              <div className="text-sm space-y-1">
                <p>
                  <strong>연락처:</strong> 010-1234-5678
                </p>
                <p>
                  <strong>이메일:</strong> example@email.com
                </p>
                <p>
                  <strong>주거 형태:</strong> 아파트 / 3층, 24평 / 반려동물
                  키우기 적합한 환경
                </p>
                <p>
                  <strong>반려 경험:</strong> 예전에 강아지를 2년간 키운 경험이
                  있으며, 현재는 반려동물이 없습니다.
                </p>
                <p>
                  <strong>가족 구성원:</strong> 성인 2명, 어린이 1명 (모두
                  강아지 입양을 찬성합니다)
                </p>
                <p>
                  <strong>알레르기 유무:</strong> 가족 중 알레르기가 있는 사람은
                  없습니다.
                </p>
                <p>
                  <strong>입양 목적:</strong> 우리 가족은 평소 강아지에 대한
                  애정이 많고, 반려동물을 통해 아이들이 생명에 대한 책임감을
                  배우기를 바랍니다. 또한 강아지를 통해 가족 간의 유대감도 더욱
                  강화되기를 기대합니다.
                </p>
              </div>
            </div>
          </div>
          <div className="w-11/12">
            <label className="block m-3 mt-5 mb-2 font-semibold">
              입양 상세 정보
            </label>
            <textarea
              value={adoptionPurpose}
              onChange={(e) => setAdoptionPurpose(e.target.value)}
              className="w-full min-h-40 p-2 border border-gray focus:border-hoverGreen focus:outline-none rounded-lg"
              placeholder="연락처, 주거 형태, 입양 목적, 반려동물 경험, 가족 구성원, 알레르기 유무 등 입양 관련 상세 정보를 작성해주세요."
            />
          </div>

          <div className="w-11/12">
            <label className="block m-3 mb-2 font-medium">부재 시 계획</label>
            <textarea
              value={absencePlan}
              onChange={(e) => setAbsencePlan(e.target.value)}
              className="w-full min-h-32 p-2 border border-gray focus:border-hoverGreen focus:outline-none rounded-lg"
              placeholder="외출, 여행 등으로 인해 부재 시 강아지 돌봄에 대한 계획을 설명해주세요."
            />
          </div>

          <button
            onClick={handleSubmit}
            className="m-3 px-3 py-2 bg-baseGreen text-black rounded-lg hover:bg-main"
          >
            신청하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAdoptionPage;
