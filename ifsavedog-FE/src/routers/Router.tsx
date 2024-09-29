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

  console.log('Access Token:', accessToken);
  console.log('Has Viewed Cookie:', cookies.hasViewed);

  useEffect(() => {
    if (cookies.hasViewed === undefined) {
      console.log('Setting hasViewed cookie to false');
      setCookie('hasViewed', 'false', { path: '/', maxAge: 7 * 24 * 60 * 60 });
    }
  }, [cookies, setCookie]);

  const routes: RouteObject[] = [
    {
      path: PATH.HOME,
      errorElement: <NotFoundPage />,
      element: (() => {
        if (accessToken) {
          console.log('Navigating to MainPage');
          return <MainPage />;
        } else if (cookies.hasViewed === 'true') {
          console.log('Navigating to LoginPage');
          return <Navigate to={PATH.LOGIN} />;
        } else {
          console.log('Navigating to LandingPage');
          return <Navigate to={PATH.LANDING} />;
        }
      })(),
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
