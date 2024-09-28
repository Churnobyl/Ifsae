import classNames from 'classnames';
import { FaBell, FaSignOutAlt } from 'react-icons/fa';

const Topbar = ({ className }: { className?: string }) => {
  return (
    <div
      className={classNames(
        'h-12 flex flex-row items-center justify-between w-full p-5',
        className,
      )}
    >
      <div className="logo logo-sm"></div>
      <div className="flex flex-row gap-2">
        <div>
          <FaBell size={24} />
        </div>
        <div>
          <FaSignOutAlt size={24} />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
