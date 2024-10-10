import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // useLocation 훅 import
import DogDetail from '@/components/dog/DogDetail';
import { DogDetailType } from '@/types/dog/DogDetailType';
import { createAdoptionApi } from '@/apis/adoption/adoptionApi'; // createAdoptionApi 호출
import { AdoptionRequestType } from '@/types/adoption/AdoptionRequestType'; // AdoptionRequestType import

const CreateAdoptionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { dog } = location.state as { dog: DogDetailType }; // 전달된 dog 정보 받아오기
  const [adoptionPurpose, setAdoptionPurpose] = useState('');
  const [absencePlan, setAbsencePlan] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // 신청 중 여부

  const handleSubmit = async () => {
    const requestData: AdoptionRequestType = {
      dogId: dog.id,
      shelterId: dog.shelterId,
      adoptionPurpose,
      absencePlan,
    };

    try {
      setIsSubmitting(true); // 신청 중 상태로 전환
      await createAdoptionApi(requestData); // 입양 신청 API 호출
      alert('입양 신청이 성공적으로 제출되었습니다.');
      navigate(-1); // 입양 신청 완료 후 이전 페이지로 이동
    } catch (error) {
      console.error('입양 신청 제출에 실패했습니다.', error);
      alert('입양 신청 제출에 실패했습니다.');
    } finally {
      setIsSubmitting(false); // 신청 완료 후 상태 초기화
    }
  };

  return (
    <div className="w-full flex justify-center text-black">
      <div className="w-11/12">
        <div className="text-xl font-semibold m-2">입양 신청 하기</div>

        {/* 전달받은 dog 정보를 DogDetail 컴포넌트에 전달 */}
        <DogDetail dog={dog} />

        <div className="flex flex-col items-center">
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
            disabled={isSubmitting} // 신청 중일 때 버튼 비활성화
          >
            {isSubmitting ? '신청 중...' : '신청하기'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAdoptionPage;
