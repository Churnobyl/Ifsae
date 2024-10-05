import BackButton from '@/components/navigationBar/items/BackButton';
import classNames from 'classnames';
import { FaBell } from 'react-icons/fa6';

const Topbar = ({ className }: { className?: string }) => {
  return (
    <div
      className={classNames(
        'h-12 flex flex-row items-center justify-between w-full p-5',
        className,
      )}
    >
      <div>
        <BackButton />
      </div>
      <div className="logo logo-sm"></div>
      <div>
        <FaBell size={24} />
      </div>
    </div>
  );
};

export default Topbar;
