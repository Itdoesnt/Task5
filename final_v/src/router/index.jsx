import { createBrowserRouter } from 'react-router-dom';

import { Layout } from '../components/Layout/Layout';
import { Catalog } from '../components/Catalog/Catalog';
import { Detail } from '../components/Detail/Detail';
import { Cart } from '../components/Cart/Cart';
import { Favorite } from '../components/Favorite/Favorite';
import { SignIn } from '../components/SignIn/SignIn';
import { Profile } from '../components/Profile/Profile';
import { SignUp } from '../components/SignUp/SignUp';
import { routerPaths } from './paths';
import { New } from '../components/New/New';

export const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Catalog />,
      },
      {
        path: routerPaths.CATALOG,
        element: <Catalog />,
      },
      {
        path: routerPaths.DETAIL,
        element: <Detail />,
      },
      {
        path: routerPaths.CART,
        element: <Cart />,
      },
      {
        path: routerPaths.FAVORITE,
        element: <Favorite />,
      },
      {
        path: routerPaths.NEW,
        element: <New />,
      },
      {
        path: routerPaths.PROFILE,
        element: <Profile />,
      },
      {
        path: routerPaths.SIGNIN,
        element: <SignIn />,
      },
      {
        path: routerPaths.SIGNUP,
        element: <SignUp />,
      },
    ],
  },
]);
