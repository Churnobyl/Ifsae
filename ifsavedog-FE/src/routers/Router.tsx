import NotFoundPage from '@/pages/errorPages/NotFoundPage';
import LandingPage from '@/pages/mainLogic/LandingPage';
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
  ];

  const router = createBrowserRouter([...routes]);
  return <RouterProvider router={router} />;
};

export default Router;
