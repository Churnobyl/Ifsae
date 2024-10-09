import BackButton from '@/components/navigationBar/items/BackButton';
import { PATH } from '@/routers/pathConstants';
import classNames from 'classnames';
import { FaBell } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Topbar = ({ className }: { className?: string }) => {
  return (
    <div
      className={classNames(
        'h-12 flex flex-row items-center justify-between w-full p-5 z-999 bg-white',
        className,
      )}
    >
      <div>
        <BackButton />
      </div>
      <Link to={PATH.MAIN} replace={true}>
        <div className="logo logo-sm"></div>
      </Link>
      <div>
        <FaBell size={24} />
      </div>
    </div>
  );
};

export default Topbar;
