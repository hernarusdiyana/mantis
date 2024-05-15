import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
// import Dashboard from 'layout/Dashboard';

// render - PR
const PrForm = Loadable(lazy(() => import('pages/pr/PrForm')));

// ==============================|| FORM ROUTING ||============================== //

const PrRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/form',
      element: <PrForm />
    }
  ],
  
};

export default PrRoutes;
