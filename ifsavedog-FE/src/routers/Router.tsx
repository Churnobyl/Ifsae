import NotFoundPage from '@/pages/errorPages/NotFoundPage';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import { PATH } from '@/routers/Constants';
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

const Router = () => {
  const routes: RouteObject[] = [
    {
      path: PATH.HOME,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: PATH.HOME,
          element: <LandingPage />,
        },
        { path: PATH.LANDING, element: <LandingPage /> },
      ],
    },
    {
      path: PATH.LOGIN,
      errorElement: <NotFoundPage />,
      element: <LoginPage />,
    },
  ];

  const router = createBrowserRouter([...routes]);
  return <RouterProvider router={router} />;
};

export default Router;
