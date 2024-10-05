import SignupForm from '@/components/signup/SignupForm';
import SignupResult from '@/components/signup/SignupResult';
import config from '@/constants/Environments';
import AdoptionPage from '@/pages/AdoptionPage';
import NotFoundPage from '@/pages/errorPages/NotFoundPage';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import MainContainer from '@/pages/MainContainer';
import MainPage from '@/pages/MainPage';
import MungtsuPage from '@/pages/MungtsuPage';
import MyPage from '@/pages/MyPage';
import SearchPage from '@/pages/SearchPage';
import UserMyPage from '@/pages/UserMyPage';
import CenterMyPage from '@/pages/CenterMyPage';
import { PATH } from '@/routers/pathConstants';
import { useTokenStore } from '@/stores/auth/tokenStore';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import {
  Navigate,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import VideoList from '@/components/video/VideoList';

const Router = () => {
  const accessToken = useTokenStore((state) => state.accessToken);
  const [cookies, setCookie] = useCookies();

  useEffect(() => {
    if (cookies.hasViewed === undefined) {
      setCookie(config.cookieNameForLandingPage, 'false', {
        path: '/',
        maxAge: config.cookieMaxAge,
      });
    }
  }, [cookies.hasViewed, setCookie]);

  const routes: RouteObject[] = [
    {
      path: PATH.LANDING,
      errorElement: <NotFoundPage />,
      element: <LandingPage />,
    },
    {
      path: PATH.LOGIN,
      errorElement: <NotFoundPage />,
      element: <LoginPage />,
    },
    {
      path: PATH.SIGNUP,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: '',
          element: <SignupForm />,
        },
        {
          path: 'signup-result',
          element: <SignupResult />,
        },
      ],
    },

    {
      path: PATH.USER_MYPAGE,
      element: <UserMyPage />,
    },
    {
      path: PATH.CENTER_MYPAGE,
      element: <CenterMyPage />,
    },
    {
      path: PATH.MYPAGE,
      element: <MyPage />,
    },
    {
      path: PATH.VIDEO_LIST,
      element: <VideoList />,
    },

    {
      path: PATH.MAIN,
      errorElement: <NotFoundPage />,
      element: (() => {
        if (accessToken) {
          return <MainContainer />;
        } else if (cookies.hasViewed === true) {
          return <Navigate to={PATH.LOGIN} />;
        } else {
          return <Navigate to={PATH.LANDING} />;
        }
      })(),
      children: [
        {
          path: '',
          element: <MainPage />,
        },
        {
          path: PATH.MUNGTSU.slice(1), // Remove the leading '/' for child paths
          element: <MungtsuPage />,
        },
        {
          path: PATH.ADOPTION.slice(1),
          element: <AdoptionPage />,
        },
        {
          path: PATH.SEARCH.slice(1),
          element: <SearchPage />,
        },
      ],
    },
  ];

  const router = createBrowserRouter([...routes]);
  return <RouterProvider router={router} />;
};

export default Router;
