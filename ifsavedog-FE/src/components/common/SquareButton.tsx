import React from 'react';

interface ButtonProps {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const SquareButton = ({ label, icon, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-24 h-24 bg-lightGray text-black font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 flex flex-col items-center justify-center space-y-2"
    >
      {icon && <span>{icon}</span>} {/* 아이콘 */}
      <span className="text-sm">{label}</span> {/* 텍스트 */}
    </button>
  );
};

export default SquareButton;
