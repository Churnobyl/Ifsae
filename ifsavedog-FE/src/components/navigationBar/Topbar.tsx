import classNames from 'classnames';
import { FaBell, FaSignOutAlt } from 'react-icons/fa';

const Topbar = ({ className }: { className?: string }) => {
  return (
    <div
      className={classNames(
        'h-6 flex flex-row items-center justify-between w-full',
        className,
      )}
    >
      <div>로고</div>
      <div className="flex flex-row gap-2">
        <div>
          <FaBell size={20} />
        </div>
        <div>
          <FaSignOutAlt size={20} />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
