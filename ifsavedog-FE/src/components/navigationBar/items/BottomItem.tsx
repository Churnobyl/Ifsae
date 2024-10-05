import classNames from 'classnames';
import { MouseEventHandler, useMemo } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { BsPersonCircle } from 'react-icons/bs';
import { FaHandHoldingHeart } from 'react-icons/fa6';
import { IoMdSearch } from 'react-icons/io';
import { LuDog } from 'react-icons/lu';

interface BottomItemInterface {
  isSelected: boolean;
  name: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const BottomItem = ({ isSelected, name, onClick }: BottomItemInterface) => {
  const itemColor = isSelected ? 'var(--color-main)' : 'var(--color-black)';
  const barColor = isSelected ? 'bg-main' : 'bg-black';

  const icon = useMemo(() => {
    switch (name) {
      case '메인':
        return <AiOutlineHome size={32} color={itemColor} />;
      case '멍츠':
        return <LuDog size={32} color={itemColor} />;
      case '입양':
        return <FaHandHoldingHeart size={32} color={itemColor} />;
      case '검색':
        return <IoMdSearch size={32} color={itemColor} />;
      case '마이페이지':
        return <BsPersonCircle size={32} color={itemColor} />;
    }
  }, [itemColor, name]);

  return (
    <div
      className="flex flex-col items-center justify-center h-20 w-full"
      onClick={onClick}
    >
      <div className={classNames('h-1', 'w-full', barColor)}></div>
      <div className="flex items-center justify-center h-14 w-full">{icon}</div>
      <div
        className={classNames(
          'flex',
          'items-center',
          'justify-center',
          'h-5',
          'w-full',
          'text-xs',
          { 'text-main': isSelected, 'text-black': !isSelected },
        )}
      >
        {name}
      </div>
    </div>
  );
};

export default BottomItem;
