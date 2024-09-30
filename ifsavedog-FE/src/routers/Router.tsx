import SignupForm from '@/components/signup/SignupForm';
import SignupResult from '@/components/signup/SignupResult';
import NotFoundPage from '@/pages/errorPages/NotFoundPage';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import MainPage from '@/pages/MainPage';
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

const Router = () => {
  const accessToken = useTokenStore((state) => state.accessToken);
  const [cookies, setCookie] = useCookies();

  useEffect(() => {
    if (cookies.hasViewed === undefined) {
      setCookie(import.meta.env.VITE_COOKIE_NAME_FOR_LANDING_PAGE, 'false', {
        path: '/',
        maxAge: import.meta.env.VITE_COOKIE_MAX_AGE,
      });
    }
  }, [cookies, setCookie]);

  const routes: RouteObject[] = [
    {
      path: PATH.HOME,
      errorElement: <NotFoundPage />,
      element: (() => {
        if (accessToken) {
          return <MainPage />;
        } else if (cookies.hasViewed === true) {
          return <Navigate to={PATH.LOGIN} />;
        } else {
          return <Navigate to={PATH.LANDING} />;
        }
      })(),
    },

    {
      path: PATH.MAIN,
      errorElement: <NotFoundPage />,
      element: <MainPage />,
    },
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
          path: PATH.SIGNUP,
          element: <SignupForm />,
        },
        {
          path: PATH.SIGNUP_RESULT,
          element: <SignupResult />,
        },
      ],
    },
  ];

  const router = createBrowserRouter([...routes]);
  return <RouterProvider router={router} />;
};

export default Router;
