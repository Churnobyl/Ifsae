import LoginPage from '@/pages/LoginPage';
import { PATH } from '@/routers/pathConstants';
import { useTokenStore } from '@/stores/auth/tokenStore';
import { useUserStateStore } from '@/stores/auth/userStateStore';
import { UserRoleEnum } from '@/types/auth/UserRoleEnum';
import { UserStatusEnum } from '@/types/auth/UserStatusEnum';
import { RequiredRole } from '@/types/common/RequiredRole';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ userStatus, userRole }: RequiredRole) => {
  const accessToken = useTokenStore((state) => state.accessToken);
  const isAuthenticated = !!accessToken;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== PATH.LOGIN) {
      // 로그인하지 않은 경우, 로그인 페이지로 이동
      navigate('/' + PATH.LOGIN);
    } else if (isAuthenticated) {
      const userState = useUserStateStore.getState();

      // 특정 페이지에 접근하기 위한 권한 검사
      if (
        userRole &&
        userState.role !== userRole.toString() &&
        userStatus &&
        userState.userStatus !== userStatus.toString()
      ) {
        navigate('/no-permission', { replace: true });
      }

      if (userState.userStatus === UserStatusEnum.PENDING.toString()) {
        // 팬딩 상태면
        if (userState.role === UserRoleEnum.ROLE_GENERAL_USER.toString()) {
          // 일반 유저일 경우
          navigate('/' + PATH.USER_RECOMMEND, { replace: true });
        } else if (userState.role === UserRoleEnum.ROLE_CENTER.toString()) {
          navigate('/' + PATH.CREATE_CENTER, { replace: true });
        }
      }

      if (location.pathname === '/') {
        // 로그인한 상태에서 최상위 경로로 접근한 경우, 메인 페이지로 이동
        navigate('/' + PATH.MAIN);
      }
    }
  }, [
    accessToken,
    isAuthenticated,
    location.pathname,
    navigate,
    userRole,
    userStatus,
  ]);

  // 로그인하지 않은 경우
  if (!isAuthenticated && location.pathname === PATH.LOGIN) {
    return <LoginPage />;
  }

  // 조건에 맞는 경우에는 해당 경로의 자식 컴포넌트 렌더링
  return <Outlet />;
};

export default PrivateRoute;
