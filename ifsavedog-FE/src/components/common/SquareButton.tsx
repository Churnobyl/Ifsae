import React from 'react';

interface ButtonProps {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean; // disabled 속성 추가
}

const SquareButton = ({ label, icon, onClick, disabled }: ButtonProps) => {
  return (
    <button
      onClick={!disabled ? onClick : undefined} // disabled일 때는 클릭 불가
      disabled={disabled} // HTML 기본 disabled 속성 적용
      className={`w-24 h-24 font-semibold py-2 px-4 rounded-lg shadow-md flex flex-col items-center justify-center space-y-2
        ${disabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-lightGray text-black hover:bg-blue-600 cursor-pointer'}
      `}
    >
      {icon && <span>{icon}</span>} {/* 아이콘 */}
      <span className="text-sm">{label}</span> {/* 텍스트 */}
    </button>
  );
};

export default SquareButton;
