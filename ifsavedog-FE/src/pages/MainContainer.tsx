import MainLayout from '@/layouts/MainLayout';
import { Outlet } from 'react-router-dom';

const MainContainer = () => {
  return (
    <MainLayout showTopbar={true} showBottombar={true}>
      <Outlet />
    </MainLayout>
  );
};

export default MainContainer;
