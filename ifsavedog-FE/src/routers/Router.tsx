import SignupForm from '@/components/signup/SignupForm';
import config from '@/constants/Environments';
import AdoptionPage from '@/pages/AdoptionPage';
import CenterDetailPage from '@/pages/CenterDetailPage';
import CenterDonationListPage from '@/pages/CenterDonationListPage';
import CreateDogPage from '@/pages/CreateDogPage';
import CreateShelterPage from '@/pages/CreateShelterPage';
import DogDetailPage from '@/pages/DogDetailPage';
import MyDonationListPage from '@/pages/MyDonationListPage';
import FollowPage from '@/pages/FollowPage';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import MainContainer from '@/pages/MainContainer';
import MainPage from '@/pages/MainPage';
import MungtsuPage from '@/pages/MungtsuPage';
import MyDogListPage from '@/pages/MyDogListPage';
import SearchPage from '@/pages/SearchPage';
import UserRecommendPage from '@/pages/UserRecommendPage';
import VideoDetailPage from '@/pages/VideoDetailPage';
import NotFoundPage from '@/pages/errorPages/NotFoundPage';
import CenterProfileEdit from '@/pages/mypages/CenterProfileEdit';
import CreatePostPage from '@/pages/mypages/CreatePostPage';
import MyPage from '@/pages/mypages/MyPage';
import UserLikeVideo from '@/pages/mypages/UserLikeVideoPage';
import UserProfileEdit from '@/pages/mypages/UserProfileEdit';
import PrivateRoute from '@/routers/PrivateRoute';
import { PATH } from '@/routers/pathConstants';
import { UserRoleEnum } from '@/types/auth/UserRoleEnum';
import { UserStatusEnum } from '@/types/auth/UserStatusEnum';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

const Router = () => {
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
      path: '/',
      element: <PrivateRoute />,
      children: [
        {
          path: '',
          element: <MainContainer />,
          errorElement: <NotFoundPage />,
          children: [
            { path: PATH.MAIN, element: <MainPage /> },
            { path: PATH.MUNGTSU, element: <MungtsuPage /> },
            { path: PATH.ADOPTION, element: <AdoptionPage /> },
            { path: PATH.SEARCH, element: <SearchPage /> },
            { path: PATH.MYPAGE, element: <MyPage /> },
            {
              path: PATH.USER_RECOMMEND,
              element: (
                <PrivateRoute
                  userRole={UserRoleEnum.ROLE_GENERAL_USER}
                  userStatus={UserStatusEnum.PENDING}
                />
              ),
              children: [
                {
                  path: '',
                  element: <UserRecommendPage />,
                },
              ],
            },
            {
              path: PATH.CREATE_CENTER,
              element: (
                <PrivateRoute
                  userRole={UserRoleEnum.ROLE_CENTER}
                  userStatus={UserStatusEnum.PENDING}
                />
              ),
              children: [
                {
                  path: '',
                  element: <CreateShelterPage />,
                },
              ],
            },
            {
              path: PATH.ADD_DOG,
              element: (
                <PrivateRoute
                  userRole={UserRoleEnum.ROLE_CENTER}
                  userStatus={UserStatusEnum.ACTIVE}
                />
              ),
              children: [
                {
                  path: '',
                  element: <CreateDogPage />,
                },
              ],
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
              path: PATH.CENTER_PROFILE_EDIT,
              element: <CenterProfileEdit />,
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
            {
              path: PATH.USER_DONATION,
              errorElement: <NotFoundPage />,
              element: <MyDonationListPage />,
            },
            {
              path: PATH.CENTER_DETAIL + '/:id',
              errorElement: <NotFoundPage />,
              element: <CenterDetailPage />,
            },
            {
              path: PATH.CREATE_POST,
              errorElement: <NotFoundPage />,
              element: (
                <PrivateRoute
                  userRole={UserRoleEnum.ROLE_CENTER}
                  userStatus={UserStatusEnum.ACTIVE}
                />
              ),
              children: [
                {
                  path: '',
                  element: <CreatePostPage />,
                },
              ],
            },
          ],
        },
      ],
    },

    {
      path: PATH.LOGIN,
      element: <LoginPage />,
      errorElement: <NotFoundPage />,
    },
    {
      path: PATH.SIGNUP,
      element: <SignupForm />,
      errorElement: <NotFoundPage />,
    },
    {
      path: PATH.LANDING,
      element: <LandingPage />,
      errorElement: <NotFoundPage />,
    },
    {
      path: PATH.VIDEO_DETAIL + '/:id',
      element: <VideoDetailPage />,
      errorElement: <NotFoundPage />,
    },

    // 언제든 접근 가능한 경로
    { path: '*', element: <NotFoundPage /> },
  ];

  const router = createBrowserRouter([...routes]);
  return <RouterProvider router={router} />;
};

export default Router;
