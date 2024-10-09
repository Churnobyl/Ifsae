import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // useLocation 추가
import DogDetail from '@/components/dog/DogDetail';
import { DogDetailType } from '@/types/dog/DogDetailType';

const CreateDonationPage = () => {
  const [donationAmount, setDonationAmount] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation(); // useLocation 훅 사용
  const { dog } = location.state as { dog: DogDetailType }; // 전달된 dog 정보 받아오기

  const handleDonationAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setDonationAmount(value);
  };

  const handleDonationSubmit = () => {
    // 기부 금액이 없거나 0 이하일 때
    if (!donationAmount || Number(donationAmount) <= 0) {
      alert('기부 금액을 입력해주세요.');
      return;
    }

    // 기부 금액이 1,000,000원 이상일 때
    if (Number(donationAmount) >= 1000000) {
      alert('기부 금액은 1,000,000원 이하로 입력해주세요.');
      return;
    }

    // 기부 금액이 정상일 때만 후원 완료 메시지 표시
    alert(`후원 신청이 완료되었습니다. 후원 금액: ${donationAmount}원`);
    navigate(-1);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center text-black">
      <div className="w-11/12 flex flex-col ">
        <div className="text-2xl font-semibold p-2">후원 신청하기</div>

        {/* 전달받은 dog 정보를 DogDetail 컴포넌트에 전달 */}
        <DogDetail dog={dog} />

        <div className="w-full flex flex-col items-center">
          <div className="w-11/12 flex flex-col my-3">
            <label
              htmlFor="donationAmount"
              className="mx-2 my-1 text-lg font-semibold"
            >
              기부 금액 ( ₩ )
            </label>
            <input
              id="donationAmount"
              name="donationAmount"
              value={donationAmount}
              onChange={handleDonationAmountChange}
              placeholder="기부 금액을 입력하세요"
              type="number"
              className="p-3 bg-lightGray rounded-xl border border-lightGray focus:outline-none focus:border-hoverGreen"
              min={0}
              max={1000000}
            />

            {/* 경고 메시지 표시 */}
            {Number(donationAmount) >= 1000000 && (
              <div className="mx-2 text-red text-sm">
                기부 금액은 1,000,000원 이하로 입력해주세요.
              </div>
            )}
          </div>

          {/* 후원 시 유의사항 섹션 */}
          <div className="w-11/12 bg-lightGray rounded-xl p-4 text-sm">
            <div className="font-semibold text-lg mb-2">후원 시 유의 사항</div>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <span className="font-bold">후원금은 환불이 불가합니다.</span>{' '}
                후원 신청 전 금액과 내용을 신중하게 확인해 주세요.
              </li>
              <li>
                후원금은 강아지의 건강 관리 및 보호소 운영을 위해 투명하게
                사용됩니다.
              </li>
              <li>
                후원 신청 후 보호소의 상황에 따라 일부 서비스가 지연될 수
                있습니다. 이 점 양해 부탁드립니다.
              </li>
              <li>
                후원 관련 문의사항이 있으시면 언제든지{' '}
                <span className="font-bold">고객센터</span>로 연락 바랍니다.
              </li>
              <li>
                개인정보 보호를 위해 입력된 기부자 정보는 후원 목적 이외의
                용도로 사용되지 않습니다.
              </li>
              <li>
                후원 내역은 보호소의 재정 보고서에 반영되며, 필요한 경우 보호소
                운영 투명성을 위해 공개될 수 있습니다.
              </li>
            </ul>
          </div>

          {/* 후원 버튼 */}
          <button
            onClick={handleDonationSubmit}
            className="flex justify-center items-center m-4 w-24 h-9 bg-main text-black py-3 rounded-xl hover:bg-hoverGreen focus:outline-none"
          >
            후원하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateDonationPage;
