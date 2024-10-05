import SignupForm from '@/components/signup/SignupForm';
import SignupResult from '@/components/signup/SignupResult';
import VideoList from '@/components/video/VideoList';
import config from '@/constants/Environments';
import AdoptionPage from '@/pages/AdoptionPage';
import CreateShelterPage from '@/pages/CreateShelterPage';
import NotFoundPage from '@/pages/errorPages/NotFoundPage';
import FollowPage from '@/pages/FollowPage';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import MainContainer from '@/pages/MainContainer';
import MainPage from '@/pages/MainPage';
import MungtsuPage from '@/pages/MungtsuPage';
import MyDogListPage from '@/pages/MyDogListPage';
import MyPage from '@/pages/mypages/MyPage';
import SearchPage from '@/pages/SearchPage';
import UserRecommendPage from '@/pages/UserRecommendPage';
import { PATH } from '@/routers/pathConstants';
import { useTokenStore } from '@/stores/auth/tokenStore';
import { useUserStateStore } from '@/stores/auth/userStateStore';
import { UserRoleEnum } from '@/types/auth/UserRoleEnum';
import { UserStatusEnum } from '@/types/auth/UserStatusEnum';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import {
  Navigate,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import UserLikeVideo from '@/pages/mypages/UserLikeVideo';
import CenterDonationListPage from '@/pages/CenterDonationListPage';
import DogDetailPage from '@/pages/DogDetailPage';
import UserProfileEdit from '@/pages/mypages/UserProfileEdit';

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
      path: PATH.USER_RECOMMEND,
      element: <UserRecommendPage />,
    },
    {
      path: PATH.CREATE_CENTER,
      element: <CreateShelterPage />,
    },
    {
      path: PATH.VIDEO_LIST,
      element: <VideoList />,
    },

    /** 세경이의 테스트용 url */
    {
      path: PATH.USER_LIKE_VIDEO,
      element: <UserLikeVideo />,
    },
    {
      path: PATH.USER_PROFILE_EDIT,
      element: <UserProfileEdit />,
    },

    {
      path: PATH.MAIN,
      errorElement: <NotFoundPage />,
      element: (() => {
        if (accessToken) {
          if (
            // 근데 유저 상태가 PENDING이면
            useUserStateStore.getState().userStatus ===
            UserStatusEnum.PENDING.toString()
          ) {
            if (
              // ROLE이 일반 유저면
              useUserStateStore.getState().role ===
              UserRoleEnum.ROLE_GENERAL_USER.toString()
            ) {
              // return <Navigate to={PATH.USER_RECOMMEND} />;
            } else if (
              // ROLE이 센터면
              useUserStateStore.getState().role ===
              UserRoleEnum.ROLE_CENTER.toString()
            ) {
              return <Navigate to={PATH.CREATE_CENTER} />;
            }
          }
          return <MainContainer />;
        } else if (cookies.hasViewed === true) {
          // 액세스 토큰은 없는데 랜딩페이지를 봤으면
          return <Navigate to={PATH.LOGIN} />;
        } else {
          return <Navigate to={PATH.LANDING} />; // 액세스 토큰도 없고 랜딩페이지도 안 봤으면
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
        {
          path: PATH.MYPAGE.slice(1),
          children: [
            {
              path: '',
              element: <MyPage />,
            },
          ],
        },
      ],
    },
    {
      path: PATH.FOLLOW,
      errorElement: <NotFoundPage />,
      element: <FollowPage />,
    },
    {
      path: PATH.CENTER_DOG_LIST,
      errorElement: <NotFoundPage />,
      element: <MyDogListPage />,
    },
    {
      path: PATH.CENTER_DONATION_LIST,
      errorElement: <NotFoundPage />,
      element: <CenterDonationListPage />,
    },
    {
      path: PATH.DOG_DETAIL + '/:id',
      errorElement: <NotFoundPage />,
      element: <DogDetailPage />,
    },
  ];

  const router = createBrowserRouter([...routes]);
  return <RouterProvider router={router} />;
};

export default Router;
