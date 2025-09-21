import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';

// render- Dashboard
const Home = Loadable(lazy(() => import('pages/home')));
const ItemPage = Loadable(lazy(() => import('pages/item-page')));
const Categories = Loadable(lazy(() => import('pages/categories')));
const Publications = Loadable(lazy(() => import('pages/publications')));
const AddPublication = Loadable(lazy(() => import('pages/add_page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/categories/:category',
      element: <Categories />
    },
    {
      path: '/item/:id',
      element: <ItemPage />
    },
    {
      path: '/publications',
      element: <Publications />
    },
    {
      path: '/add_publication',
      element: <AddPublication />
    }
  ]
};

export default MainRoutes;
