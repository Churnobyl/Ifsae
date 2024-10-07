import Bottombar from '@/components/navigationBar/Bottombar';
import Topbar from '@/components/navigationBar/Topbar';
import classNames from 'classnames';
import { ReactElement } from 'react';

interface MainLayoutInterface {
  children: ReactElement;
  showTopbar: boolean;
  showBottombar: boolean;
}

const MainLayout = ({
  children,
  showTopbar,
  showBottombar,
}: MainLayoutInterface) => {
  return (
    <div className="relative flex flex-col w-screen h-screen">
      {showTopbar && <Topbar className="sticky top-0 left-0 w-full z-10" />}
      <div
        className={classNames('flex-grow', {
          'pt-0': showTopbar,
          'pb-0': showBottombar,
        })}
      >
        {children}
      </div>
      {showBottombar && <Bottombar />}
    </div>
  );
};

export default MainLayout;
